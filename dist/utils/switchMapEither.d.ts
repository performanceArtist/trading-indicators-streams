import { either } from 'fp-ts';
import { Either } from 'fp-ts/lib/Either';
import { Observable } from 'rxjs';
export declare const switchMapEither: <E, A, B>(f: (a: A) => Observable<either.Either<E, B>>) => (o: Observable<either.Either<E, A>>) => Observable<either.Either<E, B>>;
