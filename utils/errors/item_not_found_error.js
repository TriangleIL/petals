const AppError = require('./app_error');

module.exports = class ItemNotFoundError extends AppError {
  /**
   * Create an ItemNotFoundError
   * @param {Number} id     Item ID
   * @param {string} detail Detailed Error Message
   */
  constructor({ id, detail } = {}) {
    super({ message: 'ItemNotFoundError - Item does not exist', status: 404 });

    this.id = id;
    this.detail = detail;
  }
};
