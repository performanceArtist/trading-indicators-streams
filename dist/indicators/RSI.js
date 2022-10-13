"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRSIStreams = exports.makeRSIAccStreams = exports.getCandleRSIAcc = void 0;
const fp_ts_1 = require("fp-ts");
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const function_1 = require("fp-ts/lib/function");
const trading_indicators_1 = require("trading-indicators");
const data_1 = require("../data");
const getCandleRSIAcc = (fromCandle) => (period) => (candles) => (0, function_1.pipe)(candles, fp_ts_1.array.map(fromCandle), (0, trading_indicators_1.initRSIAcc)(period));
exports.getCandleRSIAcc = getCandleRSIAcc;
const makeRSIAccStreams = ({ fromCandle, period }) => (0, data_1.makeAccStreams)((0, function_1.flow)((0, exports.getCandleRSIAcc)(fromCandle)(period), fp_ts_1.either.fromOption(() => new Error('Failed to calculate RSI'))), (acc, cur) => fp_ts_1.either.right((0, trading_indicators_1.nextRSIAcc)(period)(acc, fromCandle(cur))));
exports.makeRSIAccStreams = makeRSIAccStreams;
const makeRSIStreams = (params) => (0, function_1.flow)((0, exports.makeRSIAccStreams)(params), ({ closed$, current$, }) => {
    const closedRSI$ = (0, function_1.pipe)(closed$, fp_ts_rxjs_1.observableEither.map(trading_indicators_1.fromRSIAcc));
    return {
        closed$: closedRSI$,
        currentClosed$: (0, function_1.pipe)(closedRSI$, fp_ts_rxjs_1.observableEither.map(fp_ts_1.nonEmptyArray.last)),
        current$: (0, function_1.pipe)(current$, fp_ts_rxjs_1.observableEither.map(([_, rsi]) => (0, function_1.pipe)(rsi, fp_ts_1.nonEmptyArray.last, (rsi) => rsi.rsi))),
    };
});
exports.makeRSIStreams = makeRSIStreams;
