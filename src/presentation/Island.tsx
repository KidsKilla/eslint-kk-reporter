import React from 'react'
import { Grid, GridProps, Typography } from '@material-ui/core'

export const Island: React.FC<{
  title?: string
  marginTop?: GridProps['marginTop']
  marginBottom?: GridProps['marginBottom']
  padding?: GridProps['padding']
}> = (props) => (
  <Grid item xs={12} marginTop={props.marginTop || 0} padding={3} pt={0}>
    {props.title && (
      <Typography variant="h4" mb={1}>
        {props.title}
      </Typography>
    )}
    {props.children}
  </Grid>
)
