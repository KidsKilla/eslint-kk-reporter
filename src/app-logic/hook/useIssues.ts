import { useSelector, DefaultRootState } from 'react-redux'
import { issueAdapter, ReportIssue } from '../feature/issue'
import { rootSelect } from '../reducerMap'
import { selFile } from './useFile'
import { selRule } from './useRule'
import { ReportFile } from '../feature/file'
import { ReportRule } from '../feature/rule'
import { groupIssuesCount } from '../../lib/groupIssuesCount'

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        filesWithIssuesMap[filePath] = selFile.selectById(state, filePath)!
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        rulesViolatedMap[ruleId] = selRule.selectById(state, ruleId)!
      })

      return {
        issuesList,
        filesWithIssuesMap,
        rulesViolatedMap,
        issuesQuantity: {
          ...groupIssuesCount(issuesList),
          fileCount: Object.keys(filesWithIssuesMap).length,
          ruleCount: Object.keys(rulesViolatedMap).length,
        },
        memoHash: issuesList.map((is) => is.issueId).join('\n'),
      }
    },
    (a, b) => a.memoHash === b.memoHash,
  )
