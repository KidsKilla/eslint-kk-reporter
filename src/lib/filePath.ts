export const getSharedPath = (filePaths: string[]) => {
  let sharedStart = filePaths[0] || ''
  filePaths.some((filePath) => {
    if (sharedStart === '') {
      return true
    }
    while (sharedStart !== '') {
      if (filePath.startsWith(sharedStart)) {
        return false
      }
      sharedStart = removeLastSegment(sharedStart)
    }
    return true
  })
  return sharedStart
}

export const removeLastSegment = (filePath: string) => {
  const parts = filePath.split('/')
  parts.pop()
  return parts.join('/')
}
