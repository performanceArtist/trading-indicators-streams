"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSplitEMATrend = exports.getCurrentEMATrend = exports.makeEMATrendAcc = void 0;
const fp_ts_1 = require("fp-ts");
const function_1 = require("fp-ts/lib/function");
const trading_indicators_1 = require("trading-indicators");
const trading_indicators_2 = require("trading-indicators");
const data_1 = require("../data");
const data_2 = require("../simulation/data");
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
const makeEMATrendAcc = ({ emaPeriod, fromCandle }) => (0, data_1.makeAccStreams)((0, function_1.flow)(fp_ts_1.array.map(fromCandle), (0, trading_indicators_2.getExponentialMA)(emaPeriod), fp_ts_1.option.chain((maAcc) => (0, function_1.pipe)((0, trading_indicators_1.initTrendAcc)(maAcc), fp_ts_1.option.map((trendAcc) => ({ trendAcc, maAcc })))), fp_ts_1.either.fromOption(() => new Error('Failed to build a trend'))), (acc, cur) => {
    const nextMA = (0, trading_indicators_1.nextExponentialMA)(emaPeriod)(acc.maAcc, fromCandle(cur));
    const nextTrend = (0, trading_indicators_1.nextTrendAcc)(acc.trendAcc, fp_ts_1.nonEmptyArray.last(nextMA));
    return fp_ts_1.either.right({
        maAcc: nextMA,
        trendAcc: nextTrend,
    });
});
exports.makeEMATrendAcc = makeEMATrendAcc;
exports.getCurrentEMATrend = (0, function_1.pipe)(data_1.makeCandleStreams, fp_ts_adt_1.container.map((makeCandleStreams) => (params) => (0, function_1.pipe)(makeCandleStreams(params), (0, exports.makeEMATrendAcc)(params))));
exports.getSplitEMATrend = (0, function_1.pipe)(data_2.makeSplitCandleStreams, fp_ts_adt_1.container.map((makeSplitCandleStreams) => (params) => (0, function_1.pipe)(makeSplitCandleStreams(params), (0, exports.makeEMATrendAcc)(params))));
