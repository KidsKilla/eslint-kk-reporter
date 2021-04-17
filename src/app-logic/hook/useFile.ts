import { useSelector } from 'react-redux'
import { fileAdapter } from '../feature/file'
import { rootSelect } from '../reducerMap'

const select = fileAdapter.getSelectors(rootSelect.file)

export const useFile = () => {
  return {
    files: useSelector(select.selectAll),
  }
}
