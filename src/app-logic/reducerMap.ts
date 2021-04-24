import { reportReducer } from './feature/report'
import { issueSlice } from './feature/issue'
import { fileSlice } from './feature/file'
import { ruleSlice } from './feature/rule'

export const ROOT_REDUCER = {
  report: reportReducer,
  issue: issueSlice.reducer,
  file: fileSlice.reducer,
  rule: ruleSlice.reducer,
}

type ReducerMap = typeof ROOT_REDUCER
type RKeys = keyof ReducerMap

export type AppState = {
  [K in RKeys]: ReturnType<ReducerMap[K]>
}

export const rootSelect: {
  [K in RKeys]: (state: AppState) => AppState[K]
} = {
  file: (state) => state.file,
  issue: (state) => state.issue,
  report: (state) => state.report,
  rule: (state) => state.rule,
}

declare module 'react-redux' {
  interface DefaultRootState extends AppState {
    z?: never
  }
}
