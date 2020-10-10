'use strict'

describe('authentication token module test', () => {
    const tokenAuth = require('../src/auth-token');
    const { Http401Error } = require('../src/errors');
    const payload = { userId: 1, role: 1};

    test('token sign test', () => {
        const expiresIn = 60 * 60;   // 3600 sec = 1 hour
        const token = tokenAuth.sign(payload, expiresIn);
        
        expect(typeof token).toBe('string');
        expect(token.length > 0).toBeTruthy();
    });
    
    test('token verify test', () => {
        const expiresIn = 60 * 60;   // 3600 sec = 1 hour
        const token = tokenAuth.sign(payload, expiresIn);
        const result = tokenAuth.verify(token);

        expect(payload).toEqual(result);
    });    

    test('token expiration test', () => {
        const expiresIn = -1;
        const token = tokenAuth.sign(payload, expiresIn);
        let result;
        
        try{
            result = tokenAuth.verify(token);
        } catch(err) {
            expect(err instanceof Http401Error).toBeTruthy();
        }
        
        expect(result).toEqual(undefined);
    });
});