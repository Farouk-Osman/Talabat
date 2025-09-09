const Order = require('../DB/order');
const Product = require('../DB/product');

async function createOrder(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { items, address, paymentMethod } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    // Calculate total and validate products
    let total = 0;
    const productIds = [];
    for (const it of items) {
      const prod = await Product.findById(it.productId);
      if (!prod) return res.status(400).json({ message: `Product not found: ${it.productId}` });
      const price = prod.discount ? prod.price * (1 - prod.discount/100) : prod.price;
      total += price * (it.quantity || 1);
      productIds.push(prod._id);
    }

    const order = new Order({
      user: userId,
      products: productIds,
      totalAmount: total,
      status: 'pending',
      createdAt: new Date()
    });

    const saved = await order.save();
    res.status(201).json({ orderId: saved._id, status: saved.status });
  } catch (err) {
    console.error('createOrder error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getOrder(req, res) {
  try {
    const id = req.params.id;
    const order = await Order.findById(id).populate('user', 'username email').populate('products');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // allow user to fetch own order or admin
    if (req.user && (req.user.isAdmin || String(order.user._id) === String(req.user.id))) {
      return res.json(order);
    }
    return res.status(403).json({ message: 'Forbidden' });
  } catch (err) {
    console.error('getOrder error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function listOrders(req, res) {
  try {
    const orders = await Order.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('listOrders error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createOrder, getOrder, listOrders };
