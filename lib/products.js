'use strict';

const Datastore = require('nedb-promise');
const {getContext} = require('./context');
const {report, track} = require('./report');
const PRODUCTS = require('../data/products.json');

const db = new Datastore();

PRODUCTS.forEach((product) => {
    db.insert(product);
});

function getProduct(catalogID) {
    const {iid} = getContext();

    return db.findOne({catalogID}).then((product) => {
        track(iid, `found product by catalogID: ${catalogID} --`, product);
        return product;
    }).catch((err) => {
        report(iid, err);
        throw new Error(err);
    });
}

module.exports = {
    getProduct
};
