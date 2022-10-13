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
exports.getClosedCurrentCandle = exports.getXLastCandles = exports.getXCandles = void 0;
const fp_ts_1 = require("fp-ts");
const function_1 = require("fp-ts/lib/function");
const rxo = __importStar(require("rxjs/operators"));
const utils_1 = require("../utils");
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
exports.getXCandles = (0, function_1.pipe)(fp_ts_adt_1.container.create()('market'), fp_ts_adt_1.container.map(({ market }) => ({ symbol, interval, startTime, total }) => (0, function_1.pipe)(market.getCandles({
    symbol,
    interval,
    startTime,
    endTime: startTime + utils_1.intervalTimestamps[interval] * total,
    limit: total,
}), rxo.map(fp_ts_1.either.filterOrElse((candles) => candles.length === total, (candles) => new Error(`Expected ${total} candles, received ${candles.length}`))))));
exports.getXLastCandles = (0, function_1.pipe)(fp_ts_adt_1.container.create()('market'), fp_ts_adt_1.container.map(({ market }) => ({ symbol, interval, total }) => (0, function_1.pipe)(market.getCandles({
    symbol,
    interval,
    startTime: Date.now() - utils_1.intervalTimestamps[interval] * (total + 1),
    endTime: Date.now(),
    limit: total,
}), rxo.map(fp_ts_1.either.filterOrElse((candles) => candles.length === total, (candles) => new Error(`Expected ${total} candles, received ${candles.length}`))))));
exports.getClosedCurrentCandle = (0, function_1.pipe)(fp_ts_adt_1.container.create()('market'), fp_ts_adt_1.container.map(({ market }) => (0, function_1.flow)(market.getCurrentCandle, rxo.filter(fp_ts_1.either.exists((candle) => candle.isClosed)))));
