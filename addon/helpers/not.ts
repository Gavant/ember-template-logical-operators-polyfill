import Helper from '@ember/component/helper';

import { isTruthy } from 'ember-template-logical-operators-polyfill/utils/shared';

interface NotHelperSignature<T> {
  Args: { Positional: [T] };
  Return: boolean;
}

export default class NotHelper<T> extends Helper<NotHelperSignature<T>> {
  public compute(positional: [T]): boolean {
    if (positional.length > 1) {
      throw new Error('The `not` helper requires only 1 argument');
    }

    return isTruthy(positional[0]);
  }
}
