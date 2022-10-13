"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotMarketStopLimit = void 0;
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const function_1 = require("fp-ts/lib/function");
const switchMapEither_1 = require("../utils/switchMapEither");
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
exports.spotMarketStopLimit = (0, function_1.pipe)(fp_ts_adt_1.container.create()('spot', 'getBalance'), fp_ts_adt_1.container.map(({ spot, getBalance }) => ({ symbol, getBudget, getStop, }) => (0, function_1.pipe)(getBalance(symbol.base), fp_ts_rxjs_1.observableEither.map(getBudget), (0, switchMapEither_1.switchMapEither)((budget) => spot.marketBuy({ symbol, budget })), (0, switchMapEither_1.switchMapEither)(({ quantity, averagePrice }) => (0, function_1.pipe)(spot.stopLossLimit(Object.assign({ symbol,
    quantity }, getStop(averagePrice))), fp_ts_rxjs_1.observableEither.map((res) => (Object.assign(Object.assign({ price: averagePrice, quantity }, res), getStop(averagePrice)))))))));
