/**
 * 事件軌道元件（城市下方的事件放置區）
 */

import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import type { EventPlacement } from '../../types';
import { EventCard } from '../Cards/EventCard';
import { useGameStore } from '../../store/useGameStore';

interface EventRailProps {
  order: number;
  events: EventPlacement[];
}

export function EventRail({ order, events }: EventRailProps) {
  const { currentJourney, removeEventCard } = useGameStore();

  const { isOver, setNodeRef } = useDroppable({
    id: `event-rail-${order}`,
    data: { type: 'event-rail', order },
  });

  const handleRemove = (eventKey: string) => {
    removeEventCard(order, eventKey);
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[80px] rounded-card border-2 border-dashed p-2
        transition-all duration-200
        ${isOver ? 'border-accent-600 bg-accent-200 scale-105' : 'border-accent-600/60 bg-accent-100'}
        ${events.length > 0 ? 'border-solid' : ''}
      `}
      aria-label={`事件軌道 ${order}`}
    >
      {events.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {events.map((ep) => {
            const event = currentJourney.events.find((e) => e.key === ep.eventKey);
            if (!event) return null;

            return (
              <div key={ep.eventKey} className="relative group">
                <EventCard event={event} state={ep.state} isDraggable={false} className="w-full sm:w-auto" />
                <button
                  onClick={() => handleRemove(ep.eventKey)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-error text-white
                           opacity-0 group-hover:opacity-100 transition-opacity
                           flex items-center justify-center text-caption font-bold
                           hover:bg-error/80"
                  aria-label={`移除事件 ${event.title}`}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <motion.div
          className="flex items-center justify-center h-full min-h-[80px] text-center"
          animate={isOver ? { scale: 1.05 } : { scale: 1 }}
        >
          <span className="text-[18px] text-accent-700 font-medium">拖曳事件至此</span>
        </motion.div>
      )}
    </div>
  );
}
