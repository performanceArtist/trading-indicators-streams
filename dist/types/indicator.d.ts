import { ObservableEither } from '.';
export declare type IndicatorStreams<A, LastOfA> = {
    closed$: ObservableEither<Error, A>;
    currentClosed$: ObservableEither<Error, LastOfA>;
    current$: ObservableEither<Error, LastOfA>;
};
