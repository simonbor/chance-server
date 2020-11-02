'use strict'

const minutes = new Map([
    ['דקה', 1],
    ['שתי דקות', 2],
    ['דקותיים', 2],
    ['קמה דקות', 4],
    ['חמש דקות', 5],
    ['עשר דקות', 10],
    ['עשרים דקות', 20],
    ['שלושים דקות', 30],
    ['ארבעים דקות', 40],
    ['חמשים דקות', 50],
]);

const calculateDateStart = function(req) {
    const {Chance:{DateStart: dateStart}, Address:{Text: text}} = req.body;
    let gapTime;

    if(text.indexOf('בעוד') < 0) {
        return req.body.Chance.DateStart;
    }

    const textTime = text.slice(text.indexOf('בעוד') + 5);
    for (let [key, value] of minutes) {
        if(key === textTime) {
            gapTime = 1000 * 60 * value;
        }
    }

    return new Date((Date.parse(dateStart)) + gapTime).toLocaleString('en-US');
}

module.exports = {calculateDateStart}