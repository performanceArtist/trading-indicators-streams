import { nonEmptyArray } from 'fp-ts';
import { Candle } from '../types';
import { CandleStreamsParams } from '../data';
import { SplitCandleStreamsParams } from '../simulation/data';
export declare type EMATrendParams = {
    emaPeriod: number;
    fromCandle: (candle: Candle) => number;
};
export declare const makeEMATrendAcc: ({ emaPeriod, fromCandle }: EMATrendParams) => (data: import("../data").CandleStreams) => import("../data").AccStreams<{
    trendAcc: import("trading-indicators").IntervalAcc<number, nonEmptyArray.NonEmptyArray<import("trading-indicators").Curve>>;
    maAcc: nonEmptyArray.NonEmptyArray<number>;
}>;
export declare type CurrentEMATrendParams = EMATrendParams & CandleStreamsParams;
export declare const getCurrentEMATrend: import("@performance-artist/fp-ts-adt").Container<{
    market: import("../types").MarketAPI;
}, (params: CurrentEMATrendParams) => import("../data").AccStreams<{
    trendAcc: import("trading-indicators").IntervalAcc<number, nonEmptyArray.NonEmptyArray<import("trading-indicators").Curve>>;
    maAcc: nonEmptyArray.NonEmptyArray<number>;
}>>;
export declare type SplitEMATrendParams = EMATrendParams & SplitCandleStreamsParams;
export declare const getSplitEMATrend: import("@performance-artist/fp-ts-adt").Container<{
    market: import("../types").MarketAPI;
}, (params: SplitEMATrendParams) => import("../data").AccStreams<{
    trendAcc: import("trading-indicators").IntervalAcc<number, nonEmptyArray.NonEmptyArray<import("trading-indicators").Curve>>;
    maAcc: nonEmptyArray.NonEmptyArray<number>;
}>>;
