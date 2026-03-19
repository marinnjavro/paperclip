import { Card } from 'src/__generated__/graphql'
import React, {
  forwardRef,
  HTMLAttributes,
  CSSProperties,
  useContext
} from 'react'
import { MassEditorContext } from '@/components/blocks/EditorBlocks'

import LibraryCard from '@/components/library/cards/LibraryCard'

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

    const {
      isMassEditing,
      openMassEditor,
      isCardSelected,
      addToCog,
      toggleSelection
    } = useContext(MassEditorContext)

    return (
      <div
        ref={ref}
        style={inlineStyles}
        {...props}
        className={`${
          isDragging ? 'shadow-lg' : ''
        } h-full w-full sm:h-[350px] sm:w-[181px]`}
      >
        {!!card && (
          <LibraryCard
            key={`card-${id}`}
            card={card}
            isSelected={isCardSelected(card)}
            isMassEditing={isMassEditing}
            openMassEditor={openMassEditor}
            addToCog={addToCog}
            toggleSelection={toggleSelection}
          />
        )}
      </div>
    )
  }
)

export default Item
