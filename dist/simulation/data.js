"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMockCandleStreams = exports.makeSplitCandleStreams = exports.defaultGetCurrentCandle = void 0;
const fp_ts_1 = require("fp-ts");
const function_1 = require("fp-ts/lib/function");
const rxo = __importStar(require("rxjs/operators"));
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const switchMapEither_1 = require("../utils/switchMapEither");
const rx = __importStar(require("rxjs"));
const market_1 = require("../trade/market");
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
const defaultGetCurrentCandle = (open, close) => (lastOpen) => {
    const isUp = Math.random() > 0.5;
    const change = Math.random() / 20;
    const newPrice = isUp
        ? lastOpen.close * (1 + change)
        : lastOpen.close * (1 - change);
    const volumeChange = Math.random() / 10;
    return {
        open: open.close,
        high: Math.max(lastOpen.high, newPrice),
        low: Math.min(lastOpen.low, newPrice),
        close: newPrice,
        volume: lastOpen.volume * (1 + volumeChange),
        timestamp: close.timestamp,
    };
};
exports.defaultGetCurrentCandle = defaultGetCurrentCandle;
exports.makeSplitCandleStreams = (0, function_1.pipe)(fp_ts_adt_1.container.combine(market_1.getXLastCandles, market_1.getXCandles), fp_ts_adt_1.container.map(([getXLastCandles, getXCandles]) => (params) => {
    const { startTime, total, symbol, interval, historicalTotal, getCurrentCandle, intervalDelay, updatesInInterval, } = params;
    const total$ = (0, function_1.pipe)(startTime, fp_ts_1.option.fold(() => (0, function_1.pipe)(getXLastCandles({
        symbol,
        interval,
        total,
    })), (startTime) => getXCandles({ symbol, interval, startTime, total })));
    return (0, exports.makeMockCandleStreams)({
        total$,
        historicalTotal,
        getCurrentCandle,
        intervalDelay,
        updatesInInterval,
    });
}));
const makeMockCandleStreams = (params) => {
    const { total$, historicalTotal, getCurrentCandle, intervalDelay, updatesInInterval, } = params;
    const historical$ = (0, function_1.pipe)(total$, fp_ts_rxjs_1.observableEither.map((total) => total.slice(0, historicalTotal)));
    const all$ = (0, function_1.pipe)(total$, rxo.map(fp_ts_1.either.chain((total) => (0, function_1.pipe)(total.slice(historicalTotal - 1, total.length), fp_ts_1.array.chunksOf(2), fp_ts_1.nonEmptyArray.fromArray, fp_ts_1.either.fromOption(() => new Error('Not enough data'))))), (0, switchMapEither_1.switchMapEither)((pairs) => (0, function_1.pipe)(rx.from(fp_ts_1.nonEmptyArray.tail(pairs)), rxo.concatMap((pair) => (0, function_1.pipe)(rx.of(pair), rxo.delay(intervalDelay))), rxo.filter((pair) => pair.length === 2), rxo.map((pair) => fp_ts_1.either.right(pair)), rxo.startWith(fp_ts_1.either.right(fp_ts_1.nonEmptyArray.head(pairs))))), (0, switchMapEither_1.switchMapEither)(([open, close]) => {
        const next = getCurrentCandle(open, close);
        return (0, function_1.pipe)(rx.from([...Array(updatesInInterval)]
            .map((_) => 0)
            .reduce((acc) => (0, function_1.pipe)(acc, fp_ts_1.array.append(next(fp_ts_1.nonEmptyArray.last(acc)))), fp_ts_1.nonEmptyArray.of(next(open)))), rxo.map((current) => fp_ts_1.either.right({ current, currentClosed: close })));
    }), rxo.shareReplay(1));
    const currentClosed$ = (0, function_1.pipe)(all$, fp_ts_rxjs_1.observableEither.map((all) => all.currentClosed), rxo.distinctUntilChanged((a, b) => a._tag === 'Right' && b._tag === 'Right' && a.right === b.right));
    const current$ = (0, function_1.pipe)(all$, fp_ts_rxjs_1.observableEither.map((all) => all.current));
    return {
        historical$,
        currentClosed$,
        current$,
    };
};
exports.makeMockCandleStreams = makeMockCandleStreams;
