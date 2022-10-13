import { array, either, nonEmptyArray, option } from 'fp-ts';
import { flow, pipe } from 'fp-ts/lib/function';
import {
  initTrendAcc,
  nextExponentialMA,
  nextTrendAcc,
} from 'trading-indicators';
import { getExponentialMA } from 'trading-indicators';
import { Candle } from '../types';
import {
  CandleStreamsParams,
  makeAccStreams,
  makeCandleStreams,
} from '../data';
import {
  makeSplitCandleStreams,
  SplitCandleStreamsParams,
} from '../simulation/data';
import { container } from '@performance-artist/fp-ts-adt';

export type EMATrendParams = {
  emaPeriod: number;
  fromCandle: (candle: Candle) => number;
};

export const makeEMATrendAcc = ({ emaPeriod, fromCandle }: EMATrendParams) =>
  makeAccStreams(
    flow(
      array.map(fromCandle),
      getExponentialMA(emaPeriod),
      option.chain((maAcc) =>
        pipe(
          initTrendAcc(maAcc),
          option.map((trendAcc) => ({ trendAcc, maAcc }))
        )
      ),
      either.fromOption(() => new Error('Failed to build a trend'))
    ),
    (acc, cur) => {
      const nextMA = nextExponentialMA(emaPeriod)(acc.maAcc, fromCandle(cur));
      const nextTrend = nextTrendAcc(acc.trendAcc, nonEmptyArray.last(nextMA));

      return either.right({
        maAcc: nextMA,
        trendAcc: nextTrend,
      });
    }
  );

export type CurrentEMATrendParams = EMATrendParams & CandleStreamsParams;

export const getCurrentEMATrend = pipe(
  makeCandleStreams,
  container.map(
    (makeCandleStreams) => (params: CurrentEMATrendParams) =>
      pipe(makeCandleStreams(params), makeEMATrendAcc(params))
  )
);

export type SplitEMATrendParams = EMATrendParams & SplitCandleStreamsParams;

export const getSplitEMATrend = pipe(
  makeSplitCandleStreams,
  container.map(
    (makeSplitCandleStreams) => (params: SplitEMATrendParams) =>
      pipe(makeSplitCandleStreams(params), makeEMATrendAcc(params))
  )
);
