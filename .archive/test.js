'use strict';

const loadtest = require('loadtest');

let i = 101;

loadtest.loadTest({
    url: 'http://localhost:4000/',
    method: 'GET',
    maxRequests: 2,
    concurrency: 2,
    requestGenerator(params, options, client, cb) {
        options.path = `/${i++}`;
        const request = client(options, cb);
        return request;
    }
}, (err, result) => {
    const {totalRequests, totalErrors} = result;
    console.log({totalRequests, totalErrors});
});
