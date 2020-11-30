'use strict'

const timesOfDay = new Map([
    ['בבוקר', 0],
    ['בערב', 12],
    ['אחרי הצהרים', 12],
    ['בלילה', 0],
]);

const tenthsAndFractures = new Map([
    ['ועשרה', 10],
    ['ורבע', 15],
    ['ועשרים', 20],
    ['וחצי', 30],
    ['ושלושים', 30],
    ['עשרים ל', 40],
    ['ושלושת רבעי', 45],
    ['רבע ל', 45],
    ['עשרה ל', 50],
]);

const hours = new Map([
    ['אחתעשרה', 11],
    ['שתייםעשרה', 12],
    ['אחד', 1],
    ['שתיים', 2],
    ['שלוש', 3],
    ['ארבע', 4],
    ['חמש', 5],
    ['שש', 6],
    ['שבע', 7],
    ['שמונה', 8],
    ['לתשע', 8],
    ['תשע', 9],
    ['לעשר', 9],
    ['עשר', 10],
]);

const minutes = new Map([
    ['דקה', 1],
    ['שתי דקות', 2],
    ['דקותיים', 2],
    ['כמה דקות', 4],
    ['חמש דקות', 5],
    ['עשר דקות', 10],
    ['עשרים דקות', 20],
    ['שלושים דקות', 30],
    ['ארבעים דקות', 40],
    ['חמשים דקות', 50],
]);

const inSomeTimeLeaving = function(req) {
    const {Chance:{DateStart: dateStart}, Address:{Text: text}} = req.body;
    let gapTime;

    const textTime = text.slice(text.indexOf('בעוד') + 5);
    for (let [key, value] of minutes) {
        if(key === textTime) {
            gapTime = 1000 * 60 * value;
        }
    }

    return gapTime
        ? new Date((Date.parse(dateStart)) + gapTime).toLocaleString('en-US')
        : dateStart;
}

const leavingAt = function(req, days) {
    let { Address:{ Text: text } } = req.body;
    let hourValue = 0, minuteValue = 0, amPmValue = 0;

    // logic simplification
    text = text.replace('אחת עשרה', 'אחתעשרה').replace('שתיים עשרה', 'שתייםעשרה');

    // retrieve hour
    for (let [key, value] of hours) {
        if(text.indexOf(key) > 0) {
            hourValue = value;
            break;
        }
    }

    // retrieve minutes
    for (let [key, value] of tenthsAndFractures) {
        if(text.indexOf(key) > 0) {
            minuteValue = value;
            break;
        }
    }

    // retrieve Morning / Evening
    for (let [key, value] of timesOfDay) {
        if(text.indexOf(key) > 0) {
            amPmValue = value;
            break;
        }
    }

    return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + days,
        hourValue + amPmValue,
        minuteValue
    );
}

const calculateDateStart = function(req) {
    const { Address:{ Text: text } } = req.body;

    if(text.indexOf('בעוד') > 0) {
        return inSomeTimeLeaving(req);

    } else if(text.indexOf('היום') > 0) {
        return leavingAt(req, 0);

    } else if(text.indexOf('מחר') > 0) {
        return leavingAt(req, 1);

    } else if(text.indexOf('מחרתיים') > 0) {
        return leavingAt(req, 2);
    }

    return req.body.Chance.DateStart;
}

module.exports = {calculateDateStart}