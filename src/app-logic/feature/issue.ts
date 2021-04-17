import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit'
import { Linter } from 'eslint'
import { updateReport } from './report'

export interface ESLintIssue extends Linter.LintMessage {
  id: string
  filePath: string
}

export const issueAdapter = createEntityAdapter<ESLintIssue>()

export const issueSlice = createSlice({
  name: 'msg',
  initialState: issueAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(updateReport, (state, action) => {
      const { results } = action.payload
      const issues: ESLintIssue[] = []
      results.forEach((res) => {
        res.messages.forEach((msg) => {
          issues.push({
            id: nanoid(),
            filePath: res.filePath,
            ...msg,
          })
        })
      })
      return issueAdapter.addMany(state, issues)
    }),
})
