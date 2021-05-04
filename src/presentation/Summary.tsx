import React, { useState } from 'react'
import { Paper } from '@material-ui/core'
import { useTotalCounts } from '../app-logic/hook/useTotalCounts'
import { useIssues } from '../app-logic/hook/useIssues'
import { CollapseWithTitle, SmallText } from './util'
import { Island } from './Island'
import { CountPill } from './Pill'

export const Summary: React.FC = () => {
  const totalQuantity = useTotalCounts()
  const { issuesQuantity } = useIssues()
  const [isOpen, setOpen] = useState(false)
  return (
    <Paper>
      <CollapseWithTitle
        isOpen={isOpen}
        onToggle={setOpen}
        title={
          <div style={{ whiteSpace: 'nowrap' }}>
            Errors:{' '}
            <CountPill
              type="error"
              showZero={true}
              number={issuesQuantity.errorCount}
            />
            <br />
            Warnings:{' '}
            <CountPill
              type="warn"
              showZero={true}
              number={issuesQuantity.warnCount}
            />
          </div>
        }
      >
        <Island>
          <SmallText>
            All issues: {issuesQuantity.issueTotalCount}
            <br />
            Files: {issuesQuantity.fileCount} of {totalQuantity.files}
            <br />
            Rules: {issuesQuantity.ruleCount} of {totalQuantity.rules}
          </SmallText>
        </Island>
      </CollapseWithTitle>
    </Paper>
  )
}
