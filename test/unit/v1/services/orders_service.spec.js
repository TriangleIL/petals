const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = require('chai');
const {
  DatabaseError,
  InsufficientQuantityError,
} = require('utils/errors');

chai.use(chaiAsPromised);

const itemService = {
  getItem() {},
  saveItem() {},
};

const OrdersService = require('v1/services/orders_service')(itemService);

describe('OrdersService', async () => {
  const firstItem = {
    id: 1,
    name: 'Silver Petals',
    description: 'Fine Silver Petals with shimmer',
    price: 9900,
    quantity: 4,
  };

  const invalidId = -1;
  const validIdFailsToSave = 3;
  const itemCopy = { ...firstItem };
  const invalidItem = { ...firstItem, id: validIdFailsToSave };

  const findItemStub = sinon.stub(itemService, 'getItem');
  findItemStub.withArgs(itemCopy.id).returns(itemCopy);
  findItemStub.withArgs(invalidItem.id).returns(invalidItem);
  findItemStub.withArgs(invalidId).returns(null);

  const saveItemStub = sinon.stub(itemService, 'saveItem');
  saveItemStub.withArgs(itemCopy).returns(true);
  saveItemStub.withArgs(invalidItem).returns(false);

  context('Place Order', async () => {
    it('should return an item matching the given id, when the id and quantity are valid, with a reduced quantity', async () => {
      const requestedQuantity = 3;

      const boughtItem = await OrdersService.placeOrder(firstItem.id, requestedQuantity);

      expect(boughtItem.id).to.equal(firstItem.id);
      expect(boughtItem.quantity).to.equal(requestedQuantity);
    });

    it('should throw an error when the item quantity is insufficient', async () => {
      const requestedQuantity = itemCopy.quantity + 1;

      expect(OrdersService.placeOrder(itemCopy.id, requestedQuantity))
        .to.be.rejectedWith(InsufficientQuantityError);
    });

    it('should throw an error when the item service is unable to update the item', async () => {
      const requestedQuantity = 1;

      expect(OrdersService.placeOrder(invalidItem.id, requestedQuantity))
        .to.be.rejectedWith(DatabaseError);
    });
  });
});
