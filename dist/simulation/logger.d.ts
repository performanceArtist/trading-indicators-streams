import { Observable } from 'rxjs';
export declare const logObservable: (filepath: string) => (o: Observable<any>) => void;
export declare const logObservableToArray: (filepath: string) => (o: Observable<any>) => void;
