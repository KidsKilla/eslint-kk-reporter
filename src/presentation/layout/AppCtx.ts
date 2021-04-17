import { createContext } from 'react'
import { ESLint } from 'eslint'

export interface Report {
  results: ESLint.LintResult[]
  metadata: ESLint.LintResultData
}

export const DEFAULT_STATE = {
  report: null as null | Report,
  reportURL: null as null | string,
}

export const AppCtx = createContext({
  state: DEFAULT_STATE,
  dispatch: <T>(x: T) => x,
})
