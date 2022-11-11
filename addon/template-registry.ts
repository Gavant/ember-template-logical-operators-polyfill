import type AndHelper from 'ember-template-logical-operators-polyfill/helpers/and';
import NotHelper from 'ember-template-logical-operators-polyfill/helpers/not';

export default interface EmberTemplateLogicalOperatorsPolyfillRegistry {
  and: typeof AndHelper;
  not: typeof NotHelper;
}
