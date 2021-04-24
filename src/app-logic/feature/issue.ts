import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit'
import { ESLintMessage } from '../eslintReport'
import { updateReport } from './report'

export interface ReportIssue extends Omit<ESLintMessage, 'ruleId'> {
  issueId: string
  filePath: string
  ruleId: string
}

export const issueAdapter = createEntityAdapter<ReportIssue>({
  selectId: (issue) => issue.issueId,
})

export const issueSlice = createSlice({
  name: 'msg',
  initialState: issueAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(updateReport, (state, action) => {
      const { results } = action.payload
      const issues: ReportIssue[] = []
      results.forEach((res) => {
        res.messages.forEach((msg) => {
          if (!msg.ruleId) {
            return
          }
          issues.push({
            issueId: nanoid(),
            filePath: res.filePath,
            ...msg,
            ruleId: msg.ruleId,
          })
        })
      })
      return issueAdapter.addMany(state, issues)
    }),
})
