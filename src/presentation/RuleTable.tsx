import React, { useState } from 'react'
import {
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Collapse,
  Chip,
  Alert,
} from '@material-ui/core'
import { getSharedPath } from '../lib/filePath'
import { ReportRule } from '../app-logic/feature/rule'
import { useIssues } from '../app-logic/hook/useIssues'
import { CollapseWithTitle, GrayText, icon, SmallText } from './util'
import { extractLines } from '../lib/extractLines'
import { ReportIssue } from '../app-logic/feature/issue'

export const THead: React.VFC = () => (
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Description</TableCell>
    </TableRow>
  </TableHead>
)

export const TRow: React.VFC<{
  ruleName: string
  rule: ReportRule
}> = ({ ruleName, rule }) => {
  const [isOpen, setOpen] = useState(false)
  const { issuesList, filesWithIssuesMap, issuesQuantity } = useIssues(
    (issue) => issue.ruleId === rule.ruleId,
  )
  const filePaths = Object.keys(filesWithIssuesMap)
  const sharedPath = getSharedPath(filePaths)
  return (
    <>
      <TableRow>
        <TableCell>
          <Box
            flex={1}
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
          >
            <Box mr={2} display="inline-block">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!isOpen)}
              >
                {isOpen ? icon.up : icon.down}
              </IconButton>
            </Box>

            <Box>
              {!rule.docs?.url ? (
                ruleName
              ) : (
                <a href={rule.docs.url}>{ruleName}</a>
              )}
              <br />
              <SmallText>
                {issuesQuantity.issues} issues in {issuesQuantity.files} files.
              </SmallText>
            </Box>
          </Box>
        </TableCell>

        <TableCell align="left" valign="top">
          {rule.docs?.description}
          <br />
          <Box display="flex" flexDirection="row">
            <Box mr={2}>
              <GrayText>
                Fixable? {rule.fixable ? icon.yes : icon.no}
                <br />
                Recommended? {rule.docs?.recommended ? icon.yes : icon.no}
              </GrayText>
            </Box>
            <GrayText>
              Category: {rule.docs?.category}
              <br />
              Type: {rule.type}
            </GrayText>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box pb={5} pt={2}>
              <SmallText>
                Files in <GrayText>{sharedPath}</GrayText>:
              </SmallText>
              {filePaths.map((filePath) => (
                <FileCollapse
                  key={filePath}
                  filePath={filePath}
                  fileSource={filesWithIssuesMap[filePath].source || ''}
                  sharedPath={sharedPath}
                  issues={issuesList.filter((is) => is.filePath === filePath)}
                />
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const FileCollapse: React.VFC<{
  filePath: string
  fileSource: string
  sharedPath: string
  issues: ReportIssue[]
}> = ({ filePath, fileSource, sharedPath, issues }) => {
  return (
    <CollapseWithTitle
      title={
        <SmallText>
          ...{filePath.replace(sharedPath, '')}{' '}
          <GrayText>
            <Chip
              size="small"
              label={<GrayText>{issues.length}</GrayText>}
              variant="outlined"
            />
          </GrayText>
        </SmallText>
      }
    >
      {issues.map((issue) => (
        <CollapseWithTitle
          key={issue.issueId}
          title={
            <Alert
              variant="outlined"
              severity={issue.fatal ? 'error' : 'warning'}
            >
              {issue.message}
            </Alert>
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
        </CollapseWithTitle>
      ))}
    </CollapseWithTitle>
  )
}
