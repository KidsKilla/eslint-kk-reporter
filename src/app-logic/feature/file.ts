import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ESLintReportItem } from '../eslintReport'
import { updateReport } from './report'

export type ReportFile = Omit<ESLintReportItem, 'messages'>

export const fileAdapter = createEntityAdapter<ReportFile>({
  selectId: (itm) => itm.filePath,
})

export const fileSlice = createSlice({
  name: 'file',
  initialState: fileAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(updateReport, (state, action) =>
      fileAdapter.addMany(state, selectFiles(action)),
    ),
})

const selectFiles = (action: ReturnType<typeof updateReport>) => {
  const files = action.payload.results.map((it) => ({
    ...it,
    messages: undefined,
  }))
  return files
}
