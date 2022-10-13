import { MarketStopLimitParams } from '../trade/marketStopLimit';
import { CurrencyPair } from '../data/currencyPair';
import { Candle, Interval, MarketAPI } from '../types';
import { observableEither } from 'fp-ts-rxjs';
export declare const makeCandleBuyTrigger: import("@performance-artist/fp-ts-adt").Container<{
    market: MarketAPI;
    spot: import("../types").Spot;
    getBalance: (asset: string) => import("../types").ObservableEither<Error, number>;
}, ({ baseSymbol, baseInterval, trigger, orders, }: {
    baseSymbol: CurrencyPair;
    baseInterval: Interval;
    trigger: (candle: Candle) => boolean;
    orders: MarketStopLimitParams[];
}) => observableEither.ObservableEither<Error, import("../types").StopLossOrder[]>>;
