import { useSelector } from 'react-redux'
import { ruleAdapter } from '../feature/rule'
import { rootSelect } from '../reducerMap'

export const selRule = ruleAdapter.getSelectors(rootSelect.rule)

export const useAllRules = () => {
  return {
    allRules: useSelector(selRule.selectAll),
  }
}

export const useRulesById = (ruleId: string) => {
  return {
    rule: useSelector(
      (state) => selRule.selectById(state, ruleId),
      (a, b) => a?.ruleId === b?.ruleId,
    ),
  }
}

export const useRuleSearch = (search: string) =>
  useSelector((state) => ({
    rulesFound: selRule
      .selectAll(state)
      .filter((rule) => rule.ruleId.indexOf(search) > -1),
  }))
