'use strict'
const { HttpStatusCode } = require('./enums');

// https://www.toptal.com/nodejs/node-js-error-handling
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class BaseError extends Error {
    constructor(name, httpCode, description, isOperational) {
        super(description);

        this.name = name;
        this.httpCode = httpCode;
        this.description = description;
        this.isOperational = isOperational;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseError);
        }
    }
}

class ApiError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, description = 'internal server error', isOperational = true) {
        super(name, httpCode, description, isOperational);
    }
}

class Http400Error extends BaseError {
    constructor(description = 'invalid request') {
        super('BadRequestError', HttpStatusCode.BAD_REQUEST, description, true);
    }
}

class Http401Error extends BaseError {
    constructor(description = 'invalid token') {
        super('UnauthorizedError', HttpStatusCode.UNAUTHORIZED, description, true);
    }
}

class Http403Error extends BaseError {
    constructor(description = 'insufficient scope') {
        super('ForbiddenError', HttpStatusCode.FORBIDDEN, description, true);
    }
}

module.exports = { BaseError, ApiError, Http400Error, Http401Error, Http403Error }