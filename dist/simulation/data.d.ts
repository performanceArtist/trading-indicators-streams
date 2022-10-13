import { Option } from 'fp-ts/lib/Option';
import { Interval, Candle, ObservableEither } from '../types';
import { CandleStreams } from '../data';
import { CurrencyPair } from '../data/currencyPair';
export declare type SplitCandleStreamsParams = {
    symbol: CurrencyPair;
    startTime: Option<number>;
    total: number;
    historicalTotal: number;
    interval: Interval;
    intervalDelay: number;
    updatesInInterval: number;
    getCurrentCandle: (open: Candle, close: Candle) => (lastOpen: Candle) => Candle;
};
export declare const defaultGetCurrentCandle: (open: Candle, close: Candle) => (lastOpen: Candle) => {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    timestamp: number;
};
export declare const makeSplitCandleStreams: import("@performance-artist/fp-ts-adt").Container<{
    market: import("../types").MarketAPI;
}, (params: SplitCandleStreamsParams) => CandleStreams>;
export declare type MockCandleStreamsParams = {
    total$: ObservableEither<Error, Candle[]>;
    historicalTotal: number;
    intervalDelay: number;
    updatesInInterval: number;
    getCurrentCandle: (open: Candle, close: Candle) => (lastOpen: Candle) => Candle;
};
export declare const makeMockCandleStreams: (params: MockCandleStreamsParams) => CandleStreams;
