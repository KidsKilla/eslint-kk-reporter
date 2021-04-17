import { createAction, createReducer } from '@reduxjs/toolkit'
import { ESLintReport } from '../eslintReport'

export const updateReportURL = createAction<string>('updateReportURL' as const)
export const updateReport = createAction<ESLintReport>('updateReport' as const)

export const reportReducer = createReducer(
  {
    report: null as null | ESLintReport,
    url: null as null | string,
  },
  (builder) =>
    builder
      .addCase(updateReportURL, (state, action) => {
        state.url = action.payload
      })
      .addCase(updateReport, (state, action) => {
        state.report = action.payload
      }),
)
