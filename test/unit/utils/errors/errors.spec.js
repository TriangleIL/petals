const {
  AppError,
  DatabaseError,
  InsufficientQuantityError,
  ItemNotFoundError,
} = require('utils/errors');
const { expect } = require('chai');

describe('Errors', () => {
  context('AppError', () => {
    it('should accepted a default message', () => {
      const testMessage = 'Test Message';
      const appError = new AppError({ message: testMessage });

      expect(appError.message).to.equal(testMessage);
    });

    it('should return status 500 as default', () => {
      const appError = new AppError({ message: 'Test Message' });

      expect(appError.status).to.equal(500);
    });

    it('should return a status if it is passed', () => {
      const testMessage = 'Test Message';
      const testStatus = 400;
      const appError = new AppError({ message: testMessage, status: testStatus });

      expect(appError.status).to.equal(testStatus);
    });
  });

  context('InsufficientQuantityError', () => {
    it('should return status 409 as default', () => {
      const insufficientQuantityError = new InsufficientQuantityError();

      expect(insufficientQuantityError.status).to.equal(409);
    });

    it('should return accept metadata', () => {
      const testId = 'Test Message';
      const testQuantity = 2;
      const testRequested = 4;
      const testDetailMessage = 'Test Detail';
      const insufficientQuantityError = new InsufficientQuantityError(
        {
          id: testId,
          quantity: testQuantity,
          requested: testRequested,
          detail: testDetailMessage,
        },
      );

      expect(insufficientQuantityError.id).to.equal(testId);
      expect(insufficientQuantityError.quantity).to.equal(testQuantity);
      expect(insufficientQuantityError.requested).to.equal(testRequested);
      expect(insufficientQuantityError.detail).to.equal(testDetailMessage);
    });
  });

  context('ItemNotFoundError', () => {
    it('should return status 404 as default', () => {
      const itemNotFoundError = new ItemNotFoundError();

      expect(itemNotFoundError.status).to.equal(404);
    });

    it('should return accept metadata', () => {
      const testId = 'Test Message';
      const testDetailMessage = 'Test Detail';
      const itemNotFoundError = new ItemNotFoundError(
        {
          id: testId,
          detail: testDetailMessage,
        },
      );

      expect(itemNotFoundError.id).to.equal(testId);
      expect(itemNotFoundError.detail).to.equal(testDetailMessage);
    });
  });

  context('DatabaseError', () => {
    it('should return status 500 as default', () => {
      const databaseError = new DatabaseError();

      expect(databaseError.status).to.equal(500);
    });

    it('should return accept metadata', () => {
      const testId = 'Test Message';
      const testDetailMessage = 'Test Detail';
      const databaseError = new ItemNotFoundError(
        {
          id: testId,
          detail: testDetailMessage,
        },
      );

      expect(databaseError.id).to.equal(testId);
      expect(databaseError.detail).to.equal(testDetailMessage);
    });
  });
});
