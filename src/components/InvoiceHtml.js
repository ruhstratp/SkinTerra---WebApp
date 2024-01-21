const generateInvoiceHtml = (order) => {
  let itemsHtml = "";
  order.items.forEach((item) => {
    itemsHtml += `
      <div class="product-item">
        <p>${item.product.name}: ${item.quantity} x ${item.price}$</p>
      </div>`;
  });

  return `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #fdf2ea;
          color: #333;
          padding: 30px;
        }
        h1, h2 {
          color: #ffb6b2;
          margin-bottom: 20px;
        }
        h1 {
          color: black;
          font-size: 2em;
        }
        h2 {
          color: black;
          font-size: 1.5em;
        }
        p {
          line-height: 1.6;
          margin-bottom: 10px;
        }
        .product-item {
          border: 1px solid #ffb6b2;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        }
        .order-details, .delivery-details {
          background-color: #fdf2ea;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        }
      </style>
    </head>
    <body>
      <h1>Invoice for your order</h1>
      <div class="order-details">
        <h2>Order Details</h2>
        <p>Order ID: ${order._id}</p>
        <p>Order Status: ${order.status}</p>
        <p>Payment Method: ${order.paymentMethod}</p>
        <p>Total: ${order.total}$</p>
      </div>
      <h2>Ordered Products</h2>
      ${itemsHtml}
      <div class="delivery-details">
        <h2>Delivery Details</h2>
        <p>Name: ${order.user.firstName} ${order.user.lastName}</p>
        <p>Email: ${order.user.email}</p>
        <p>Address: ${order.user.streetAddress}</p>
        <p>Country: ${order.user.country}</p>
        <p>City: ${order.user.city}</p>
        <p>Postal Code: ${order.user.postalCode}</p>
      </div>
    </body>
    </html>
  `;
};

module.exports = generateInvoiceHtml;
