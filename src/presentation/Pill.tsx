import React from 'react'
import { Chip, Box } from '@material-ui/core'

export const CountPill: React.VFC<{
  type: PillType
  number: number
  showZero?: boolean
}> = (props) =>
  props.showZero || props.number > 0 ? (
    <Pill label={String(props.number)} type={props.type} />
  ) : null

export type PillType = 'error' | 'warn' | 'normal'
const PillColor: Record<PillType, [string, string] | null> = {
  error: ['#f44336', '#fff'],
  warn: ['#ffcf33', '#000'],
  normal: null,
}

export const Pill: React.VFC<{
  type: PillType
  label: React.ReactNode
}> = (props) => {
  const [backgroundColor, color] = PillColor[props.type] || []
  return (
    <Box mr={1} display="inline-block">
      <Chip
        size="small"
        label={props.label}
        style={backgroundColor ? { backgroundColor, color } : undefined}
        variant="filled"
      />
    </Box>
  )
}
