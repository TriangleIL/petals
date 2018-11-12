/*
 * The repository pattern abstracts our data access, meaning 'Services' do not care
 * where data lives (database, remote server, etc) and we can hide those details
 * via these repositories
 *
 * itemsDataTable could be a datastore, ORM, model, etc.  In this case, it's a simple
 * datatable representation
 */
module.exports = function createItemsRepository(itemsDataTable) {
  const ItemsRepository = {};

  /**
   * Get all Items from the Datastore
   *
   * @return {Array} Array of Items from the database
   */
  ItemsRepository.getAllItems = async function getAllItems() {
    return itemsDataTable;
  };

  /**
   * Find an Item by it's ID
   *
   * @param  {Number} id Item ID
   * @return {Object}    The Item or null if the Item doesn't exist
   */
  ItemsRepository.findItemById = async function findItemById(id) {
    // TODO: Add valid parameter checks

    const foundItem = itemsDataTable.find(item => item.id === id);

    return foundItem ? { ...foundItem } : null;
  };

  /**
   * Save the item to the database
   *
   * @param  {Object} item The Item to save
   * @return {Object}      The Item after it was saved
   */
  ItemsRepository.saveItem = async function saveItem(item) {
    // TODO: Currently a NO-OP without database support, just return success
    return item;
  };

  return ItemsRepository;
};
