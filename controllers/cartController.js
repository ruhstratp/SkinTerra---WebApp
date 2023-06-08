const CartItem = require('../models/CartItem');

exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id }).populate('product');
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    let cartItem = await CartItem.findOne({ user: req.user._id, product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({
        user: req.user._id,
        product: productId,
        quantity,
      });
    }

    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findByIdAndUpdate(cartItemId, { quantity }, { new: true });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await CartItem.findByIdAndRemove(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json({ message: 'Cart item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};