import { ESLint, Linter, Rule } from 'eslint'
import { hasProp } from '../lib/hasProp'

export type ESLintReportItem = ESLint.LintResult
export type ESLintMessage = Linter.LintMessage
export type ESLintRuleMeta = Rule.RuleMetaData

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
