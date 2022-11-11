import Helper from '@ember/component/helper';

import { firstFalsy, isTruthy } from 'ember-template-logical-operators-polyfill/utils/shared';

import { FirstFalsy, Last } from '../-private/shared';

type AndOperatorHelperReturn<T extends unknown[]> = FirstFalsy<T> extends never
  ? Last<T>
  : FirstFalsy<T>;

interface AndHelperSignature<T extends unknown[]> {
  Args: { Positional: [...T] };
  Return: AndOperatorHelperReturn<T>;
}

export default class AndHelper<T extends unknown[]> extends Helper<
  AndHelperSignature<T>
> {
  public compute(positional: [...T]): AndOperatorHelperReturn<T> {
    if (positional.length < 2) {
      throw new Error('The `and` helper requires at least two arguments');
    }
    const isAllTruthy = this.allArgsTruthy(positional);
    if (isAllTruthy) {
      const last = positional[positional.length - 1] as Last<T>;
      return last;
    } else {
      const index = positional.findIndex(firstFalsy);
      const test = positional[index] as FirstFalsy<T>;
      return test;
    }
  }

  private allArgsTruthy<T extends unknown[]>(args: [...T]): boolean {
    return args.every(isTruthy);
  }
}
