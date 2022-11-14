import Helper from '@ember/component/helper';

import { firstTruthy } from 'ember-template-logical-operators-polyfill/utils/shared';

interface OrHelperSignature<T extends unknown[]> {
  Args: { Positional: [...T] };
  Return: T[number];
}

/**
 * Takes at least two positional arguments. Raises an error if invoked with less than two arguments.
 * It evaluates arguments left to right, returning the first one that is truthy (by handlebar's definition of truthiness) or the right-most argument if all evaluate to falsy.
 * This is NOT equivalent to the {{or}} helper from ember-truth-helpers because unlike this proposed helper, the one in ember-truth-helpers uses Javascript's definition of truthiness.
 *
 * @export
 * @class OrHelper
 * @extends {Helper<OrHelperSignature<T>>}
 * @template T
 */
export default class OrHelper<T extends unknown[]> extends Helper<OrHelperSignature<T>> {
  public compute(positional: [...T]): T[number] {
    if (positional.length < 2) {
      throw new Error('The `or` helper requires at least two arguments');
    }

    const firstTruthyValue = firstTruthy(positional);

    if (firstTruthyValue) {
      return firstTruthyValue;
    } else {
      return positional[positional.length - 1];
    }
  }
}
