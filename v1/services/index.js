const { ItemsRepository } = require('v1/daos');
const ItemsService = require('./items_service')(ItemsRepository);
const OrdersService = require('./orders_service')(ItemsService);

module.exports = {
  ItemsService,
  OrdersService,
};
