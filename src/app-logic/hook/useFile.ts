import { useSelector } from 'react-redux'
import { fileAdapter } from '../feature/file'
import { rootSelect } from '../reducerMap'

export const selFile = fileAdapter.getSelectors(rootSelect.file)

export const useAllFiles = () => {
  return {
    allFiles: useSelector(selFile.selectAll),
  }
}

export const useOneFile = (filePath: string) => {
  const file = useSelector((state) => selFile.selectById(state, filePath))
  return {
    file,
  }
}

export const useFileSearch = (search: string) => {
  const filesFound = useSelector((state) => {
    const allFiles = selFile.selectAll(state)
    return allFiles.filter((file) => file.filePath.indexOf(search) > -1)
  })
  return {
    filesFound,
  }
}
