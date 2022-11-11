import Helper from '@ember/component/helper';

import { Falsy, TruthArray, Truthy } from '../-private/shared';

const isTruthy = <T>(x: T | Falsy): x is T =>
  x !== false &&
  x !== 0 &&
  x !== '' &&
  x !== null &&
  x !== undefined &&
  Array.isArray(x) &&
  x.length > 0;

const firstFalsy = <T extends unknown[]>(x: T[number]) =>
  !isTruthy(x) ? x : undefined;

function isAllTruthy<T extends unknown[]>(
  value: [...T]
): value is [...Truthy<T>] {
  return value.every(isTruthy);
}

type FirstFalsy<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Head extends Falsy
    ? Head
    : FirstFalsy<Tail>
  : never;

type Last<T extends unknown[]> = T extends [...infer _, infer L] ? L : never;

type AndHelperReturn<T extends unknown[]> = T extends [
  ...infer Head,
  infer Tail extends Last<T>
]
  ? [...Head, Tail] extends TruthArray<T>
    ? Tail
    : FirstFalsy<[...Head, Tail]>
  : never;

interface AndHelperSignature<T extends unknown[]> {
  Args: { Positional: [...T] };
  Return: AndHelperReturn<T>;
}

export default class AndHelper<T extends unknown[]> extends Helper<
  AndHelperSignature<T>
> {
  public compute(positional: [...T]): AndHelperReturn<T> {
    if (positional.length < 2) {
      throw new Error('The `and` helper requires at least two arguments');
    }
    const isAllTruth = isAllTruthy(positional);
    if (isAllTruth) {
      const last = positional[positional.length - 1];
      return last as AndHelperReturn<T>;
    } else {
      const index = positional.findIndex(firstFalsy);
      const test = positional[index] as FirstFalsy<T>;
      return test;
    }
  }
}
