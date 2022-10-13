"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetAverageBTCDominance = exports.makeGetAverageDominance = exports.makeGetBTCDominance = exports.makeGetDominance = void 0;
const fp_ts_1 = require("fp-ts");
const function_1 = require("fp-ts/lib/function");
const trading_indicators_1 = require("trading-indicators");
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const Apply_1 = require("fp-ts/lib/Apply");
const utils_1 = require("../utils");
const partial_1 = require("../utils/partial");
const market_1 = require("../trade/market");
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
exports.makeGetDominance = (0, function_1.pipe)(market_1.getXCandles, fp_ts_adt_1.container.map((getXCandles) => ({ symbol, baseSymbol, interval, startTime, candleTotal, }) => (0, function_1.pipe)((0, Apply_1.sequenceT)(fp_ts_rxjs_1.observableEither.observableEither)(getXCandles({
    symbol: baseSymbol,
    total: candleTotal,
    interval,
    startTime,
}), getXCandles({
    symbol,
    total: candleTotal,
    interval,
    startTime,
})), fp_ts_rxjs_1.observableEither.map(([btc, derived]) => (0, trading_indicators_1.getDominance)(btc, derived)))));
exports.makeGetBTCDominance = (0, function_1.pipe)(exports.makeGetDominance, fp_ts_adt_1.container.map((0, partial_1.partialf)({ baseSymbol: { base: 'BTC', quote: 'USDT' } })));
exports.makeGetAverageDominance = (0, function_1.pipe)(exports.makeGetDominance, fp_ts_adt_1.container.map((makeGetDominance) => ({ symbol, baseSymbol, interval, repeat, startTime, candleTotal, }) => (0, function_1.pipe)([...Array(repeat).keys()], fp_ts_1.array.traverse(fp_ts_rxjs_1.observableEither.observableEither)((period) => makeGetDominance({
    symbol,
    baseSymbol,
    interval,
    startTime: startTime + period * 1000 * utils_1.intervalTimestamps[interval],
    candleTotal,
})), fp_ts_rxjs_1.observableEither.map((results) => (0, function_1.pipe)(results, fp_ts_1.array.reduce(0, (acc, cur) => acc + cur), (sum) => sum / results.length)))));
exports.makeGetAverageBTCDominance = (0, function_1.pipe)(exports.makeGetAverageDominance, fp_ts_adt_1.container.map((0, partial_1.partialf)({ baseSymbol: { base: 'BTC', quote: 'USDT' } })));
