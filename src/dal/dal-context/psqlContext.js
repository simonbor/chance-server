'use strict';
const connect = require('../../connect');

module.exports = class MssqlContext {
    async execute(procedureName, request) {
        throw new Error(`PsqlContext isn't implemented`);
    }
}