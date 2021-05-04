import React from 'react'
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  Box,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import { useIssues } from '../app-logic/hook/useIssues'
import { emitEvent } from '../app-logic/hook/events'
import { RuleTableHead, RuleTableRow } from './RuleTableRow'
import { Island } from './Island'

export const ContentWithReport: React.VFC = () => {
  const { rulesViolatedMap } = useIssues()
  return (
    <Box p={3} pb={10}>
      <Grid container spacing={3}>
        <Island>
          <ButtonGroup size="small">
            <Button onClick={() => emitEvent('ALL Expand', true)}>
              Expand all
            </Button>
            <Button onClick={() => emitEvent('ALL Collapse', false)}>
              Collapse all
            </Button>
          </ButtonGroup>
        </Island>
        <Island title="By rules:">
          <TableContainer component={Paper}>
            <Table size="small">
              <RuleTableHead />
              <TableBody>
                {Object.keys(rulesViolatedMap).map((ruleId) => (
                  <RuleTableRow
                    key={ruleId}
                    ruleName={ruleId}
                    rule={rulesViolatedMap[ruleId]}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Island>
      </Grid>
    </Box>
  )
}
