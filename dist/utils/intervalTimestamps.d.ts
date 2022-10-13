import { Int } from 'io-ts';
import { Candle, Interval } from '../types';
export declare const intervalTimestamps: Record<Interval, Int>;
export declare const openCloseHighLowAverage: ({ open, close, high, low }: Candle) => number;
