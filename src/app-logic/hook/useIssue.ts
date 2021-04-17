// import { useSelector } from 'react-redux'
import { useSelector } from 'react-redux'
import { issueAdapter } from '../feature/issue'
import { rootSelect } from '../reducerMap'

const selectors = issueAdapter.getSelectors(rootSelect.issue)

export const useIssue = () => {
  return {
    issues: useSelector(selectors.selectAll),
  }
}
