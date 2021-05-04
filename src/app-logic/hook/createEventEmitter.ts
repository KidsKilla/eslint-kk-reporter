import { useCallback, useEffect, useMemo } from 'react'
import { isDefined } from '../../lib/iter'

const nanoid = () => (Date.now() + Math.random()).toString(36)

export const createEventEmitter = <EventMap = Record<string, unknown>>() => {
  type AllEventNames = keyof EventMap & string
  type Listener<EvtName extends AllEventNames> = (
    event: EventMap[EvtName],
  ) => void

  const eventNameMap: Record<string, AllEventNames | null> = {}
  const listenerMap: Record<string, Listener<AllEventNames> | null> = {}

  const getEventListeners = <EvtName extends AllEventNames>(
    eventName: EvtName,
  ): Listener<EvtName>[] => {
    const ids = Object.keys(eventNameMap).filter(
      (id) => eventNameMap[id] === eventName,
    )
    return ids.map((id) => listenerMap[id]).filter(isDefined)
  }

  const removeListener = (id: string) => {
    listenerMap[id] = null
    eventNameMap[id] = null
  }

  const emitEvent = <EvtName extends AllEventNames>(
    eventName: EvtName,
    payload: EventMap[EvtName],
  ) => {
    Promise.resolve(null).then(() => {
      for (const onEvent of getEventListeners(eventName)) {
        onEvent(payload)
      }
    })
  }

  return {
    useEventListener: <EvtName extends AllEventNames>(
      eventName: EvtName,
      onEvent: Listener<EvtName>,
    ) => {
      const id = useMemo(nanoid, [])
      eventNameMap[id] = eventName
      listenerMap[id] = onEvent as Listener<AllEventNames>
      useEffect(() => () => removeListener(id), [id])
    },

    useEventEmitter: <EvtName extends AllEventNames>(eventName: EvtName) =>
      useCallback(
        (payload: EventMap[EvtName]) => emitEvent(eventName, payload),
        [eventName],
      ),

    emitEvent,
  }
}
