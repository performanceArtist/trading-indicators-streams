import { Candle } from '../types';
import { either } from 'fp-ts';
import * as rx from 'rxjs';
import { Either } from 'fp-ts/lib/Either';
import { CandleStreams } from './candles';
export declare type AccStreams<A> = {
    closed$: rx.Observable<Either<Error, A>>;
    current$: rx.Observable<Either<Error, A>>;
};
export declare const makeAccStreams: <A>(init: (candles: Candle[]) => either.Either<Error, A>, next: (acc: A, cur: Candle) => either.Either<Error, A>) => (data: CandleStreams) => AccStreams<A>;
