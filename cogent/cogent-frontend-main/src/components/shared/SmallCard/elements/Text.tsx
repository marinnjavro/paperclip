import { Card } from 'src/__generated__/graphql'

const Text = ({ card }: { card: Card }) => {
  return (
    <div className="mb-1 overflow-hidden text-clip px-3 pt-3 text-[8px] leading-relaxed">
      {!!card.text && <p dangerouslySetInnerHTML={{ __html: card.text }}></p>}
    </div>
  )
}

export default Text
