'use strict';

const Roles = Object.freeze(
{ 
    Admin: 1, 
    Manager: 5, 
    User: 9 
});

const HttpStatusCode = Object.freeze(
{ 
    SUCCESS: 200, 
    BAD_REQUEST: 400, 
    UNAUTHORIZED: 401, 
    FORBIDDEN: 403, 
    NOT_FOUND: 404, 
    INTERNAL_SERVER: 500 
});

module.exports = { Roles, HttpStatusCode }