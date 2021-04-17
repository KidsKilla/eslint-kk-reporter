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
  Collapse,
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { keyof, keyVal } from '../lib/iter'
import { ESLintReportItem, SEVERITY } from '../app-logic/eslintReport'

type Keys =
  | 'filePath'
  | 'messages'
  | 'errorCount'
  | 'warningCount'
  | 'fixableErrorCount'
  | 'fixableWarningCount'

const KEY_MAP: Record<Keys, (it: ESLintReportItem) => React.ReactNode> = {
  filePath: (item) => <a href={`file://${item.filePath}`}>{item.filePath}</a>,
  messages: (item) => (
    <>
      {item.messages.map((msg) => (
        <>
          <p>{msg.message} like</p>
          <p>
            <small>
              {SEVERITY[msg.severity]}: {msg.ruleId}, fixable? {String(msg.fix)}
            </small>
          </p>
          <p>
            <small>
              {item.filePath}
              {msg.line}:{msg.column}-{msg.endLine}:{msg.endColumn}
            </small>
          </p>
        </>
      ))}
    </>
  ),
  errorCount: (item) => String(item.errorCount),
  warningCount: (item) => String(item.warningCount),
  fixableErrorCount: (item) => String(item.fixableErrorCount),
  fixableWarningCount: (item) => String(item.fixableWarningCount),
}
const colSpan = keyof(KEY_MAP).length

export const FileTable: React.VFC<{
  files: ESLintReportItem[]
}> = ({ files }) => {
  const issueFiles = files.filter(
    (file) => file.errorCount > 0 || file.warningCount > 0,
  )
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            {keyof(KEY_MAP).map((k) => (
              <TableCell key={k}>{k}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {issueFiles.map((issue) => (
            <Row key={issue.filePath} file={issue} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Row: React.VFC<{
  file: ESLintReportItem
}> = ({ file }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
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
        {keyVal(KEY_MAP).map((cell) => (
          <TableCell key={cell.key} align="left" valign="top">
            {cell.value(file)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={colSpan + 1}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <pre>{file.source}</pre>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
