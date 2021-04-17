import React from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { useReport } from '../../app-logic/hook/useReport'

export const AppHeader: React.VFC = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Box flexGrow={1}>
        <Title />
      </Box>
      <Box alignSelf="flex-end">
        <IconButton edge="end" color="inherit">
          <MoreVert />
        </IconButton>
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
