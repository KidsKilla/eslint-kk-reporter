import { createEventEmitter } from './createEventEmitter'

const { emitEvent, useEventEmitter, useEventListener } = createEventEmitter<{
  'ALL Expand': true
  'ALL Collapse': false
  'FILE Expand': string
  'FILE Collapse': string
  'RULE Expand': string
  'RULE Collapse': string
}>()

export { emitEvent, useEventEmitter, useEventListener }
