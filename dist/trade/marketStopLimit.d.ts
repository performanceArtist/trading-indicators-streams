import { ObservableEither, Spot, StopLossOrder } from '../types';
import { CurrencyPair } from '../data/currencyPair';
export declare type MarketStopLimitParams = {
    symbol: CurrencyPair;
    getBudget: (balance: number) => number;
    getStop: (price: number) => {
        stop: number;
        limit: number;
    };
};
export declare type SpotMarketStopLimit = (params: MarketStopLimitParams) => ObservableEither<Error, StopLossOrder>;
export declare const spotMarketStopLimit: import("@performance-artist/fp-ts-adt").Container<{
    spot: Spot;
    getBalance: (asset: string) => ObservableEither<Error, number>;
}, SpotMarketStopLimit>;
