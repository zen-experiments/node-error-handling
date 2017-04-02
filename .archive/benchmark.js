'use strict';

const {Suite} = require('benchmark');
const suite = new Suite();

function exceptionProducer(param) {
    if (param > 100) {
        throw new Error('param is larger than 100');
    }
}

function exceptionConsumer() {
    try {
        exceptionProducer(101);
    } catch (err) {
        // do something with error, just for
        // completness sake
        const {message} = err;
    }
}

function errorProducer(param) {
    if (param > 100) {
        return new Error('param is larger than 100');
    }
}

function errorConsumer() {
    const result = errorProducer(101);

    if (result instanceof Error) {
        // do something with error, just for
        // completness sake
        const {message} = result;
    }
}

suite.add('Error production & consumption', () => {
    errorConsumer();
}).add('Exception production & consumption', () => {
    exceptionConsumer();
}).on('cycle', function(event) {
    console.log(event.target.stats.mean);
    console.log(event.target.times);
    console.log(String(event.target));
}).on('complete', function() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
}).run({
    async: true
});
