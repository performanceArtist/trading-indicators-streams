import { ObservableEither } from '.';
import { StopLoss } from '../trade/stopLoss';
export declare type CancelOrder = () => ObservableEither<Error, void>;
export declare type OrderResponse = {
    cancel: CancelOrder;
    filled$: ObservableEither<Error, {
        price: number;
        quantity: number;
    }>;
};
export declare type MarketOrderFill = {
    quantity: number;
    averagePrice: number;
};
export declare type StopLossOrder = {
    quantity: number;
    price: number;
} & StopLoss & OrderResponse;
