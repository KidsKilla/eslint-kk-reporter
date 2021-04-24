import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateReportURL, updateReport } from '../feature/report'
import { getQueryParams } from '../../lib/getQueryParams'
import { rootSelect } from '../reducerMap'

export const useReport = () => {
  const dispatch = useDispatch()
  const fetchReport = useMemo(
    () => async (url: string) => {
      console.log('fetchReport', url)
      dispatch(updateReportURL(getQueryParams().report))
      const resp = await axios.get(url)
      console.log('fetchReport.data', resp.data)
      dispatch(updateReport(resp.data))
    },
    [dispatch],
  )
  const reportState = useSelector(rootSelect.report)
  return {
    report: reportState.report,
    reportURL: reportState.url,
    fetchReport,
  }
}
