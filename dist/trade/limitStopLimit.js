"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMarginLimitStopLimit = exports.makeSpotLimitStopLimit = void 0;
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const function_1 = require("fp-ts/lib/function");
const switchMapEither_1 = require("../utils/switchMapEither");
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
exports.makeSpotLimitStopLimit = (0, function_1.pipe)(fp_ts_adt_1.container.create()('spot', 'getBalance'), fp_ts_adt_1.container.map(({ spot, getBalance }) => ({ symbol, price, getBudget, getStop }) => (0, function_1.pipe)(getBalance(symbol.base), fp_ts_rxjs_1.observableEither.map(getBudget), (0, switchMapEither_1.switchMapEither)((budget) => spot.limitBuy({ symbol, budget, price })), (0, switchMapEither_1.switchMapEither)((res) => res.filled$), fp_ts_rxjs_1.observableEither.chain(({ price, quantity }) => (0, function_1.pipe)(spot.stopLossLimit(Object.assign({ symbol,
    quantity }, getStop(price))), fp_ts_rxjs_1.observableEither.map((order) => (Object.assign(Object.assign({ price,
    quantity }, order), getStop(price)))))))));
exports.makeMarginLimitStopLimit = (0, function_1.pipe)(fp_ts_adt_1.container.create()('margin', 'getBalance'), fp_ts_adt_1.container.map(({ margin, getBalance }) => ({ symbol, price, multiplier, getBudget, getStop }) => (0, function_1.pipe)(getBalance(symbol.base), fp_ts_rxjs_1.observableEither.map(getBudget), (0, switchMapEither_1.switchMapEither)((budget) => margin.limitBuy({ symbol, budget, price, multiplier })), (0, switchMapEither_1.switchMapEither)((res) => res.filled$), fp_ts_rxjs_1.observableEither.chain(({ price, quantity }) => (0, function_1.pipe)(margin.stopLossLimit(Object.assign({ symbol, side: 'SELL', quantity }, getStop(price))), fp_ts_rxjs_1.observableEither.map((order) => (Object.assign(Object.assign({ price,
    quantity }, order), getStop(price)))))))));
