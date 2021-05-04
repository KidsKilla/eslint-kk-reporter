import React from 'react'
import { Box } from '@material-ui/core'
import { ReportIssue } from '../app-logic/feature/issue'
import { groupIssuesCount } from '../lib/groupIssuesCount'
import { SmallText, GrayText } from './util'
import { CountPill } from './Pill'
import { IssueCollapse } from './IssueCollapse'

export const FileCollapse: React.VFC<{
  filePath: string
  fileSource: string
  sharedPath: string
  issues: ReportIssue[]
}> = ({ filePath, fileSource, sharedPath, issues }) => {
  const { warnCount, errorCount } = groupIssuesCount(issues)
  return (
    <Box pt={3}>
      <Box>
        <SmallText>
          <CountPill type="error" number={errorCount} />
          <CountPill type="warn" number={warnCount} />
          <GrayText>...</GrayText>
          {filePath.replace([sharedPath, '/'].join(''), '')}{' '}
        </SmallText>
      </Box>
      <Box>
        {issues.map((issue) => (
          <IssueCollapse
            key={issue.issueId}
            issue={issue}
            fileSource={fileSource}
          />
        ))}
      </Box>
    </Box>
  )
}
