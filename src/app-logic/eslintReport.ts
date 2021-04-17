import { ESLint } from 'eslint'
import { hasProp } from '../lib/hasProp'

export type ESLintReportItem = ESLint.LintResult
export interface ESLintReport {
  results: ESLintReportItem[]
  metadata: ESLint.LintResultData
}

export const SEVERITY = ['off', 'warn', 'error']

export const isESLintReport = (data: unknown): data is ESLintReport => {
  if (typeof data !== 'object') {
    return false
  }
  if (!data) {
    return false
  }
  if (!hasProp('results', data) || !hasProp('metadata', data)) {
    return false
  }
  return Array.isArray(data.results) && data.metadata != null
}
