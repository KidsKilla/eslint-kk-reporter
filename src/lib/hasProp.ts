export const hasProp = <K extends string>(
  propName: K,
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object,
): data is Record<K, unknown> => propName in data
