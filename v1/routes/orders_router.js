const express = require('express');
const { OrdersService } = require('v1/services');

const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    try {
      const {
        id,
        quantity,
      } = req.body;

      const item = await OrdersService.placeOrder(id, quantity);

      res.status(201).json(item);
    } catch (e) {
      res.status(e.status || 400).json(e);
    }
  });

module.exports = router;
