import Helper from '@ember/component/helper';

import { firstFalsy, isFalsy } from 'ember-template-logical-operators-polyfill/utils/shared';

import { FirstTruthy, Last } from '../-private/shared';

type OrOperatorHelperReturn<T extends unknown[]> = FirstTruthy<T> extends never
  ? Last<T>
  : FirstTruthy<T>;

interface OrHelperSignature<T extends unknown[]> {
  Args: { Positional: [...T] };
  Return: OrOperatorHelperReturn<T>;
}

export default class OrHelper<T extends unknown[]> extends Helper<
  OrHelperSignature<T>
> {
  public compute(positional: [...T]): OrOperatorHelperReturn<T> {
    if (positional.length < 2) {
      throw new Error('The `or` helper requires at least two arguments');
    }
    const isAllFalsy = this.allArgsFalsy(positional);
    if (isAllFalsy) {
      const last = positional[positional.length - 1] as Last<T>;
      return last;
    } else {
      const index = positional.findIndex(firstFalsy);
      const test = positional[index] as FirstTruthy<T>;
      return test;
    }
  }

  private allArgsFalsy<T extends unknown[]>(args: [...T]): boolean {
    return args.every(isFalsy);
  }
}
