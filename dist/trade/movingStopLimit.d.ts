import { Either } from 'fp-ts/lib/Either';
import { BehaviorSubject } from 'rxjs';
import { CurrencyPair } from '../data/currencyPair';
import { Candle, Interval, ObservableEither, Spot, StopLossOrder } from '../types';
import { StopLoss } from './stopLoss';
import { observableEither } from 'fp-ts-rxjs';
import { GetClosedCurrentCandle } from './market';
export declare type MovingStopParams = {
    order: StopLossOrder;
    symbol: CurrencyPair;
    interval: Interval;
    count: number;
    getStop: (candles: Candle[], prevStop: StopLoss, order: StopLossOrder) => Either<Error, StopLoss>;
};
export declare type MovingStopLossFromCandles = (params: MovingStopParams) => {
    stopLoss$: ObservableEither<Error, void>;
    current: BehaviorSubject<StopLossOrder>;
    close: () => ObservableEither<Error, void>;
};
export declare const movingStopLossFromCandles: import("@performance-artist/fp-ts-adt").Container<{
    getClosedCurrentCandle: GetClosedCurrentCandle;
    spot: Spot;
}, MovingStopLossFromCandles>;
export declare type ThresholdStopLoss = (params: MovingStopParams & {
    maxLimit: (base: number) => number;
}) => {
    stopLoss$: ObservableEither<Error, void>;
    current: BehaviorSubject<StopLossOrder>;
    close: () => ObservableEither<Error, void>;
};
export declare const thresholdStopLoss: import("@performance-artist/fp-ts-adt").Container<{
    getClosedCurrentCandle: GetClosedCurrentCandle;
    spot: Spot;
}, ThresholdStopLoss>;
export declare const getHighLowStop: ({ getLimit, fromCandle, stopOffsetPercent, }: {
    getLimit: (current: Candle, highLow: {
        high: number;
        low: number;
    }) => number;
    fromCandle: (candle: Candle) => number;
    stopOffsetPercent: number;
}) => MovingStopParams['getStop'];
export declare const getHighLow: (fromCandle: (candle: Candle) => number) => (candles: Candle[]) => {
    high: number;
    low: number;
};
export declare const makeMovingStopLoss: (deps: {
    spot: Spot;
    getRestop: (current: BehaviorSubject<StopLossOrder>) => ObservableEither<Error, StopLoss>;
}) => ({ order, symbol }: {
    order: StopLossOrder;
    symbol: CurrencyPair;
}) => {
    stopLoss$: observableEither.ObservableEither<Error, void>;
    current: BehaviorSubject<StopLossOrder>;
    close: () => ObservableEither<Error, void>;
};
