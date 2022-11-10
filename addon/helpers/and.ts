import Helper, { helper } from '@ember/component/helper';

import { Falsy, Maybe, UnsetValue } from '../-private/shared';
import truthConvert from '../utils/truthy';

type AndPair<A, B> = Falsy<A> extends true
  ? A
  : B extends UnsetValue
  ? A
  : A | B;

type AllTrue<T extends unknown[]> = T extends [infer A, ...infer R]
  ? AndPair<A, AllTrue<R>>
  : never;
type FirstFalse<T extends unknown[]> = T extends [infer A, ...infer R]
  ? AndPair<A, FirstFalse<R>>
  : never;

type Last<T extends unknown[]> = T extends [...infer _, infer L] ? L : never;

interface AndHelperSignature<T extends unknown[]> {
  Args: { Positional: [...T]; Named: unknown };
  Return: AllTrue<T> extends never ? FirstFalse<T> : Last<T>;
}

export default class AndHelper<T extends unknown[]> extends Helper<
  AndHelperSignature<T>
> {
  public compute(
    positional: [...T],
    named: unknown
  ): AllTrue<T> extends never ? FirstFalse<T> : Last<T> {
    for (let i = 0, len = positional.length; i < len; i++) {
      if (truthConvert(positional[i]) === false) {
        return positional[i] as FirstFalse<T>;
      }
    }
    return positional[positional.length - 1] as Last<T>;
  }
}
