import React, { useState } from 'react'
import {
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Collapse,
} from '@material-ui/core'
import { getSharedPath } from '../lib/filePath'
import { ReportRule } from '../app-logic/feature/rule'
import { useIssues } from '../app-logic/hook/useIssues'
import { GrayText, icon, SmallText } from './util'
import { FileCollapse } from './FileCollapse'
import { useEventListener } from '../app-logic/hook/events'

export const RuleTableHead: React.VFC = () => (
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Description</TableCell>
    </TableRow>
  </TableHead>
)

export const RuleTableRow: React.VFC<{
  ruleName: string
  rule: ReportRule
}> = ({ ruleName, rule }) => {
  const [isOpen, setOpen] = useState(false)
  useEventListener('ALL Collapse', setOpen)
  useEventListener('ALL Expand', setOpen)
  const { issuesList, filesWithIssuesMap, issuesQuantity } = useIssues(
    (issue) => issue.ruleId === rule.ruleId,
  )
  const filePaths = Object.keys(filesWithIssuesMap)
  const sharedPath = getSharedPath(filePaths)
  return (
    <>
      <TableRow>
        <TableCell onClick={() => setOpen(!isOpen)}>
          <Box
            flex={1}
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
          >
            <Box mr={2} display="inline-block">
              <IconButton aria-label="expand row" size="small">
                {isOpen ? icon.up : icon.down}
              </IconButton>
            </Box>

            <Box>
              {ruleName}
              <br />
              <SmallText>
                {issuesQuantity.issueTotalCount} issues in{' '}
                {issuesQuantity.fileCount} files.
              </SmallText>
            </Box>
          </Box>
        </TableCell>

        <TableCell align="left" valign="top">
          {rule.docs?.description}
          {rule.docs?.url && (
            <SmallText>
              <br />
              <a href={rule.docs.url} target="_blank" rel="noreferrer">
                Documentation
              </a>
            </SmallText>
          )}

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
              Type: {rule.type || 'N/A'}
            </GrayText>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={isOpen} timeout={300} unmountOnExit={false}>
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
