import React, { FC, useState, useCallback, useEffect } from 'react'
import { Card } from 'src/__generated__/graphql'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import SortableItem from '@/components/blocks/CardGroup/SortableItem'
import Item from '@/components/blocks/CardGroup/Item'

interface SortableProps {
  items: Card[] | undefined | null
  updateOrder: (cardId: string, newPosition: number) => void
}

// TODO fix items type
const SortableCards: FC<SortableProps> = ({ items, updateOrder }) => {
  const [sortableItems, setSortableItems] = useState<any>(items || [])
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  )

  useEffect(() => {
    if (!items) return
    setSortableItems(items)
  }, [items])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (!event.active.id) return
    setActiveId(event.active.id.toString())
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    if (active.id !== over?.id) {
      setSortableItems((items: any) => {
        if (!items) return
        const oldIndex = items.findIndex((item: Card) => item.id === active?.id)
        const newIndex = items.findIndex((item: Card) => item.id === over.id)
        const overItem = items.find((item: Card) => item.id === over.id)
        const newPosition = overItem?.position
        updateOrder(active.id.toString(), newPosition as number)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
        {sortableItems!.map((item: Card, index: number) => (
          <SortableItem key={item.id} id={item.id} index={index} card={item} />
        ))}
      </SortableContext>
      <DragOverlay adjustScale className="cursor-move">
        {!!activeId ? (
          <Item
            id={activeId}
            card={sortableItems!.find((item: Card) => item.id === activeId)}
            isDragging={true}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default SortableCards
