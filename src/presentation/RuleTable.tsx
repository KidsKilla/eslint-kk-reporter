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
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  CheckOutlined,
} from '@material-ui/icons'
import { keyof, keyVal } from '../lib/iter'
import { ESLintReport } from '../app-logic/eslintReport'

type RuleMap = ESLintReport['metadata']['rulesMeta']
type Rule = RuleMap[string]

const COLS: Record<
  'docs' | 'fixable',
  (rule: Rule, ruleName: string) => React.ReactNode
> = {
  fixable: (rule) => <p>{rule.fixable ? <CheckOutlined /> : ''}</p>,
  docs: (rule) =>
    !rule.docs ? null : (
      <p>
        <p>{rule.docs.description}</p>
        <p>{rule.docs.category}</p>
        <p>{rule.docs.recommended}</p>
      </p>
    ),
}

export const RuleTable: React.VFC<{
  ruleMap: RuleMap
}> = ({ ruleMap }) => {
  const firstKey = keyof(ruleMap)[0]
  if (!firstKey) {
    return null
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell>Name</TableCell>
            {keyof(COLS).map((k) => (
              <TableCell key={k}>{k}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {keyVal(ruleMap).map((kv) => (
            <Row key={kv.key} ruleName={kv.key} rule={kv.value} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Row: React.VFC<{
  ruleName: string
  rule: Rule
}> = ({ ruleName, rule }) => {
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
      <TableCell align="left" valign="top" id={ruleName}>
        {!rule.docs?.url ? ruleName : <a href={rule.docs.url}>{ruleName}</a>}
      </TableCell>
      {keyVal(COLS).map((kv) => (
        <TableCell key={kv.key} align="left" valign="top">
          {kv.value(rule, ruleName)}
        </TableCell>
      ))}
    </TableRow>
  )
}
