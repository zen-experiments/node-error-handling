'use strict';

const request = require('request');
const {getContext, createContext} = require('./context');

function getPosts(cb) {
    setTimeout(() => {
        const {id} = getContext();

        request(`https://jsonplaceholder.typicode.com/photos/${id}`, (error, response, body) => {
            cb(null, body);
        });
    }, 100);
}

module.exports = {
    getPosts
};
