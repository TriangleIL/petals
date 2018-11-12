const AppError = require('./app_error');

module.exports = class DatabaseError extends AppError {
  /**
   * Create a DatabaseError
   * @param {String} detail Details message
   */
  constructor({ detail } = {}) {
    // Hide actual details from API consumers for potentially sensitive information
    super({ message: 'ServiceUnavailable - Unable to complete the request at this time', status: 500 });

    this.detail = detail;
  }
};
