import Helper from '@ember/component/helper';

import { firstFalsy, isTruthy } from 'ember-template-logical-operators-polyfill/utils/shared';

interface AndHelperSignature<T extends unknown[]> {
  Args: { Positional: [...T] };
  Return: T[number];
}

/**
 * Takes at least two positional arguments. Raises an error if invoked with less than two arguments.
 * It evaluates arguments left to right, returning the first one that is not truthy (by handlebar's definition of truthiness) or the right-most arguments if all evaluate to truthy.
 * This is NOT equivalent to the {{and}} helper from ember-truth-helpers because unlike this proposed helper, the one in ember-truth-helpers uses Javascript's definition of truthiness.
 *
 * @export
 * @class AndHelper
 * @extends {Helper<AndHelperSignature<T>>}
 * @template T
 */
export default class AndHelper<T extends unknown[]> extends Helper<
  AndHelperSignature<T>
> {
  public compute(positional: [...T]): T[number] {
    if (positional.length < 2) {
      throw new Error('The `and` helper requires at least two arguments');
    }

    const isAllTruthy = this.allArgsTruthy(positional);
    if (isAllTruthy) {
      return positional[positional.length - 1];
    } else {
      const first: T[number] = firstFalsy(positional);
      return first;
    }
  }

  private allArgsTruthy<T extends unknown[]>(args: [...T]): boolean {
    return args.every(isTruthy);
  }
}
