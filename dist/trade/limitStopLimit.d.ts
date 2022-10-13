import { ObservableEither, Spot, StopLossOrder } from '../types';
import { CurrencyPair } from '../data/currencyPair';
import { IsolatedMargin } from '../types/margin';
export declare type LimitStopLimitParams = {
    symbol: CurrencyPair;
    price: number;
    getBudget: (balance: number) => number;
    getStop: (price: number) => {
        stop: number;
        limit: number;
    };
};
export declare type SpotLimitStopLimit = (params: LimitStopLimitParams) => ObservableEither<Error, StopLossOrder>;
export declare const makeSpotLimitStopLimit: import("@performance-artist/fp-ts-adt").Container<{
    spot: Spot;
    getBalance: (asset: string) => ObservableEither<Error, number>;
}, SpotLimitStopLimit>;
export declare type MarginLimitStopLimitParams = {
    symbol: CurrencyPair;
    price: number;
    multiplier: number;
    getBudget: (balance: number) => number;
    getStop: (price: number) => {
        stop: number;
        limit: number;
    };
};
export declare type MarginLimitStopLimit = (params: MarginLimitStopLimitParams) => ObservableEither<Error, StopLossOrder>;
export declare const makeMarginLimitStopLimit: import("@performance-artist/fp-ts-adt").Container<{
    margin: IsolatedMargin;
    getBalance: (asset: string) => ObservableEither<Error, number>;
}, MarginLimitStopLimit>;
