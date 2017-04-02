'use strict';

class SystemError extends Error {}
class NoMatch extends Error {}
class ProductNotFound extends Error {}
class InvalidProduct extends Error {}

module.exports = function convert(err) {
    let convertedError;

    if (err instanceof SystemError) {

    } else if (err instanceof NoMatch) {

    } else if (err instanceof ProductNotFound) {

    } else if (err instanceof InvalidProduct) {

    } else {
        convertedError = new Error(err);
    }

    return convertedError;
};
