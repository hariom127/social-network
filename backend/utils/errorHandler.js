class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode || 500;
    //  Error.captureStackTrace is node js defauld error handling method
    let er = Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
