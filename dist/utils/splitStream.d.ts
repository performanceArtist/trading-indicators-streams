import * as rx from 'rxjs';
export declare const splitStream: (n: number) => <A>(o: rx.Observable<A>) => rx.Observable<A[]>;
