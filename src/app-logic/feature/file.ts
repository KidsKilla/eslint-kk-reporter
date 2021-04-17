import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ESLintReportItem } from '../eslintReport'
import { updateReport } from './report'

export const fileAdapter = createEntityAdapter<ESLintReportItem>({
  selectId: (itm) => itm.filePath,
})

export const fileSlice = createSlice({
  name: 'file',
  initialState: fileAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(updateReport, (state, action) =>
      fileAdapter.addMany(state, action.payload.results),
    ),
})
