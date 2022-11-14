import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from 'dummy/tests/helpers';

module('Integration | Helper | not', function (hooks) {
  setupRenderingTest(hooks);

  test('Failure if 2 or more arg passed in', async function (assert) {
    assert.expect(1);
    setupOnerror(function (err) {
      assert.ok(err);
    });
    this.set('first', '1234');
    this.set('second', '1234');
    await render(hbs`{{not this.first this.second}}`);
    resetOnerror();
  });

  test('True condition works', async function (assert) {
    this.set('first', []);

    await render(hbs`{{not this.first}}`);
    assert.dom(this.element).hasText('true');
  });

  test('False condition works', async function (assert) {
    this.set('first', 'string');

    await render(hbs`{{not this.first}}`);
    assert.dom(this.element).hasText('false');
  });
});
