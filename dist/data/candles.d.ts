import { Candle, Interval, MarketAPI } from '../types';
import * as rx from 'rxjs';
import { Either } from 'fp-ts/lib/Either';
import { CurrencyPair } from './currencyPair';
export declare type CandleStreams = {
    historical$: rx.Observable<Either<Error, Candle[]>>;
    current$: rx.Observable<Either<Error, Candle>>;
    currentClosed$: rx.Observable<Either<Error, Candle>>;
};
export declare type CandleStreamsParams = {
    symbol: CurrencyPair;
    interval: Interval;
    lookbehind: number;
};
export declare const makeCandleStreams: import("@performance-artist/fp-ts-adt").Container<{
    market: MarketAPI;
}, ({ symbol, interval, lookbehind }: CandleStreamsParams) => {
    historical$: import("../types").ObservableEither<Error, Candle[]>;
    current$: import("../types").ObservableEither<Error, import("../types").CurrentCandle>;
    currentClosed$: import("../types").ObservableEither<Error, Candle>;
}>;
