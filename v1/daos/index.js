const ALL_ITEMS = require('database/items');
const ItemsRepository = require('./items_repository')(ALL_ITEMS);

module.exports = {
  ItemsRepository,
};
