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

const  soonLeaving = function(req) {
    const {Chance:{DateStart: dateStart}, Address:{Text: text}} = req.body;
    let gapTime;

    const textTime = text.slice(text.indexOf('בעוד') + 5);
    for (let [key, value] of minutes) {
        if(key === textTime) {
            gapTime = 1000 * 60 * value;
        }
    }

    return new Date((Date.parse(dateStart)) + gapTime).toLocaleString('en-US');
}

const  todaysLeaving = function(req) {

    return req.body.Chance.DateStart;
}

const  tomorrowsLeaving = function(req) {

    return req.body.Chance.DateStart;
}

const calculateDateStart = function(req) {
    const {Chance:{DateStart: dateStart}, Address:{Text: text}} = req.body;

    if(text.indexOf('בעוד') > 0) {
        return soonLeaving(req);

    } else if(text.indexOf('היום ב') > 0) {
        return todaysLeaving(req);

    } else if(text.indexOf('מחר ב') > 0) {
        return tomorrowsLeaving(req);
    }

    return req.body.Chance.DateStart;
}

module.exports = {calculateDateStart}