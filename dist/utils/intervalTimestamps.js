"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCloseHighLowAverage = exports.intervalTimestamps = void 0;
exports.intervalTimestamps = {
    '1m': 60 * 1000,
    '3m': 3 * 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '30m': 30 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '2h': 2 * 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '6h': 6 * 60 * 60 * 1000,
    '8h': 8 * 60 * 60 * 1000,
    '12h': 12 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000,
    '3d': 3 * 24 * 60 * 60 * 1000,
    '1w': 7 * 24 * 60 * 60 * 1000,
    '1M': 4 * 7 * 24 * 60 * 60 * 1000,
};
const openCloseHighLowAverage = ({ open, close, high, low }) => (open + close + high + low) / 4;
exports.openCloseHighLowAverage = openCloseHighLowAverage;
