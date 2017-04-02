'use strict';

const assert = require('assert');
const express = require('express');
const morgan = require('morgan');

const {getPosts} = require('./other');
const {createContext} = require('./context');

const app = express();
app.use(morgan('dev'));

app.get('/(:iid)?', (req, res) => {
    const {iid} = req.params;
    const context = createContext({id: iid - 100});

    setTimeout(() => {
        getPosts((err, result) => {
            const {id, title} = JSON.parse(result);

            console.log({id, iid, title});
            assert(id === iid - 100);

            res.status(200).send({id, title});
        });
    }, 100);
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});
