const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = require('chai');

chai.use(chaiAsPromised);

const {
  ItemNotFoundError,
} = require('utils/errors');

const itemRepository = {
  getAllItems() {},
  findItemById() {},
  saveItem() {},
};

const ItemsService = require('v1/services/items_service')(itemRepository);

describe('ItemsService', async () => {
  const firstItem = {
    id: 1,
    name: 'Silver Petals',
    description: 'Fine Silver Petals with shimmer',
    price: 9900,
    quantity: 4,
  };

  const invalidId = -1;
  const itemCopy = { ...firstItem };

  const findItemStub = sinon.stub(itemRepository, 'findItemById');
  findItemStub.withArgs(itemCopy.id).returns(itemCopy);
  findItemStub.withArgs(invalidId).returns(null);

  const saveItemStub = sinon.stub(itemRepository, 'saveItem');
  saveItemStub.withArgs(itemCopy).returns(itemCopy);


  context('Get All Items', async () => {
    it('should return all items', async () => {
      const getAllItemsStub = sinon.stub(itemRepository, 'getAllItems').returns([{ ...firstItem }]);

      const allItems = await ItemsService.getAllItems();

      expect(allItems.length).to.equal(1);
      expect(getAllItemsStub.calledOnce).to.be.true;
    });
  });

  context('Get an Item', async () => {
    it('should return an item matching the given id, when the id is valid', async () => {
      const requestedQuantity = 2;

      const foundItem = await ItemsService.getItem(firstItem.id, requestedQuantity);

      expect(foundItem.id).to.equal(firstItem.id);
      expect(foundItem.quantity).to.equal(firstItem.quantity);
    });

    it('should throw an error when the item does not exist', async () => {
      const id = invalidId;
      const requestedQuantity = 2;

      expect(ItemsService.getItem(id, requestedQuantity)).to.be.rejectedWith(ItemNotFoundError);
    });
  });

  context('Save an Item', async () => {
    it('should return the same item', async () => {
      const savedItem = await ItemsService.saveItem(itemCopy);

      expect(savedItem).to.equal(itemCopy);
    });
  });
});
