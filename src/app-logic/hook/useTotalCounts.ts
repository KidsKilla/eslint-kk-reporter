import { useSelector } from 'react-redux'
import { ruleAdapter } from '../feature/rule'
import { rootSelect } from '../reducerMap'
import { selIssue } from './useIssues'
import { selFile } from './useFile'

const selRule = ruleAdapter.getSelectors(rootSelect.rule)

export const useTotalCounts = () => ({
  issues: useSelector(selIssue.selectTotal),
  files: useSelector(selFile.selectTotal),
  rules: useSelector(selRule.selectTotal),
})
