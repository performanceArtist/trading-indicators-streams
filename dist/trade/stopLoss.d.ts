export declare const fromLossPercent: (lossPercent: number, stopOffsetPercent: number) => (price: number) => StopLoss;
export declare const fromLimit: (stopOffsetPercent: number) => (limit: number) => StopLoss;
export declare type StopLoss = {
    stop: number;
    limit: number;
};
