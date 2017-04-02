'use strict';

const lunr = require('lunr');
const rq = require('request');
const uuid = require('uuid/v4');

const {createContext} = require('../context/');
const report = require('../report/');

let request, index;

function init() {
    const {PRODUCTS} = require('../mock/');

    request = rq.defaults({
        json: true,
        baseUrl: 'http://localhost:4000'
    });

    index = lunr(function () {
        this.field('title', {boost: 10})
        this.ref('id')
    });

    PRODUCTS.forEach((product) => {
        index.add(product);
    });
}

function find(term) {
    const results = index.search(term);
    const {ref:id = ''} = results[0];

    return id;
}

function getProduct(id) {
    return new Promise((fullfil, reject) => {
        request(`/products/${id}`, (error, response, body) => {
            fullfil(body);
        });
    })
}

function startContext() {
    const iid = uuid();
    console.log(iid);
    createContext({id: iid});
}

function handleSearch(req, res) {
    startContext();
    const {term} = req.params;

    const id = find(term);

    request(`/products/${id}`, (err, response, body) => {
        res.status(200).send(body);
    });
}

init();

module.exports = handleSearch;
