import { nonEmptyArray } from 'fp-ts';
import { Candle, IndicatorStreams } from '../types';
export declare const getCandleRSIAcc: (fromCandle: (candle: Candle) => number) => (period: number) => (candles: Candle[]) => import("fp-ts/lib/Option").Option<import("trading-indicators").RSIAcc>;
export declare type RSIParams = {
    fromCandle: (candle: Candle) => number;
    period: number;
};
export declare const makeRSIAccStreams: ({ fromCandle, period }: RSIParams) => (data: import("../data").CandleStreams) => import("../data").AccStreams<import("trading-indicators").RSIAcc>;
export declare const makeRSIStreams: (params: RSIParams) => (data: import("../data").CandleStreams) => IndicatorStreams<nonEmptyArray.NonEmptyArray<number>, number>;
