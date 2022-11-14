import { Falsy } from 'ember-template-logical-operators-polyfill/-private/shared';

export const isTruthy = <T>(x: T | Falsy) =>
  Array.isArray(x)
    ? x.length > 0
    : x !== false && x !== 0 && x !== '' && x !== null && x !== undefined;

export const firstFalsy = <T extends unknown[]>(args: T) => {
  return args.find((x) => !isTruthy(x));
};

export const firstTruthy = <T extends unknown[]>(args: T) => {
  return args.find((x) => isTruthy(x));
};

export const isFalsy = <T>(x: T | Falsy) => !isTruthy(x);

// export const isTruthy = (x) =>
//   Array.isArray(x)
//     ? x.length > 0
//     : x !== false && x !== 0 && x !== '' && x !== null && x !== undefined;
