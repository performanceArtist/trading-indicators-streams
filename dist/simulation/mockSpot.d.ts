import { ObservableEither, Spot, SpotAction } from '../types';
import * as rx from 'rxjs';
import { CurrencyPair } from '../data/currencyPair';
export declare type MockSpotParams = {
    getCurrentPrice: (symbol: CurrencyPair) => ObservableEither<Error, number>;
};
export declare const makeMockSpot: (params: MockSpotParams) => {
    action$: rx.Observable<SpotAction>;
    spot: Spot;
};
