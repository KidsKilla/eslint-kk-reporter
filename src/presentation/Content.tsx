import React, { useEffect } from 'react'
import { getQueryParams } from '../lib/getQueryParams'
import { useReport } from '../app-logic/hook/useReport'
import { ContentWithReport } from './ContentWithReport'
import { ContentEmpty } from './ContentEmpty'

export const Content: React.VFC = () => {
  const reportParam = getQueryParams().report
  const { report, reportURL, fetchReport } = useReport()
  useEffect(() => {
    if (reportParam && reportURL !== reportParam) {
      fetchReport(reportParam)
    }
  }, [reportParam, reportURL, fetchReport])

  if (!reportParam) {
    return <ContentEmpty variant="reportMissing" />
  }
  if (!report) {
    return <ContentEmpty variant="loading" />
  }
  if (!report.results?.[0]) {
    return <ContentEmpty variant="empty" />
  }

  return <ContentWithReport />
}
