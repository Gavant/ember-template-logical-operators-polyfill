import type AndHelper from 'ember-template-logical-operators-polyfill/helpers/and';
import NotHelper from 'ember-template-logical-operators-polyfill/helpers/not';
import OrHelper from 'ember-template-logical-operators-polyfill/helpers/or';

export default interface EmberTemplateLogicalOperatorsPolyfillRegistry {
  and: typeof AndHelper;
  not: typeof NotHelper;
  or: typeof OrHelper;
}
