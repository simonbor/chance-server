'use strict'
const {BaseError} = require('./errors');

// https://www.toptal.com/nodejs/node-js-error-handling
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class ErrorHandler {
  async handleError(err) {
    // print error to console
    // process.env.NODE_ENV && process.env.NODE_ENV != 'test' &&
    console.error(err);

    // log the error
    // await logger.error('Error message from the centralized error-handling component', err);
  }
 
  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }

    return false;
  }
}

const errorHandler = new ErrorHandler();
module.exports = errorHandler;