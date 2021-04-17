import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../../app-logic/createStore'

// declare module 'react-redux' {
//   interface DefaultRootState extends AppState {
//     z?: never
//   }
// }

export const AppProvider: React.FC = (props) => {
  const store = useMemo(() => createStore(), [])
  return <Provider store={store}>{props.children}</Provider>
}
