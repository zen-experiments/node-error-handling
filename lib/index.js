'use strict';

const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid/v4');

const {searchItemByText} = require('./search');
const {getProduct} = require('./products');

const {createContext, getContext} = require('./context');
const {report, track} = require('./report');

const app = express();
app.use(morgan('dev'));

app.get('/search/:term', (req, res) => {
    const {term} = req.params;
    const iid = uuid();
    createContext({iid});

    searchItemByText(term).then(({catalogID}) => {
        getProduct(catalogID).then((product) => {
            track(iid, 'found product --', product);
            res.status(200).send(product);
        }).catch((err) => {
            report(iid, err);
            res.status(404).send(err);
        });
    }).catch((err) => {
        report(iid, err);
        res.status(404).send(err);
    });
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});
