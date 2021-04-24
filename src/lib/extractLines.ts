export const extractLines = (
  source: string,
  {
    startLine,
    endLine = startLine,
    offset = 0,
  }: {
    startLine: number
    endLine?: number
    offset: number
  },
) =>
  source
    .split('\n')
    .filter(
      (_line, index) =>
        index >= startLine - offset && index <= endLine + offset,
    )
