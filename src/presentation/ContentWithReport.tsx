import React from 'react'
import {
  Typography,
  Grid,
  Paper,
  Alert,
  AlertTitle,
  TableContainer,
  Table,
  TableBody,
  Box,
} from '@material-ui/core'
import styled from '@emotion/styled'
import { useTotalCounts } from '../app-logic/hook/useTotalCounts'
import { THead, TRow } from './RuleTable'
import { useIssues } from '../app-logic/hook/useIssues'
import { GrayText } from './util'

export const ContentWithReport: React.VFC = () => {
  const totalQuantity = useTotalCounts()
  const { issuesQuantity, rulesViolatedMap } = useIssues()
  return (
    <Box pb={10}>
      <Grid container spacing={3}>
        <Island>
          <Ppr>
            <Alert variant="outlined" severity="info">
              <AlertTitle>Issues: {issuesQuantity.issues}</AlertTitle>
              <GrayText>
                Files: {issuesQuantity.files} of {totalQuantity.files}
                <br />
                Rules: {issuesQuantity.rules} of {totalQuantity.rules}
              </GrayText>
            </Alert>
          </Ppr>
        </Island>

        <Island title="By rules:">
          <TableContainer component={Paper}>
            <Table>
              <THead />
              <TableBody>
                {Object.keys(rulesViolatedMap).map((ruleId) => (
                  <TRow
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

const Island: React.FC<{
  title?: string
}> = (props) => (
  <Grd item xs={12}>
    {props.title && (
      <Typography variant="h4" style={{ marginBottom: '5px' }}>
        {props.title}
      </Typography>
    )}
    {props.children}
  </Grd>
)
const Ppr = styled(Paper)({
  // padding: '20px',
  marginTop: '20px',
})

const Grd = styled(Grid)({
  marginRight: '20px',
  marginLeft: '20px',
})
