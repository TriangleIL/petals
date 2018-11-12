const AppError = require('./app_error');

module.exports = class InsufficientQuantityError extends AppError {
  /**
   * Create an InsufficientQuantityError
   * @param {Number} id        Item ID
   * @param {Number} quantity  Quantity Available
   * @param {Number} requested Requested Quantity
   * @param {String} detail    Detail message
   */
  constructor({
    id, quantity, requested, detail,
  } = {}) {
    super({ message: 'InsufficientQuantityError - Not enough of item remaining to fulfill request', status: 409 });

    this.id = id;
    this.quantity = quantity;
    this.requested = requested;
    this.detail = detail;
  }
};
