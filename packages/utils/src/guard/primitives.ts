export type Guard<T> = (value: unknown) => value is T;

/**
 * Create a guard verifying the given value matches the specified type
 */
export function is<T>(
  type:
    | 'bigint'
    | 'boolean'
    | 'function'
    | 'number'
    | 'object'
    | 'string'
    | 'symbol'
    | 'undefined'
): Guard<T> {
  return (value: unknown): value is T => typeof value === type;
}

/**
 * Guard verifying the value is a string
 */
export const isString = is<string>('string');

/**
 * Guard verifying the value is a function
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = is<Function>('function');
