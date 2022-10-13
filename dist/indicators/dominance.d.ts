import { Interval } from '../types';
import { observableEither } from 'fp-ts-rxjs';
import { CurrencyPair } from '../data/currencyPair';
export declare const makeGetDominance: import("@performance-artist/fp-ts-adt").Container<{
    market: import("../types").MarketAPI;
}, ({ symbol, baseSymbol, interval, startTime, candleTotal, }: {
    interval: Interval;
    startTime: number;
    symbol: CurrencyPair;
    baseSymbol: CurrencyPair;
    candleTotal: number;
}) => observableEither.ObservableEither<Error, number>>;
export declare const makeGetBTCDominance: import("@performance-artist/fp-ts-adt").Container<{
    market: import("../types").MarketAPI;
}, (e: Omit<{
    interval: Interval;
    startTime: number;
    symbol: CurrencyPair;
    baseSymbol: CurrencyPair;
    candleTotal: number;
}, "baseSymbol">) => observableEither.ObservableEither<Error, number>>;
export declare const makeGetAverageDominance: import("@performance-artist/fp-ts-adt").Container<{
    market: import("../types").MarketAPI;
}, ({ symbol, baseSymbol, interval, repeat, startTime, candleTotal, }: {
    interval: Interval;
    startTime: number;
    candleTotal: number;
    repeat: number;
    symbol: CurrencyPair;
    baseSymbol: CurrencyPair;
}) => observableEither.ObservableEither<Error, number>>;
export declare const makeGetAverageBTCDominance: import("@performance-artist/fp-ts-adt").Container<{
    market: import("../types").MarketAPI;
}, (e: Omit<{
    interval: Interval;
    startTime: number;
    candleTotal: number;
    repeat: number;
    symbol: CurrencyPair;
    baseSymbol: CurrencyPair;
}, "baseSymbol">) => observableEither.ObservableEither<Error, number>>;
