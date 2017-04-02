'use strict';
//
// const assert = require('assert');
//
// function foo(a) {
//     assert(typeof a === 'string', 'Parameter must be a String');
// }
//
// try {
//     foo(11);
// } catch (err) {
//     console.log(err);
// }

const someCondition = true;
//
// function foo() {
//     if (someCondition) {
//         throw 'some condition is violated';
//     }
// }
//
// foo();

function bar() {
    try {
        while(someCondition) {
            throw new Error('stop');
        }
    } catch (err) {
        console.log(err);
    }
}

bar();


const instance = new Library({
    shouldReportError() {
        // logic that decides when and where
    }
    onError() {

    }
})
