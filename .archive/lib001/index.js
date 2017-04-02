'use strict';

const assert = require('assert');
const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(morgan('dev'));

app.get('/products/:id', require('./products/'));
app.get('/search/:term', require('./search/'));

app.listen(4000, () => {
    console.log('Listening on 4000');
});
