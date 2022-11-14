import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | not', function (hooks) {
  setupRenderingTest(hooks);

  test('Failure if 2 or more arg passed in', async function (assert) {
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
