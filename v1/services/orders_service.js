const {
  DatabaseError,
  InsufficientQuantityError,
} = require('utils/errors');

module.exports = function createOrderService(ItemService) {
  const OrderService = {};

  /**
   * Place an Order - Checks the Item Quantity is Sufficient and updates the
   * Item quantity with the requested quantity of the Order removed from the Inventory
   *
   * @param  {Number} id       Item ID of the Order
   * @param  {Number} quantity Quantity of Item requested
   * @return {Object}          Returns an Order object
   * @throws {InsufficientQuantityError}  Will throw Error is Item quantity is insufficient
   *                                      for fulfillment
   * @throws {DatabaseError}   Will throw Error if the Item quantity can not be updated
   */
  OrderService.placeOrder = async function placeOrder(id, quantity) {
    const item = await ItemService.getItem(id);

    // Verify the quantity exists
    if (item.quantity < quantity) {
      throw new InsufficientQuantityError({ id, quantity: item.quantity, requested: quantity });
    }

    // Remove quantity from inventory
    item.quantity -= quantity;

    // Update the Item Quantity
    if (ItemService.saveItem(item)) {
      // Place Order - Perform Other Tasks
      // e.g.
      // const order = OrderFactory.createFromItem(item)
      // OrderRepository.createOrder(order)

      // For now, stubbing this return value
      const order = { ...item };
      order.quantity = quantity;
      return order;
    }
    throw new DatabaseError('Unable to update item details');
  };

  return OrderService;
};
