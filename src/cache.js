// https://dev.to/romainlanz/create-a-simple-cache-system-47om
// https://www.mojotech.com/blog/node-js-memory-cache/

const cache = new Map()
const minute = 1000 * 60; // default living time

// pay attention while use - the item can be expired
const has = function (key) {
    return cache.has(key)
};

const set = function (key, value, ttl = minute) {
    return cache.set(key, [value, Date.now() + ttl])
};

const get = function (key) {
    if(cache.has(key) && (Date.now() < cache.get(key)[1])) {
        return cache.get(key)[0];
    } else {
        cache.delete(key);
        return null;
    }
};

const remove = function (key) {
    return cache.delete(key)
};

const clear = function () {
    return cache.clear()
};

module.exports = { set, get }