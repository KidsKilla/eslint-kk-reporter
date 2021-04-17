import { getQueryParams } from '../lib/getQueryParams'

export const fetchReportURL = async () => {
  const qsMap = getQueryParams()
  return qsMap.report
}
