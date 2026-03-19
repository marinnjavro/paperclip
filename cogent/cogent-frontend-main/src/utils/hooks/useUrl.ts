import { useRouter } from 'next/router'
import useLocalStorage from './useLocalStorage'

export default function useUrl() {
  const router = useRouter()
  const [cogentUser] = useLocalStorage('cogentUser', '')

  const to = (path: string) => {
    router.push(path)
  }

  const toOpen = (path: string, query: { [key: string]: string }) => {
    router.push({
      pathname: path,
      query: query
    })
  }

  const toFeed = () => to('/feed')

  const toLibrary = () => to('/library')

  const toCommunity = () => to('/community')

  const toProfile = (userId: string) => to(`/user/${userId}`)

  const toMyProfile = () => toProfile(cogentUser?.id)

  const toCog = (cogId: string) => to(`/cogs/${cogId}/edit`)

  const toOpenCogEditor = () => toOpen(`/library`, { editor: 'true' })

  const toOpenCogGenerator = () => toOpen(`/library`, { generator: 'true' })

  return {
    toFeed,
    toLibrary,
    toCommunity,
    toProfile,
    toMyProfile,
    toCog,
    toOpenCogEditor,
    toOpenCogGenerator
  }
}
