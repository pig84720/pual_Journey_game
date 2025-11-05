/**
 * Timeline 無障礙測試
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CitySlot } from '../components/Timeline/CitySlot';
import { EventRail } from '../components/Timeline/EventRail';
import { useGameStore } from '../store/useGameStore';
import type { CitySlot as CitySlotType } from '../types';

// Mock Zustand store
vi.mock('../store/useGameStore', () => ({
  useGameStore: vi.fn(),
}));

// Mock @dnd-kit/core
vi.mock('@dnd-kit/core', () => ({
  useDroppable: () => ({
    isOver: false,
    setNodeRef: () => {},
  }),
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    isDragging: false,
  }),
  DndContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Timeline Accessibility', () => {
  beforeEach(() => {
    // Setup mock store
    (useGameStore as any).mockReturnValue({
      currentJourney: {
        steps: [
          {
            id: 'J1_S1',
            order: 1,
            place: '安提阿（敘利亞）',
            verses: [{ book: '徒', chap: 13, vers: '1-3' }],
            note: '聖靈差派，教會按手差遣',
          },
        ],
        events: [],
      },
      removeCityCard: vi.fn(),
      removeEventCard: vi.fn(),
    });
  });

  describe('CitySlot', () => {
    it('應有正確的 aria-label', () => {
      const slot: CitySlotType = {
        order: 1,
        cityKey: undefined,
        state: 'idle',
      };

      render(<CitySlot slot={slot} slotIndex={0} />);

      expect(screen.getByLabelText('城市槽位 1')).toBeInTheDocument();
    });

    it('正確狀態應有對應的 data-state', () => {
      const slot: CitySlotType = {
        order: 1,
        cityKey: 'J1_S1',
        state: 'correct',
      };

      const { container } = render(<CitySlot slot={slot} slotIndex={0} />);
      const cardElement = container.querySelector('[data-state="correct"]');

      expect(cardElement).toBeInTheDocument();
    });

    it('錯誤狀態應有對應的 data-state', () => {
      const slot: CitySlotType = {
        order: 1,
        cityKey: 'J1_S1',
        state: 'wrong',
      };

      const { container } = render(<CitySlot slot={slot} slotIndex={0} />);
      const cardElement = container.querySelector('[data-state="wrong"]');

      expect(cardElement).toBeInTheDocument();
    });
  });

  describe('EventRail', () => {
    it('應有正確的 aria-label', () => {
      render(<EventRail order={1} events={[]} />);

      expect(screen.getByLabelText('事件軌道 1')).toBeInTheDocument();
    });
  });
});
