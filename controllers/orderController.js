const Order = require("../models/Order");
const CartItem = require("../models/CartItem");

const sendGrid = require('@sendgrid/mail');
const generateInvoiceHtml = require('/Users/paty/Licenta_SKINTERRA/frontend_licenta/src/components/InvoiceHtml.js'); 
const puppeteer = require('puppeteer');
const fs = require('fs');


sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.createOrder = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { user, items, total, paymentMethod } = req.body;

    // Mapping the items to match the CartItem schema
    const cartItemsData = items.map((item) => ({
      product: item._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const cartItems = await CartItem.insertMany(cartItemsData);
    const cartItemIds = cartItems.map((item) => item._id);
const order = await Order.create({ user, items: cartItemIds, total, paymentMethod });
    
    // Send invoice after creating order
    await exports.createInvoice({ params: { orderId: order._id } }, { status: () => ({ json: () => {} }) });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.createInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate({
        path: 'items',
        model: 'CartItem',
        populate: {
          path: 'product',
          model: 'Product'
        }
      })
      .exec();

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    const invoiceHtml = generateInvoiceHtml(order);
    
    // Define a temporary file name for the PDF
    const pdfPath = `/tmp/invoice_${orderId}.pdf`;

    // Launch Puppeteer, generate the PDF, and close the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(invoiceHtml);
    await page.pdf({ path: pdfPath, format: 'A4' });
    await browser.close();

    // Define email data
    const msg = {
      to: order.user.email,
      from: 'skinterra.licenta@gmail.com', 
      subject: 'Your Invoice from Skinterra',
      html: invoiceHtml,
      attachments: [
        {
          content: fs.readFileSync(pdfPath).toString("base64"),
          filename: `invoice_${orderId}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        },
      ],
    };

    // Send the email
    await sendGrid.send(msg);

    // Remove the temporary PDF file
    fs.unlinkSync(pdfPath);

    res.status(200).json({ success: true, data: 'Invoice has been generated and sent by email' });
  } catch (error) {
    console.error("Error in createInvoice:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};



exports.getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'items',
        model: 'CartItem',
        populate: {
          path: 'product',
          model: 'Product'
        }
      })
      .exec();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { items, total } = req.body;

    const order = await Order.findByIdAndUpdate(
        orderId,
        { items, total },
        { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    // Create an object with the email subject and text for each status
    const statusEmailData = {
      processing: {
        subject: 'Order Status Update - Processing',
        text: `Dear ${order.user.firstName}, your order is currently being processed.`,
      },
      shipped: {
        subject: 'Order Status Update - Shipped',
        text: `Dear ${order.user.firstName}, your order has been shipped.`,
      },
      delivered: {
        subject: 'Order Status Update - Delivered',
        text: `Dear ${order.user.firstName}, your order has been delivered. We hope you enjoy your products!`,
      },
      cancelled: {
        subject: 'Order Status Update - Cancelled',
        text: `Dear ${order.user.firstName}, we regret to inform you that your order has been cancelled. If this is a mistake, please contact our customer service.`,
      },
    };

    let AWB;

    if (status === 'shipped') {
      // Generate a random AWB number with 10 digits
      AWB = Math.floor(1000000000 + Math.random() * 9000000000).toString();

      // Save the AWB in your order or tracking data (add your own code here)
      // ...

      // Append the AWB number to the email text
      statusEmailData.shipped.text += ` The AWB for your order is ${AWB}.`;
    }

    const emailData = statusEmailData[status];

    if (!emailData) {
      throw new Error(`Invalid status: ${status}`);
    }

    // Prepare the email data
    const msg = {
      to: order.user.email,
      from: 'skinterra.licenta@gmail.com',
      subject: emailData.subject,
      text: emailData.text,
    };

    // Send the email
    await sendGrid.send(msg);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found"
      });
    }

    res.status(204).json({
      success: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
