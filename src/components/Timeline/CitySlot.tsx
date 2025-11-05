/**
 * 城市槽位元件（Timeline 上的放置區）
 */

import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import type { CitySlot as CitySlotType } from '../../types';
import { CityCard } from '../Cards/CityCard';
import { useGameStore } from '../../store/useGameStore';

interface CitySlotProps {
  slot: CitySlotType;
  slotIndex: number;
}

export function CitySlot({ slot, slotIndex }: CitySlotProps) {
  const { currentJourney, removeCityCard } = useGameStore();
  const step = currentJourney.steps.find((s) => s.id === slot.cityKey);

  const { isOver, setNodeRef } = useDroppable({
    id: `city-slot-${slotIndex}`,
    data: { type: 'city-slot', slotIndex },
  });

  const handleRemove = () => {
    if (slot.cityKey) {
      removeCityCard(slotIndex);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        relative min-h-[120px] rounded-card border-2 border-dashed p-3
        transition-all duration-200
        ${isOver ? 'border-brand-500 bg-brand-50/50 scale-105' : 'border-brand-100 bg-surface/50'}
        ${slot.cityKey ? 'border-solid' : ''}
      `}
      aria-label={`城市槽位 ${slot.order}`}
    >
      {slot.cityKey && step ? (
        <div className="relative group">
          <CityCard step={step} state={slot.state} isDraggable={false} />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-error text-white
                     opacity-0 group-hover:opacity-100 transition-opacity
                     flex items-center justify-center text-caption font-bold
                     hover:bg-error/80"
            aria-label={`移除 ${step.place}`}
          >
            ×
          </button>
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center h-full text-center"
          animate={isOver ? { scale: 1.05 } : { scale: 1 }}
        >
          <span className="text-h2 text-brand-500 font-bold mb-2">{slot.order}</span>
          <span className="text-[18px] text-brand-600 font-medium">拖曳城市至此</span>
        </motion.div>
      )}
    </div>
  );
}
