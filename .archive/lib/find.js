'use strict';

const lunr = require('lunr');

const {getContext} = require('./context');
const {report} = require('./report');

const {PRODUCTS} = require('./mock');

const index = lunr(function () {
    this.field('title', {boost: 10})
    this.ref('id')
});

PRODUCTS.forEach((product) => {
    index.add(product);
});

function find(term) {
    const results = index.search(term);
    const {ref:id = ''} = results[0];

    const {iid} = getContext();

    return Promise.resolve({id, iid});
}

module.exports = {
    find
};
