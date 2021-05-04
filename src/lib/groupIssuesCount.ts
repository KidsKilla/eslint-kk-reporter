import { ReportIssue } from '../app-logic/feature/issue'

export const groupIssuesCount = (issuesList: ReportIssue[]) => {
  return {
    issueTotalCount: issuesList.length,
    errorCount: issuesList.filter((is) => is.fatal).length,
    warnCount: issuesList.filter((is) => !is.fatal).length,
  }
}
