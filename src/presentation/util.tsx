import React, { useState } from 'react'
import { Typography, Paper, Box, Collapse, IconButton } from '@material-ui/core'
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Check,
  Clear,
} from '@material-ui/icons'

export const GrayText: React.FC = (props) => (
  <Typography variant="caption" color="GrayText">
    {props.children}
  </Typography>
)

export const SmallText: React.FC = (props) => (
  <Typography variant="caption">{props.children}</Typography>
)

export const CollapseWithTitle: React.FC<{
  title: React.ReactNode
}> = (props) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <Box mt={2}>
      <Paper>
        <Box
          onClick={() => setOpen(!isOpen)}
          p={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <IconButton
            aria-label="expand"
            size="small"
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? icon.up : icon.down}
          </IconButton>{' '}
          <Box>{props.title}</Box>
        </Box>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box pt={1}>{props.children}</Box>
        </Collapse>
      </Paper>
    </Box>
  )
}

export const icon = {
  yes: <Check style={{ fontSize: 20, verticalAlign: 'middle' }} />,
  no: <Clear style={{ fontSize: 20, verticalAlign: 'middle' }} />,
  up: <KeyboardArrowUp />,
  down: <KeyboardArrowDown />,
}
