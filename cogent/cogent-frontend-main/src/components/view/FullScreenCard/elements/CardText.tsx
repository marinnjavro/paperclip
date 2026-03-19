import { useRouter } from 'next/router'
import parse, { domToReact } from 'html-react-parser'

const CardText = ({
  id,
  blockId,
  text,
  slideToCard,
  handleVerticalOnClick
}: {
  id: string
  blockId: string
  text: string
  slideToCard: (fromId: string, toId: string) => void
  handleVerticalOnClick: (id: string) => void
}) => {
  const router = useRouter()
  const { cogId } = router.query

  const isCogentLink = (classList: string): boolean =>
    !!classList && classList.includes('cogent-link')

  const isSameBlock = (id: string): boolean => id === blockId

  const isSameCog = (id: string): boolean => id === cogId

  const isVerticalLink = (classList: string): boolean =>
    !!classList && classList.includes('vertical-link')

  // TODO add types
  function parseWithCogentLinks(text: string) {
    const options: any = {
      replace: ({ name, attribs, children }: any) => {
        if (name === 'a' && attribs.href) {
          /* vertical link */
          if (isVerticalLink(attribs.class)) {
            {
              console.log(attribs)
            }

            return (
              <VerticalLink
                verticalCardId={attribs['data-verticalcardid']}
                isVerticalCog={attribs['data-isverticalcog']}
                verticalCogId={attribs['data-verticalcogid']}
              >
                {children}
              </VerticalLink>
            )
          }
          /* same cog & block link */
          if (
            isCogentLink(attribs.class) &&
            isSameCog(attribs['data-cogid']) &&
            isSameBlock(attribs['data-blockid'])
          ) {
            return (
              <CardLink cardId={attribs['data-cardid']}>{children}</CardLink>
            )
          }
          /* same cog & different block link */
          if (
            isCogentLink(attribs.class) &&
            isSameCog(attribs['data-cogid']) &&
            !isSameBlock(attribs['data-blockid'])
          ) {
            return <BlockLink href={attribs.href}>{children}</BlockLink>
          }
          /* different cog link */
          if (
            isCogentLink(attribs.class) &&
            !isSameCog(attribs['data-cogid'])
          ) {
            return <CogLink href={attribs.href}>{children}</CogLink>
          }
        }
      }
    }

    return parse(text, options)
  }

  const CardLink = ({
    cardId,
    children
  }: {
    cardId: string
    children: any
  }) => (
    <span
      className="cogent-link cursor-pointer"
      onClick={() => slideToCard(id, cardId)}
    >
      {domToReact(children)}
    </span>
  )

  const BlockLink = ({ href, children }: { href: string; children: any }) => {
    let query: {
      prevCard: string
      prevBlock: string
      prevCog: string | string[] | undefined
      blockId?: string | null
      focusedCardId?: string | null
    } = {
      prevCard: id,
      prevBlock: blockId,
      prevCog: cogId
    }
    const url = new URL(href)
    let path = url.pathname.split('/')
    const toCogId = path[2]

    if (url.searchParams.get('blockId')) {
      const blockId = url.searchParams.get('blockId')
      query = { ...query, blockId: blockId }
    }

    if (url.searchParams.get('focusedCardId')) {
      const id = url.searchParams.get('focusedCardId')
      query = { ...query, focusedCardId: id }
    }

    return (
      <span
        className="cogent-link cursor-pointer"
        onClick={() =>
          router.push({
            pathname: `/cogs/${toCogId}`,
            query: query
          })
        }
      >
        {domToReact(children)}
      </span>
    )
  }

  const CogLink = ({ href, children }: { href: string; children: any }) => {
    let query: {
      prevCog: string | string[] | undefined
      prevBlock: string
      prevCard: string
      blockId?: string | null
      focusedCardId?: string | null
    } = {
      prevCog: cogId,
      prevBlock: blockId,
      prevCard: id
    }
    const url = new URL(href)
    let path = url.pathname.split('/')
    const toCogId = path[2]

    if (url.searchParams.get('blockId')) {
      const blockId = url.searchParams.get('blockId')
      query = { ...query, blockId: blockId }
    }

    if (url.searchParams.get('focusedCardId')) {
      const id = url.searchParams.get('focusedCardId')
      query = { ...query, focusedCardId: id }
    }

    return (
      <span
        className="cogent-link cursor-pointer"
        onClick={() =>
          router.push({
            pathname: `/cogs/${toCogId}`,
            query: query
          })
        }
      >
        {domToReact(children)}
      </span>
    )
  }

  const VerticalLink = ({
    verticalCardId,
    isVerticalCog,
    verticalCogId,
    children
  }: {
    verticalCardId: string
    isVerticalCog: boolean | null
    verticalCogId: string
    children: any
  }) =>
    isVerticalCog ? (
      <a
        className="cogent-link vertical-link cursor-pointer"
        href={`/cogs/${verticalCogId}`}
      >
        {domToReact(children)}
      </a>
    ) : (
      <span
        className="cogent-link vertical-link cursor-pointer"
        onClick={() => handleVerticalOnClick(verticalCardId)}
      >
        {domToReact(children)}
      </span>
    )

  return (
    <div className="w-full pb-10 text-base font-medium leading-relaxed text-support-gray-002">
      {parseWithCogentLinks(text)}
    </div>
  )
}

export default CardText
