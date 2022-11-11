import { Falsy } from 'ember-template-logical-operators-polyfill/-private/shared';

export const isTruthy = <T>(x: T | Falsy) =>
  x !== false &&
  x !== 0 &&
  x !== '' &&
  x !== null &&
  x !== undefined &&
  Array.isArray(x) &&
  x.length > 0;

export const firstFalsy = <T extends unknown[]>(...args: T) =>
  args.find((x) => !isTruthy(x));

export const isFalsy = <T>(x: T | Falsy) => !isTruthy(x);
