import '@glint/environment-ember-loose';

import TestComponent from 'dummy/tests/dummy/app/components/test';

import type ResponsiveImageRegistry from 'ember-template-logical-operators-polyfill/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends ResponsiveImageRegistry {
    Test: typeof TestComponent;
  }
}
