import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | and', function (hooks) {
  setupRenderingTest(hooks);

  test('Failure if 1 arg passed in', async function (assert) {
    setupOnerror(function (err) {
      assert.ok(err);
    });
    this.set('first', '1234');
    await render(hbs`{{and this.first}}`);
    resetOnerror();
  });

  test('First falsy returned', async function (assert) {
    this.set('first', '1234');
    this.set('second', false);
    this.set('third', true);

    await render(hbs`{{and this.first this.second this.third}}`);

    assert.dom(this.element).hasText('false');

    await render(hbs`{{and this.first this.second}}`);

    assert.dom(this.element).hasText('false');
  });

  test('Truthy returned', async function (assert) {
    this.set('first', '1234');
    this.set('second', 1223);
    this.set('third', true);

    await render(hbs`{{and this.first this.second this.third}}`);

    assert.dom(this.element).hasText('true');
  });
});
