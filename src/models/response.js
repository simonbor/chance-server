'use strict'
module.exports = class ChanceResponse {
    constructor(statusCode, statusText, data) {
        this.data = data;
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
  }
