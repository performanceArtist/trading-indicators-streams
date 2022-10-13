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
exports.makeCandleBuyTrigger = void 0;
const marketStopLimit_1 = require("../trade/marketStopLimit");
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const function_1 = require("fp-ts/lib/function");
const rxo = __importStar(require("rxjs/operators"));
const fp_ts_1 = require("fp-ts");
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
exports.makeCandleBuyTrigger = (0, function_1.pipe)(fp_ts_adt_1.container.combine(fp_ts_adt_1.container.create()('market'), marketStopLimit_1.spotMarketStopLimit), fp_ts_adt_1.container.map(([{ market }, spotMarketStopLimit]) => ({ baseSymbol, baseInterval, trigger, orders, }) => (0, function_1.pipe)(market.getCurrentCandle({
    symbol: baseSymbol,
    interval: baseInterval,
}), fp_ts_rxjs_1.observableEither.map(trigger), rxo.filter(fp_ts_1.either.exists(function_1.identity)), fp_ts_rxjs_1.observableEither.chain(() => fp_ts_1.array.sequence(fp_ts_rxjs_1.observableEither.observableEither)((0, function_1.pipe)(orders, fp_ts_1.array.map(spotMarketStopLimit)))))));
