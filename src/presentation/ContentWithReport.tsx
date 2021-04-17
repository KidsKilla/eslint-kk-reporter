import React from 'react'
import { ESLintReport } from '../app-logic/eslintReport'
import { useIssue } from '../app-logic/hook/useIssue'
import { useFile } from '../app-logic/hook/useFile'
import { FileTable } from './FileTable'
import { IssueTable } from './IssueTable'
import { RuleTable } from './RuleTable'
import { Typography } from '@material-ui/core'

export const ContentWithReport: React.VFC<{
  report: ESLintReport
}> = ({ report }) => {
  const { files } = useFile()
  const { issues } = useIssue()
  if (!issues.length) {
    return <p>No issues 💪</p>
  }

  const issueFiles = files.filter(
    (file) => file.errorCount > 0 || file.warningCount > 0,
  )
  // console.log(report)
  const rules = Object.keys(report.metadata.rulesMeta)
  return (
    <>
      <p>All files: {files.length}</p>
      <p>Files with problems: {issueFiles.length}</p>
      <p>All rules: {rules.length}</p>

      <Typography variant="h4">Issues:</Typography>
      <IssueTable issues={issues} />

      <Typography variant="h4">Rules:</Typography>
      <RuleTable ruleMap={report.metadata.rulesMeta} />

      <Typography variant="h4">Files:</Typography>
      <FileTable files={files} />
    </>
  )
}
