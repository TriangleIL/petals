module.exports = class AppError extends Error {
  /**
   * Create an AppError - Base Error for all errors
   *
   * @param {String} message Error message
   * @param {Number} status  Status Code
   */
  constructor({ message, status }) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    // Default to 500 unless it's passed in
    this.status = status || 500;

    this.error = this.constructor.name;
    this.reason = message;
  }
};
