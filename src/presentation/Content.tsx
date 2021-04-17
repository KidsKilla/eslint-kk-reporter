import React, { useEffect } from 'react'
import { getQueryParams } from '../lib/getQueryParams'
import { useReport } from '../app-logic/hook/useReport'
import { ContentWithReport } from './ContentWithReport'

export const Content: React.VFC = () => {
  const { report, reportURL, fetchReport } = useReport()
  useEffect(() => {
    if (!reportURL) {
      fetchReport(getQueryParams().report)
    }
  }, [reportURL, fetchReport])

  if (!report) {
    return <p>Loading...</p>
  }

  const firstResult = report.results[0]
  if (!firstResult) {
    return <p>No issues 💪</p>
  }

  return <ContentWithReport report={report} />
}
