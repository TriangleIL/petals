const {
  ItemNotFoundError,
} = require('utils/errors');

module.exports = function createItemService(ItemsRepository) {
  const ItemService = {};

  /**
   * Get all items in the inventory
   *
   * @return {Array} List of All Items in Inventory
   */
  ItemService.getAllItems = async function getAllItems() {
    return ItemsRepository.getAllItems();
  };

  /**
   * Get an Item by ID
   *
   * @param  {Number} id Item ID
   * @return {Object}    The Requested Item
   * @throws {ItemNotFoundError} An Error is thrown is the Item can't be found
   */
  ItemService.getItem = async function getItem(id) {
    // TODO: Add locking or transactions to ensure we aren't getting into
    // bad states between our read and write operations
    const item = await ItemsRepository.findItemById(id);

    // Verify we have an item
    if (!item) {
      throw new ItemNotFoundError({ id, detail: 'Item could not be found by id' });
    }

    return item;
  };

  /**
   * Save an item to the datastore
   *
   * @param  {Object} item The Item to be saved
   * @return {Object}      The Item after it was saved
   */
  ItemService.saveItem = async function saveItem(item) {
    // TODO: Add validations or other business logic here
    return ItemsRepository.saveItem(item);
  };

  return ItemService;
};
