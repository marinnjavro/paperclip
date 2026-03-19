import { NextPage } from 'next'
import { CogContextProvider } from '@/components/cog/state/CogContext'
import EditorCog from '@/components/cog'

const CogPage: NextPage = () => {
  return (
    <CogContextProvider>
      <EditorCog />
    </CogContextProvider>
  )
}

export default CogPage
