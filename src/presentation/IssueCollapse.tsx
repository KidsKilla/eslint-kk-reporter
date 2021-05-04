import React from 'react'
import { extractLines } from '../lib/extractLines'
import { ReportIssue } from '../app-logic/feature/issue'
import { GrayText } from './util'
import { Expandable } from './Expandable'

export const IssueCollapse: React.VFC<{
  issue: ReportIssue
  fileSource: string
}> = ({ issue, fileSource }) => (
  <Expandable
    title={
      <>
        {issue.message}
        <br />
        <GrayText>
          From line {issue.line} to {issue.endLine}
        </GrayText>
      </>
    }
  >
    <pre>
      <code>
        {extractLines(fileSource, {
          startLine: issue.line,
          endLine: issue.endLine,
          offset: 3,
        }).join('\n')}
      </code>
    </pre>
  </Expandable>
)
