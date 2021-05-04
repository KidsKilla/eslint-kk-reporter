import React from 'react'
import { Typography, Box, Collapse, IconButton } from '@material-ui/core'
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
  isOpen: boolean
  onToggle: (val: boolean) => void
}> = (props) => {
  return (
    <>
      <Box
        onClick={() => props.onToggle(!props.isOpen)}
        p={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <IconButton
          aria-label="expand"
          size="small"
          onClick={() => props.onToggle(!props.isOpen)}
        >
          {props.isOpen ? icon.up : icon.down}
        </IconButton>{' '}
        <Box>{props.title}</Box>
      </Box>
      <Collapse in={props.isOpen} timeout={300} unmountOnExit={false}>
        <Box pt={1}>{props.children}</Box>
      </Collapse>
    </>
  )
}

export const icon = {
  yes: <Check style={{ fontSize: 20, verticalAlign: 'middle' }} />,
  no: <Clear style={{ fontSize: 20, verticalAlign: 'middle' }} />,
  up: <KeyboardArrowUp />,
  down: <KeyboardArrowDown />,
}
