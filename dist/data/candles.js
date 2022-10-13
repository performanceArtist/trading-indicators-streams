"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCandleStreams = void 0;
const function_1 = require("fp-ts/lib/function");
const fp_ts_adt_1 = require("@performance-artist/fp-ts-adt");
const market_1 = require("../trade/market");
exports.makeCandleStreams = (0, function_1.pipe)(fp_ts_adt_1.container.combine(fp_ts_adt_1.container.create()('market'), market_1.getClosedCurrentCandle, market_1.getXLastCandles), fp_ts_adt_1.container.map(([{ market }, getClosedCurrentCandle, getXLastCandles]) => ({ symbol, interval, lookbehind }) => ({
    historical$: getXLastCandles({
        symbol,
        interval,
        total: lookbehind,
    }),
    current$: market.getCurrentCandle({ symbol, interval }),
    currentClosed$: getClosedCurrentCandle({ symbol, interval }),
})));
