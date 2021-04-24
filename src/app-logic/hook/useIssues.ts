import { useSelector, DefaultRootState } from 'react-redux'
import { issueAdapter, ReportIssue } from '../feature/issue'
import { rootSelect } from '../reducerMap'
import { selFile } from './useFile'
import { selRule } from './useRule'
import { ReportFile } from '../feature/file'
import { ReportRule } from '../feature/rule'

export const selIssue = issueAdapter.getSelectors(rootSelect.issue)

export const useIssues = (
  filter = (item: ReportIssue, index: number) => true,
) =>
  useSelector(
    (state: DefaultRootState) => {
      const issuesList = selIssue.selectAll(state).filter(filter)
      const filesWithIssuesMap: Record<string, ReportFile> = {}
      const rulesViolatedMap: Record<string, ReportRule> = {}
      issuesList.forEach((issue) => {
        const { filePath, ruleId } = issue
        filesWithIssuesMap[filePath] = selFile.selectById(state, filePath)!
        rulesViolatedMap[ruleId] = selRule.selectById(state, ruleId)!
      })

      return {
        issuesList,
        filesWithIssuesMap,
        rulesViolatedMap,
        issuesQuantity: {
          issues: issuesList.length,
          files: Object.keys(filesWithIssuesMap).length,
          rules: Object.keys(rulesViolatedMap).length,
        },
        memoHash: issuesList.map((is) => is.issueId).join('\n'),
      }
    },
    (a, b) => a.memoHash === b.memoHash,
  )
