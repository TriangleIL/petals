const express = require('express');
const { authentication } = require('middleware');
const itemsRouter = require('./items_router');
const orderRouter = require('./orders_router');

const router = express.Router();

router.use('/items', itemsRouter);
router.use('/orders', authentication, orderRouter);

module.exports = router;
