import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateReportURL, updateReport } from '../feature/report'
import { getQueryParams } from '../../lib/getQueryParams'

export const useReport = () => {
  const report = useSelector((store) => store.report.report)
  const reportURL = useSelector((store) => store.report.url)
  const dispatch = useDispatch()
  return {
    report,
    reportURL,
    fetchReport: useMemo(
      () => async (url: string) => {
        console.log('fetchReport', url)
        dispatch(updateReportURL(getQueryParams().report))
        const resp = await axios.get(url)
        console.log('fetchReport.data', resp.data)
        dispatch(updateReport(resp.data))
      },
      [dispatch],
    ),
  }
}
