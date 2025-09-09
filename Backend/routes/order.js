const express = require('express');
const router = express.Router();
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { createOrder, getOrder, listOrders } = require('../handlers/order-handler');

router.post('/', authMiddleware, async (req, res) => {
  await createOrder(req, res);
});

router.get('/:id', authMiddleware, async (req, res) => {
  await getOrder(req, res);
});

router.get('/', authMiddleware, adminOnly, async (req, res) => {
  await listOrders(req, res);
});

module.exports = router;
