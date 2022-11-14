export type Falsy = false | 0 | '' | null | undefined | [];
export type Truthy<T> = T extends Falsy ? never : T;
export type TruthArray<T extends unknown[]> = [...Truthy<T>];
export type FirstFalsy<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Head extends Falsy
    ? Head
    : FirstFalsy<Tail>
  : never;

export type FirstTruthy<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Head extends Falsy
    ? FirstTruthy<Tail>
    : Head
  : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* eslint-disable @typescript-eslint/no-unused-vars */
export type Last<T extends unknown[]> = T extends [...infer _, infer L] ? L : never;
