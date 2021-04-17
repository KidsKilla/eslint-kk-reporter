import React from 'react'
import styled from '@emotion/styled'
import { Global } from '@emotion/react'
import { globalStyles } from './globalStyles'
import { Content } from '../Content'
import { AppHeader } from './AppHeader'
import { AppProvider } from './AppProvider'

export const App: React.VFC = () => (
  <AppProvider>
    <Global styles={globalStyles} />
    <AppHeader />
    <AppBody>
      <Content />
    </AppBody>
  </AppProvider>
)

const AppBody = styled.div({
  height: '100vh',
})
