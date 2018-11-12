const { ItemsRepository } = require('v1/daos');
const { expect } = require('chai');

describe('ItemsRepository', async () => {
  context('Get All Items', async () => {
    it('should return 4 items', async () => {
      const allItems = await ItemsRepository.getAllItems();

      expect(allItems.length).to.equal(4);
    });
  });

  context('Get Item by Id', async () => {
    it('should return an item matching the given id, when the id is valid', async () => {
      const id = 1;
      const foundItem = await ItemsRepository.findItemById(id);

      expect(foundItem.id).to.equal(id);
    });

    it('should return no items (null) for an invalid id', async () => {
      const id = -1;
      const missingItem = await ItemsRepository.findItemById(id);

      expect(missingItem).to.equal(null);
    });
  });

  context('Save Item', async () => {
    it('should return the saved item', async () => {
      const item = {
        id: 1,
        name: 'Silver Petals',
        description: 'Fine Silver Petals with shimmer',
        price: 9900,
        quantity: 4,
      };

      const savedItem = await ItemsRepository.saveItem(item);

      expect(savedItem).to.equal(item);
    });
  });
});
