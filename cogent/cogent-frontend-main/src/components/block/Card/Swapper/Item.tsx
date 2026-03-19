import { Card } from 'src/__generated__/graphql'
import React, { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import SmallCard from './SmallCard'

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  index: number
  id: string
  card: Card | undefined | null
  withOpacity?: boolean
  isDragging: boolean
}

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, card, withOpacity, isDragging, style, index, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? '0.75' : '1',
      transformOrigin: '50% 50%',
      height: 'auto',
      width: 'auto',
      borderRadius: '1.5rem',
      cursor: isDragging ? 'grabbing' : 'grab',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...style
    }

    return (
      <div
        ref={ref}
        style={inlineStyles}
        {...props}
        className={`${isDragging ? 'shadow-lg' : ''} h-full w-full`}
      >
        {!!card && (
          <SmallCard
            key={`card-${id}`}
            index={index}
            card={card}
            isDragging={isDragging}
          />
        )}
      </div>
    )
  }
)

export default Item
