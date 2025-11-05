/**
 * 答案檢核邏輯測試
 */

import { describe, it, expect } from 'vitest';
import { checkAnswer, checkSingleCity, checkSingleEvent } from '../utils/answerCheck';
import { J1 } from '../data/journeys';
import type { CitySlot, EventPlacement } from '../types';

describe('answerCheck', () => {
  describe('checkAnswer', () => {
    it('應正確判斷全對的情況', () => {
      const citySlots: CitySlot[] = J1.steps.map((step) => ({
        order: step.order,
        cityKey: step.id,
        state: 'idle',
      }));

      const eventPlacements: EventPlacement[] = J1.correctPairs.flatMap((pair) =>
        pair.eventKeys.map((eventKey) => ({
          order: pair.order,
          eventKey,
          state: 'idle',
        }))
      );

      const result = checkAnswer(J1, citySlots, eventPlacements);

      expect(result.allCorrect).toBe(true);
      expect(result.cityCorrect.every((c) => c)).toBe(true);
      expect(result.correctCount).toBe(result.totalCount);
    });

    it('應正確判斷城市順序錯誤', () => {
      const citySlots: CitySlot[] = J1.steps.map((step, index) => ({
        order: step.order,
        // 故意錯置第一個和第二個
        cityKey: index === 0 ? J1.steps[1].id : index === 1 ? J1.steps[0].id : step.id,
        state: 'idle',
      }));

      const eventPlacements: EventPlacement[] = [];

      const result = checkAnswer(J1, citySlots, eventPlacements);

      expect(result.allCorrect).toBe(false);
      expect(result.cityCorrect[0]).toBe(false);
      expect(result.cityCorrect[1]).toBe(false);
    });

    it('應正確判斷事件配對錯誤', () => {
      const citySlots: CitySlot[] = J1.steps.map((step) => ({
        order: step.order,
        cityKey: step.id,
        state: 'idle',
      }));

      // 故意將事件放錯位置
      const eventPlacements: EventPlacement[] = [
        {
          order: 1,
          eventKey: 'J1_E2', // 錯誤：E2 應該在 order 4
          state: 'idle',
        },
      ];

      const result = checkAnswer(J1, citySlots, eventPlacements);

      expect(result.allCorrect).toBe(false);
      expect(result.eventCorrect[1]['J1_E2']).toBe(false);
    });

    it('應正確計算正確與總數', () => {
      const citySlots: CitySlot[] = J1.steps.map((step, index) => ({
        order: step.order,
        cityKey: index < 5 ? step.id : undefined, // 只填前 5 個
        state: 'idle',
      }));

      const eventPlacements: EventPlacement[] = [];

      const result = checkAnswer(J1, citySlots, eventPlacements);

      expect(result.correctCount).toBe(5);
      expect(result.correctCount).toBeLessThan(result.totalCount);
    });
  });

  describe('checkSingleCity', () => {
    it('應正確判斷單一城市槽位', () => {
      expect(checkSingleCity(J1, 0, J1.steps[0].id)).toBe(true);
      expect(checkSingleCity(J1, 0, J1.steps[1].id)).toBe(false);
      expect(checkSingleCity(J1, 0, undefined)).toBe(false);
    });
  });

  describe('checkSingleEvent', () => {
    it('應正確判斷單一事件配對', () => {
      expect(checkSingleEvent(J1, 1, 'J1_E1')).toBe(true);
      expect(checkSingleEvent(J1, 1, 'J1_E2')).toBe(false);
      expect(checkSingleEvent(J1, 999, 'J1_E1')).toBe(false);
    });
  });
});
