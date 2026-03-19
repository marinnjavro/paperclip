import { useEffect } from 'react'
import _ from 'lodash'
import { useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  Block,
  Card,
  Cog,
  FetchCogsCardLinksQuery,
  FetchCogsCardLinksQueryVariables
} from 'src/__generated__/graphql'
import { useScrollBlock } from '@/utils/hooks/useScrollBlock'
import { useToast } from '@/components/shared/Toast'
import LinkableCard from '@/components/block/CardLinksModal/LinkableCard'

interface CardLinksModalProps {
  isVisible: boolean
  toggleModal: () => void
  formatLink: (cogId: string, cardId: string, blockId: string) => void
}

const CardLinksModal: React.FC<CardLinksModalProps> = ({
  isVisible,
  toggleModal,
  formatLink
}) => {
  const toast = useToast()
  const [blockScroll, allowScroll] = useScrollBlock()

  /* fetch user's cogs */
  const FETCH_USER_COGS = gql(`
    query fetchCogsCardLinks {
      me {
        cogs {
          id
          name
          description
          tags
          isPinned
          isPublic
          createdAt
          user {
            id
            name
            email
            roles
            photoUrl(width: 1000, height: 1000)
            organization {
              id
              name
            }
          }
          cards {
            id
            blockId
            name
            cardType
            text
            position
            photoUrl(width: 1000, height: 1000)
            videoUrl
            audioUrl
            actions
          }
          blocks {
            collection {
              id
              name
              position
              cogId
                cards {
                  collection {
                  id
                  blockId
                  name
                  cardType
                  text
                  position
                  photoUrl(width: 1000, height: 1000)
                  videoUrl
                  audioUrl
                  actions
                }
              } 
            }
          }
        } 
      }
    }
  `)

  const { loading, data } = useQuery<
    FetchCogsCardLinksQuery,
    FetchCogsCardLinksQueryVariables
  >(FETCH_USER_COGS, {
    onError: (err) => toast.open('error', err.message)
  })

  /* disable body scrolling when modal is open */
  useEffect(() => {
    isVisible ? blockScroll() : allowScroll()
  }, [isVisible])

  const getCog = (blockId: string) => {
    if (!data?.me?.cogs) return
    const cog = data?.me?.cogs.find((cog: any) =>
      cog?.blocks?.find((block: Block) => block?.id === blockId)
    )
    return cog
  }

  const sortCogCards = (cogs: any[]) => {
    let cards = cogs.map((cog) => cog.cards)
    let sortedByBlock = _.flatten(_.orderBy(cards, ['blockId']))

    return sortedByBlock
  }

  const linkToCard = (cogId: string, cardId: string, blockId: string) => {
    formatLink(cogId, cardId, blockId)
    toggleModal()
  }

  const CardLinksModal = () => (
    <div
      className="relative z-50 text-support-gray-002"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 backdrop-blur-sm transition-opacity"
        onClick={() => toggleModal()}
      ></div>
      <div className="fixed inset-0 z-10 h-screen max-w-[750px] overflow-hidden">
        <div className="flex h-full items-end justify-start text-center sm:items-center">
          <div className="relative h-full w-full transform overflow-hidden rounded-3xl rounded-lg bg-[#252736] p-6 text-left shadow-xl transition-all">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-day-base-primary
                 focus:ring-offset-0"
                onClick={() => toggleModal()}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex max-h-full flex-col overflow-hidden">
              <div className="basis-1/10 mb-2 pt-3 text-2xl font-semibold text-white">
                Link to a Card
              </div>
              <div className="basis-9/10 scrollbar-md--purple grid h-full grid-cols-1 gap-x-3.5 gap-y-7 overflow-y-auto py-6 pr-3 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4">
                {!!data?.me?.cogs &&
                  sortCogCards(data?.me?.cogs).map((card: any) => (
                    <LinkableCard
                      key={`linkable-card-${card.id}`}
                      cog={getCog(card.blockId)}
                      card={card}
                      linkToCard={linkToCard}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return <>{!loading && isVisible && <CardLinksModal />}</>
}

export default CardLinksModal
