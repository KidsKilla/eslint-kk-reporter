import React from 'react'
import styled from '@emotion/styled'
import {
  CircularProgress,
  Typography,
  Grid,
  Alert,
  Chip,
  AlertTitle,
} from '@material-ui/core'

export const ContentEmpty: React.VFC<{
  variant: 'loading' | 'reportMissing' | 'empty'
}> = ({ variant }) => {
  if (variant === 'loading') {
    return (
      <EmptyContentLayout>
        <Grid item textAlign="center">
          <CircularProgress size={100} />
        </Grid>
      </EmptyContentLayout>
    )
  }

  if (variant === 'reportMissing') {
    return (
      <EmptyContentLayout>
        <Alert severity="error">
          <AlertTitle>Report url is missing.</AlertTitle>
          <Typography variant="caption">
            Open this page with
            <ParamPill variant="outlined" size="small" label="report" />
            parameter
          </Typography>
        </Alert>
      </EmptyContentLayout>
    )
  }

  return (
    <EmptyContentLayout>
      <Alert severity="success">No issues 💪</Alert>
    </EmptyContentLayout>
  )
}

const ParamPill = styled(Chip)({
  marginLeft: '0.5em',
  marginRight: '0.5em',
})

const EmptyContentLayout: React.FC = (props) => (
  <Grid
    container
    spacing={3}
    justifyContent="center"
    alignContent="stretch"
    padding={20}
  >
    <Grid item xs={12}>
      {props.children}
    </Grid>
  </Grid>
)
