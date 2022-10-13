"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchMapEither = void 0;
const fp_ts_1 = require("fp-ts");
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const function_1 = require("fp-ts/lib/function");
const operators_1 = require("rxjs/operators");
const switchMapEither = (f) => (o) => (0, function_1.pipe)(o, (0, operators_1.switchMap)(fp_ts_1.either.fold((e) => fp_ts_rxjs_1.observable.of(fp_ts_1.either.left(e)), f)));
exports.switchMapEither = switchMapEither;
