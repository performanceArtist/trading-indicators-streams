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
exports.makeMovingStopLoss = exports.getHighLow = exports.getHighLowStop = exports.thresholdStopLoss = exports.movingStopLossFromCandles = void 0;
const fp_ts_1 = require("fp-ts");
const function_1 = require("fp-ts/lib/function");
const rxjs_1 = require("rxjs");
const stopLoss_1 = require("./stopLoss");
const rxo = __importStar(require("rxjs/operators"));
const switchMapEither_1 = require("../utils/switchMapEither");
const splitStream_1 = require("../utils/splitStream");
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const rx = __importStar(require("rxjs"));
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
exports.movingStopLossFromCandles = (0, function_1.pipe)(fp_ts_adt_1.container.create()('getClosedCurrentCandle', 'spot'), fp_ts_adt_1.container.map((deps) => ({ order, symbol, interval, count, getStop }) => {
    const { spot, getClosedCurrentCandle } = deps;
    return (0, exports.makeMovingStopLoss)({
        spot,
        getRestop: (current) => (0, function_1.pipe)(getClosedCurrentCandle({
            symbol,
            interval,
        }), (0, splitStream_1.splitStream)(count), rxo.map(fp_ts_1.array.sequence(fp_ts_1.either.either)), rxo.map(fp_ts_1.either.chain((candles) => getStop(candles, current.getValue(), order)))),
    })({ order, symbol });
}));
exports.thresholdStopLoss = (0, function_1.pipe)(exports.movingStopLossFromCandles, fp_ts_adt_1.container.map((movingStopLossFromCandles) => (params) => movingStopLossFromCandles(Object.assign(Object.assign({}, params), { getStop: (candles, prevStop, order) => (0, function_1.pipe)(params.getStop(candles, prevStop, order), fp_ts_1.either.chain((newStop) => {
        const max = params.maxLimit(order.price);
        const isTargetReached = prevStop.limit >= max;
        if (isTargetReached) {
            return fp_ts_1.either.left(new Error('Target reached'));
        }
        else {
            const finalStop = newStop.limit >= max
                ? (0, stopLoss_1.fromLimit)(1 - newStop.limit / newStop.stop)(max)
                : newStop;
            return fp_ts_1.either.right(finalStop);
        }
    }), fp_ts_1.either.filterOrElse((newStop) => newStop.stop > prevStop.stop, () => new Error('Stop loss should be moved towards the profit side'))) }))));
const getHighLowStop = ({ getLimit, fromCandle, stopOffsetPercent, }) => (candles) => (0, function_1.pipe)(candles, fp_ts_1.array.last, fp_ts_1.option.map((last) => (0, stopLoss_1.fromLimit)(stopOffsetPercent)(getLimit(last, (0, exports.getHighLow)(fromCandle)(candles)))), fp_ts_1.either.fromOption(() => new Error('Failed to calculate stop loss')));
exports.getHighLowStop = getHighLowStop;
const getHighLow = (fromCandle) => (candles) => (0, function_1.pipe)(candles, fp_ts_1.array.map(fromCandle), (prices) => ({
    high: Math.max(...prices),
    low: Math.min(...prices),
}));
exports.getHighLow = getHighLow;
const makeMovingStopLoss = (deps) => ({ order, symbol }) => {
    const { spot, getRestop } = deps;
    const current = new rxjs_1.BehaviorSubject(order);
    const filled$ = (0, function_1.pipe)(current.asObservable(), rxo.switchMap((current) => current.filled$));
    const closed = new rx.Subject();
    const closed$ = closed.asObservable();
    const stopLoss$ = (0, function_1.pipe)(getRestop(current), rxo.takeUntil(rx.merge(filled$, closed$)), (0, switchMapEither_1.switchMapEither)(({ stop, limit }) => (0, function_1.pipe)(current.getValue().cancel(), (0, switchMapEither_1.switchMapEither)(() => spot.stopLossLimit({
        symbol,
        quantity: order.quantity,
        stop,
        limit,
    })), fp_ts_rxjs_1.observableEither.map((stopLoss) => (Object.assign(Object.assign({}, stopLoss), { stop,
        limit }))))), fp_ts_rxjs_1.observableEither.map((newStop) => current.next(Object.assign(Object.assign({}, current.getValue()), newStop))));
    return {
        stopLoss$,
        current,
        close: () => {
            closed.next();
            return current.getValue().cancel();
        },
    };
};
exports.makeMovingStopLoss = makeMovingStopLoss;
