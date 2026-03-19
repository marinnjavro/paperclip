import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import { Block } from 'src/__generated__/graphql'
import CogContext from '@/components/cog/state/CogContext'

import SortableBlock from '@/components/cog/SortableBlock'

const SortableBlockList: React.FC = () => {
  const { blocks, updateBlockOrder } = useContext(CogContext)

  const [activeId, setActiveId] = useState<string | null>(null)
  const [sortableItems, setSortableItems] = useState(blocks || [])
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  useEffect(() => {
    setSortableItems(blocks)
  }, [blocks])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (!event.active.id) return
    setActiveId(event.active.id.toString())
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    if (active.id !== over?.id) {
      setSortableItems((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id)
        const newIndex = items.findIndex((item: any) => item.id === over.id)
        const overItem = items.find((item: any) => item.id === over.id)
        const newPosition = overItem.position

        updateBlockOrder(active.id.toString(), newPosition)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const OverlayBlock = () => {
    const block = sortableItems.find((item: Block) => item.id === activeId)
    return !!block ? (
      <SortableBlock key={`block-${block.id}`} block={block} isOverlay={true} />
    ) : null
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
        {sortableItems.map((block: any) => (
          <SortableBlock key={`block-${block.id}`} block={block} />
        ))}
        <DragOverlay>{activeId ? <OverlayBlock /> : null}</DragOverlay>
      </SortableContext>
    </DndContext>
  )
}

export default SortableBlockList
