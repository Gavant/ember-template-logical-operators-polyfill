import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from 'dummy/tests/helpers';

module('Integration | Helper | or', function (hooks) {
  setupRenderingTest(hooks);

  test('Failure if 1 arg passed in', async function (assert) {
    assert.expect(1);
    setupOnerror(function (err) {
      assert.ok(err);
    });
    this.set('first', '1234');
    await render(hbs`{{or this.first}}`);
    resetOnerror();
  });
  test('First truth returned', async function (assert) {
    this.set('first', []);
    this.set('second', false);
    this.set('third', '1234');
    this.set('fourth', true);

    await render(hbs`{{or this.first this.second this.third this.fourth}}`);

    assert.dom(this.element).hasText('1234');

    await render(hbs`{{or this.first this.second this.fourth}}`);

    assert.dom(this.element).hasText('true');
  });

  test('Falsy returned', async function (assert) {
    this.set('first', false);
    this.set('second', 0);
    this.set('third', '');
    this.set('fourth', null);
    this.set('fifth', undefined);
    this.set('sixth', []);

    await render(hbs`{{or this.first this.second this.third this.fourth this.fifth this.sixth}}`);

    // Apparently when the value is `[]` it returns an empty string
    assert.dom(this.element).hasText('');
  });
});
