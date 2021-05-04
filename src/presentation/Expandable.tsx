import React, { useState } from 'react'
import { useEventListener } from '../app-logic/hook/events'
import { CollapseWithTitle } from './util'

export const Expandable: React.FC<{
  title: React.ReactNode
}> = (props) => {
  const [isOpen, setOpen] = useState(false)
  useEventListener('ALL Collapse', setOpen)
  useEventListener('ALL Expand', setOpen)
  return (
    <CollapseWithTitle isOpen={isOpen} onToggle={setOpen} title={props.title}>
      {props.children}
    </CollapseWithTitle>
  )
}
