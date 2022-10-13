import { Either } from 'fp-ts/lib/Either';
import * as rx from 'rxjs';
export declare type Candle = {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    timestamp: number;
};
export declare type CurrentCandle = Candle & {
    isClosed: boolean;
};
export declare type ObservableEither<E, A> = rx.Observable<Either<E, A>>;
export declare type Side = 'BUY' | 'SELL';
export declare type Interval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';
