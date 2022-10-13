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
exports.makeMockSpot = void 0;
const rx = __importStar(require("rxjs"));
const fp_ts_rxjs_1 = require("fp-ts-rxjs");
const function_1 = require("fp-ts/lib/function");
const rxo = __importStar(require("rxjs/operators"));
const fp_ts_1 = require("fp-ts");
const makeMockSpot = (params) => {
    const actionEvent = new rx.Subject();
    const { getCurrentPrice } = params;
    let pendingOrderIds = [];
    const getLimitFilled = (action) => {
        switch (action.type) {
            case 'STOP_LOSS_LIMIT': {
                const { symbol, stop, limit, quantity } = action;
                return (0, function_1.pipe)(getCurrentPrice(symbol), rxo.filter(fp_ts_1.either.exists((price) => price < stop)), fp_ts_rxjs_1.observableEither.map(() => ({ price: limit, quantity })));
            }
            case 'LIMIT_ORDER': {
                switch (action.side) {
                    case 'BUY': {
                        return (0, function_1.pipe)(getCurrentPrice(action.symbol), rxo.filter(fp_ts_1.either.exists((price) => price < action.price)), fp_ts_rxjs_1.observableEither.map(() => ({
                            price: action.price,
                            quantity: action.quantity,
                        })));
                    }
                    case 'SELL': {
                        return (0, function_1.pipe)(getCurrentPrice(action.symbol), rxo.filter(fp_ts_1.either.exists((price) => price > action.price)), fp_ts_rxjs_1.observableEither.map(() => ({
                            price: action.price,
                            quantity: action.quantity,
                        })));
                    }
                }
            }
        }
    };
    const spot = {
        marketBuy: ({ symbol, budget }) => (0, function_1.pipe)(getCurrentPrice(symbol), rxo.take(1), fp_ts_rxjs_1.observableEither.map((price) => {
            actionEvent.next({
                type: 'MARKET_ORDER',
                symbol,
                side: 'BUY',
                price,
                quantity: budget / price,
            });
            return { averagePrice: price, quantity: budget / price };
        })),
        marketSell: ({ symbol, quantity }) => (0, function_1.pipe)(getCurrentPrice(symbol), rxo.take(1), fp_ts_rxjs_1.observableEither.map((price) => {
            actionEvent.next({
                type: 'MARKET_ORDER',
                symbol,
                side: 'SELL',
                price,
                quantity,
            });
            return { averagePrice: price, quantity };
        })),
        limitBuy: ({ symbol, budget, price }) => {
            const openAction = {
                type: 'LIMIT_ORDER',
                symbol,
                side: 'BUY',
                price,
                equity: budget,
                quantity: budget / price,
            };
            const orderId = Date.now();
            pendingOrderIds = pendingOrderIds.concat(orderId);
            actionEvent.next(openAction);
            return fp_ts_rxjs_1.observableEither.of({
                cancel: () => {
                    actionEvent.next({
                        type: 'CANCELLED_STOP_LIMIT',
                        symbol,
                        price,
                        quantity: budget / price,
                    });
                    pendingOrderIds = pendingOrderIds.filter((id) => id !== orderId);
                    return fp_ts_rxjs_1.observableEither.of(undefined);
                },
                filled$: (0, function_1.pipe)(getLimitFilled(openAction), rxo.filter(fp_ts_1.either.exists(() => pendingOrderIds.includes(orderId))), fp_ts_rxjs_1.observableEither.map((filled) => {
                    actionEvent.next(Object.assign({ type: 'FILLED_LIMIT', side: 'BUY' }, filled));
                    pendingOrderIds = pendingOrderIds.filter((id) => id !== orderId);
                    return filled;
                }), rxo.shareReplay(1)),
            });
        },
        limitSell: ({ symbol, quantity, price }) => {
            const openAction = {
                type: 'LIMIT_ORDER',
                symbol,
                side: 'SELL',
                price,
                quantity,
                equity: quantity * price,
            };
            const orderId = Date.now();
            pendingOrderIds = pendingOrderIds.concat(orderId);
            actionEvent.next(openAction);
            return fp_ts_rxjs_1.observableEither.of({
                cancel: () => {
                    actionEvent.next({
                        type: 'CANCELLED_STOP_LIMIT',
                        symbol,
                        price,
                        quantity,
                    });
                    pendingOrderIds = pendingOrderIds.filter((id) => id !== orderId);
                    return fp_ts_rxjs_1.observableEither.of(undefined);
                },
                filled$: (0, function_1.pipe)(getLimitFilled(openAction), rxo.filter(fp_ts_1.either.exists(() => pendingOrderIds.includes(orderId))), fp_ts_rxjs_1.observableEither.map((filled) => {
                    actionEvent.next(Object.assign({ type: 'FILLED_LIMIT', side: 'SELL' }, filled));
                    pendingOrderIds = pendingOrderIds.filter((id) => id !== orderId);
                    return filled;
                }), rxo.shareReplay(1)),
            });
        },
        stopLossLimit: ({ symbol, stop, limit, quantity }) => {
            const openAction = {
                type: 'STOP_LOSS_LIMIT',
                symbol,
                stop,
                limit,
                quantity,
            };
            const orderId = Date.now();
            pendingOrderIds = pendingOrderIds.concat(orderId);
            actionEvent.next(openAction);
            return fp_ts_rxjs_1.observableEither.of({
                cancel: () => {
                    actionEvent.next({
                        type: 'CANCELLED_STOP_LOSS_LIMIT',
                        symbol,
                        stop,
                        limit,
                        quantity,
                    });
                    pendingOrderIds = pendingOrderIds.filter((id) => id !== orderId);
                    return fp_ts_rxjs_1.observableEither.of(undefined);
                },
                filled$: (0, function_1.pipe)(getLimitFilled(openAction), rxo.filter(fp_ts_1.either.exists(() => pendingOrderIds.includes(orderId))), fp_ts_rxjs_1.observableEither.map((filled) => {
                    actionEvent.next(Object.assign({ type: 'FILLED_STOP_LOSS_LIMIT' }, filled));
                    pendingOrderIds = pendingOrderIds.filter((id) => id !== orderId);
                    return filled;
                }), rxo.shareReplay(1)),
            });
        },
    };
    return { action$: actionEvent.asObservable(), spot };
};
exports.makeMockSpot = makeMockSpot;
