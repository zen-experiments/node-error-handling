'use strict';

const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid/v4');

const {createContext} = require('./context');
const {report} = require('./report');
const {find} = require('./find');

const app = express();
app.use(morgan('dev'));

app.get('/search/:term', async (req, res) => {
    const iid = uuid();

    createContext({iid});

    const {term} = req.params;
    const result = await find(term);

    res.status(200).send({iid, result});
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});
