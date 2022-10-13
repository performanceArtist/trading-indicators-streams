"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromLimit = exports.fromLossPercent = void 0;
const fromLossPercent = (lossPercent, stopOffsetPercent) => (price) => (0, exports.fromLimit)(stopOffsetPercent)(price * (1 - lossPercent));
exports.fromLossPercent = fromLossPercent;
const fromLimit = (stopOffsetPercent) => (limit) => ({
    limit,
    stop: limit * (1 + stopOffsetPercent),
});
exports.fromLimit = fromLimit;
