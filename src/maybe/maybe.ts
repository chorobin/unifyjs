import { Just } from './just';
import { nothing, Nothing } from './nothing';

export type Maybe<T> = Just<T> | Nothing;

export const isMaybe = <T>(couldBeMaybe: {}) => (couldBeMaybe as Maybe<T>).isNothing !== undefined;

export const isNothing = <T>(maybe: Maybe<T>) => maybe === nothing;

export const maybe = <T>(get: T) => get ? ({ get: get, isNothing: false } as Just<T>) : nothing;

export const fold = <T, U>(ifJust: (get: T) => U, ifNothing: U) => (maybe: Maybe<T>) => 
    isNothing(maybe) ? ifNothing : ifJust((maybe as Just<T>).get);

export const map = <T, U>(f: (get: T) => U) => fold((get: T) => maybe(f(get)), nothing);

export const flatMap = <T, U>(f: (get: T) => Maybe<U>) => fold(f, nothing);