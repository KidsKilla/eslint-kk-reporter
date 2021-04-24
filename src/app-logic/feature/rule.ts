import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { ESLintRuleMeta } from '../eslintReport'
import { updateReport } from './report'

export interface ReportRule extends Omit<ESLintRuleMeta, 'ruleId'> {
  ruleId: string
}

export const ruleAdapter = createEntityAdapter<ReportRule>({
  selectId: (itm) => itm.ruleId,
})

export const ruleSlice = createSlice({
  name: 'rule',
  initialState: ruleAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(updateReport, (state, action) =>
      ruleAdapter.addMany(
        state as EntityState<ReportRule>,
        selectRules(action),
      ),
    ),
})

const selectRules = (action: ReturnType<typeof updateReport>) => {
  const { rulesMeta } = action.payload.metadata
  const ruleIds = Object.keys(rulesMeta)
  const rules = ruleIds.map((ruleId) => ({
    ruleId,
    ...rulesMeta[ruleId],
  }))
  return rules
}
