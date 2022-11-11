export type Falsy = false | 0 | '' | null | undefined | [];
export type Truthy<T> = T extends Falsy ? never : T;
export type TruthArray<T extends unknown[]> = [...Truthy<T>];
