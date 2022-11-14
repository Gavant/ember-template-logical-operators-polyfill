import Helper from '@ember/component/helper';

import { isTruthy } from 'ember-template-logical-operators-polyfill/utils/shared';

interface NotHelperSignature<T> {
  Args: { Positional: [T] };
  Return: boolean;
}

/**
 * Unary operator. Raises an error if invoked with more than one positional argument.
 * If the given value evaluates to a truthy value (by handlebar's definition of truthiness), the false is returned.
 * If the given value evaluates to a falsy value (by handlebar's definition of truthiness) then it returns true.
 * This is NOT equivalent to the {{not}} helper from ember-truth-helpers because unlike this proposed helper, the one in ember-truth-helpers uses Javascript's definition of truthiness.
 *
 * @export
 * @class NotHelper
 * @extends {Helper<NotHelperSignature<T>>}
 * @template T
 */
export default class NotHelper<T> extends Helper<NotHelperSignature<T>> {
  public compute(positional: [T]): boolean {
    if (positional.length > 1) {
      throw new Error('The `not` helper requires only 1 argument');
    }

    return !isTruthy(positional[0]);
  }
}
