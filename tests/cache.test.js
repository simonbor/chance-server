'use strict'
const cache = require('../src/cache');

describe('cache tests', () => {
    beforeAll(async () => {});
    beforeEach(async () => {});
  
    test('test cache - simple save and load', async () => {
        const payload = { payload: 'true' };
        cache.set('payload', payload);

        expect(cache.get('payload')).toEqual(payload);
    });  

    test('test cache - load expired data', (done) => {
        const payload = { payload: 'true' };
        cache.set('payload', payload, 100);

        globalThis.setTimeout(function() {
            expect(cache.get('payload')).toEqual(null);
            done();
        }, 110);
    });
});