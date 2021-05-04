import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { useReport } from '../../app-logic/hook/useReport'
import { Summary } from '../Summary'
import { SmallText } from '../util'

export const AppHeader: React.VFC = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Box flexGrow={1}>
        <Title />
      </Box>
      <Box position="absolute" right={20} top={0}>
        <SmallText>
          <Summary />
        </SmallText>
      </Box>
    </Toolbar>
  </AppBar>
)

const Title: React.VFC = () => {
  const { reportURL } = useReport()
  return (
    <Typography variant="h6">
      Eslint reporter: <small>{reportURL}</small>
    </Typography>
  )
}
