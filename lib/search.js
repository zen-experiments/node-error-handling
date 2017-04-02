'use strict';

const lunr = require('lunr');

const {getProduct} = require('./products');
const {getContext} = require('./context');
const {report, track} = require('./report');

const PRODUCTS = require('../data/products.json');
const index = lunr(function () {
    this.field('title', {boost: 10})
    this.ref('catalogID')
});

PRODUCTS.forEach((product) => {
    index.add(product);
});

function searchText(term, cb) {
    return new Promise((fullfil, reject) => {
        const results = index.search(term);

        if (results && results.length > 0) {
            fullfil(results);
        } else {
            reject(new Error('item not found'));
        }
    });
}

function searchItemByText(term, cb) {
    const {iid} = getContext();

    return searchText(term).then((results) => {
        const {ref: catalogID} = results[0];

        track(iid, `found item by text: ${term} --`, {catalogID});
        return {catalogID};
    }).catch((err) => {
        report(iid, err);
        throw new Error(err);
    });
}

module.exports = {
    searchItemByText
};
