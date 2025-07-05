export const omitUndefined = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
    const entries = Object.entries(obj);
    const filtered = entries.filter(([key, value]) => value !== undefined);
    const res = Object.fromEntries(filtered) as Partial<T>
    return res
};

