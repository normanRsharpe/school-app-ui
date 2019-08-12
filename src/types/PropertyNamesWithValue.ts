/**
 * Type that gets the properties from object T with values of type P and returns the names of
 * those properties.
 * @type T the base type
 * @type P the type to match T[x] to
 */
export type PropertyNamesWithValue<T, P> = {
  [K in keyof T]: T[K] extends P ? K : never;
}[keyof T];
