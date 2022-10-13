import { Interval } from '../types/shared';
import { MarketAPI } from '../types/market';
import { ObservableEither, Candle } from '../types';
import { CurrencyPair } from '../data/currencyPair';
export declare type GetXCandles = (params: {
    symbol: CurrencyPair;
    interval: Interval;
    startTime: number;
    total: number;
}) => ObservableEither<Error, Candle[]>;
export declare const getXCandles: import("@performance-artist/fp-ts-adt").Container<{
    market: MarketAPI;
}, GetXCandles>;
export declare type GetXLastCandles = (params: {
    symbol: CurrencyPair;
    interval: Interval;
    total: number;
}) => ObservableEither<Error, Candle[]>;
export declare const getXLastCandles: import("@performance-artist/fp-ts-adt").Container<{
    market: MarketAPI;
}, GetXLastCandles>;
export declare type GetClosedCurrentCandle = (params: {
    symbol: CurrencyPair;
    interval: Interval;
}) => ObservableEither<Error, Candle>;
export declare const getClosedCurrentCandle: import("@performance-artist/fp-ts-adt").Container<{
    market: MarketAPI;
}, GetClosedCurrentCandle>;
