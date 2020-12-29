'use strict'
module.exports = class ChanceResponse {
    constructor(statusCode, statusText, data) {
        this.data = Array.isArray(data) ? data : [data];
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
  }
