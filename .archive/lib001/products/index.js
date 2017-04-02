'use strict';


const {getContext} = require('../context/');
const report = require('../report/');
const {PRODUCTS} = require('../mock/');

function get(id) {
    return PRODUCTS.find((product) => {
        return product.id === id;
    });
}

function handleProduct(req, res) {
    try {
        const {id} = req.params;

        const context = getContext();
        console.log(context);

        const product = get(id);

        res.status(200).send(product);
    } catch (err) {
        report(err);
        res.status(404).send(err);
    }
}

module.exports = handleProduct;
