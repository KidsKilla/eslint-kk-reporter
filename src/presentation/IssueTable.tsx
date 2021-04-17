import React, { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { keyof, keyVal } from '../lib/iter'
import { ESLintIssue } from '../app-logic/feature/issue'
import { SEVERITY } from '../app-logic/eslintReport'

const COLS: Record<
  'ruleId' | 'severity' | 'message' | 'filePath',
  (issue: ESLintIssue) => React.ReactNode
> = {
  ruleId: (issue) => <a href={`#${issue.ruleId}`}>{issue.ruleId}</a>,
  severity: (issue) => <p>{SEVERITY[issue.severity]}</p>,
  message: (issue) => <p>{issue.message}</p>,
  filePath: (issue) => <p>{issue.filePath}</p>,
}

export const IssueTable: React.VFC<{
  issues: ESLintIssue[]
}> = ({ issues }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell> </TableCell>
          {keyof(COLS).map((k) => (
            <TableCell key={k}>{k}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {issues.map((issue) => (
          <Row key={issue.id} issue={issue} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

const Row: React.VFC<{
  issue: ESLintIssue
}> = ({ issue }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <TableRow>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </TableCell>
      {keyVal(COLS).map((cell) => (
        <TableCell key={cell.key} align="left" valign="top">
          {cell.value(issue)}
        </TableCell>
      ))}
    </TableRow>
  )
}
