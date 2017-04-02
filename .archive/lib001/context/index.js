'use strict';

const asyncHook = require('async-hook');

const contexts = new Map();
let currentUid = null;

const hasContext = (uid = currentUid) => contexts.has(uid);

// When a new async handle is created
function init(uid, handle, provider, parentId) {
    if (hasContext(parentId || currentUid)) {
        // This new async handle is the child of a handle with a context.
        // Set this handles context to that of its parent.
        contexts.set(uid, contexts.get(parentId || currentUid));
    }
}

// Before a handle starts
function pre(uid) {
    currentUid = uid;
}

// After a handle ends
function post() {
    currentUid = null;
}

// When a handle is destroyed
function destroy(uid) {
    if (hasContext(uid)) {
        contexts.delete(uid);
    }
}

asyncHook.addHooks({init, pre, post, destroy});
asyncHook.enable();

function createContext(data) {
    if (!currentUid) {
        throw new Error('createContext must be called in an async handle!');
    }

    contexts.set(currentUid, data);
    // return {id: currentUid, data};
}

function getContext() {
    return contexts.get(currentUid);
}

module.exports = {
    hasContext,
    createContext,
    getContext
};
