import React, { useState, useEffect } from 'react'
import { extractLines } from '../lib/extractLines'
import { ReportIssue } from '../app-logic/feature/issue'
import { GrayText } from './util'
import { Expandable } from './Expandable'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-hcl'
// import 'prismjs/components/prism-json5'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism-okaidia.css'

export const IssueCollapse: React.VFC<{
  issue: ReportIssue
  fileSource: string
}> = ({ issue, fileSource }) => {
  const lang = 'typescript'

  const lines = extractLines(fileSource, {
    startLine: issue.line,
    endLine: issue.endLine,
    offset: 3,
  }).join('\n')

  const [code, setCode] = useState('')
  useEffect(() => {
    if (!code) {
      requestAnimationFrame(() => {
        setCode(Prism.highlight(lines, Prism.languages[lang], lang))
      })
    }
  }, [lines, code])

  return (
    <Expandable
      title={
        <>
          {issue.message}
          <br />
          <GrayText>
            From line {issue.line} to {issue.endLine}
          </GrayText>
        </>
      }
    >
      <pre
        data-start={String(issue.line)}
        className={`line-numbers language-${lang}`}
      >
        <code dangerouslySetInnerHTML={{ __html: code || lines }} />
      </pre>
    </Expandable>
  )
}
