"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialf = exports.partial = void 0;
const partial = (f) => (defaults) => (e) => f(Object.assign(Object.assign({}, e), defaults));
exports.partial = partial;
const partialf = (defaults) => (f) => (e) => f(Object.assign(Object.assign({}, e), defaults));
exports.partialf = partialf;
