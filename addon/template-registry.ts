import type AndHelper from 'ember-template-logical-operators-polyfill/helpers/and';
import type NotHelper from 'ember-template-logical-operators-polyfill/helpers/not';
import type OrHelper from 'ember-template-logical-operators-polyfill/helpers/or';

export default interface EmberTemplateLogicalOperatorsPolyfillRegistry {
  and: typeof AndHelper;
  not: typeof NotHelper;
  or: typeof OrHelper;
}
