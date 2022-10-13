export declare type CurrencyPair = {
    base: string;
    quote: string;
};
export declare type CurrencyType = keyof CurrencyPair;
export declare const pairToString: ({ base, quote }: CurrencyPair) => string;
