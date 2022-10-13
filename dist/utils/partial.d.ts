export declare const partial: <E, A>(f: (e: E) => A) => <D extends Partial<E>>(defaults: D) => (e: Omit<E, keyof D>) => A;
export declare const partialf: <D>(defaults: D) => <E extends D, A>(f: (e: E) => A) => (e: Omit<E, keyof D>) => A;
