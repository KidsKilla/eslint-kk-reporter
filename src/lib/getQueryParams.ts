export const getQueryParams = (search = window.location.search) => {
  const qs = search
    .replace('?', '')
    .split('&')
    .map((item) => item.split('=').map(decodeURIComponent))
  const qsMap: Record<string, string> = {}
  qs.forEach(([name, val]) => {
    qsMap[name] = val
  })
  return qsMap
}
