'use strict';

const assert = require('assert');

function foo(a) {
    assert(typeof a === 'string', 'Parameter must be a String');
}

try {
    foo(11);
} catch (err) {
    console.log(err);
}
