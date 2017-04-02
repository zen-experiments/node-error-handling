'use strict';

const {getContext} = require('./context');

function report(iid, error) {
    console.error(`${iid}:`, error);
}

function track(iid, message, data) {
    console.log(`${iid}:`, message, data);
}

module.exports = {
    report,
    track
};
