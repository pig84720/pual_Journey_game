/**
 * Zustand 全域狀態管理
 */

import { create } from 'zustand';
import type {
  Journey,
  CitySlot,
  EventPlacement,
  CheckResult,
  CardFilter,
  GameMode,
  Difficulty,
} from '../types';
import { J1, J2 } from '../data/journeys';
import { checkAnswer, checkSingleCity, checkSingleEvent } from '../utils/answerCheck';
import {
  saveCitySlots,
  loadCitySlots,
  saveEventPlacements,
  loadEventPlacements,
  saveCurrentJourney,
  loadCurrentJourney,
  saveGameMode,
  loadGameMode,
  saveDifficulty,
  loadDifficulty,
  saveInstantCheck,
  loadInstantCheck,
  clearJourneyData,
} from '../utils/persist';

interface GameState {
  // 當前旅程
  currentJourneyId: 'J1' | 'J2';
  currentJourney: Journey;

  // Timeline 狀態
  citySlots: CitySlot[];
  eventPlacements: EventPlacement[];

  // 檢核結果
  checkResult: CheckResult | null;
  showCelebration: boolean;

  // 卡片池（不再儲存，直接從 currentJourney 計算）
  cardFilter: CardFilter;

  // 遊戲設定
  gameMode: GameMode;
  difficulty: Difficulty;
  instantCheck: boolean;

  // Toast 訊息
  toast: { message: string; type: 'info' | 'success' | 'error' } | null;

  // Actions
  setJourney: (journeyId: 'J1' | 'J2') => void;
  initializeSlots: () => void;
  placeCityCard: (slotIndex: number, cityKey: string) => void;
  removeCityCard: (slotIndex: number) => void;
  placeEventCard: (order: number, eventKey: string) => void;
  removeEventCard: (order: number, eventKey: string) => void;
  checkAnswers: () => void;
  showCorrectAnswer: () => void;
  resetJourney: () => void;
  setCardFilter: (filter: Partial<CardFilter>) => void;
  setGameMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setInstantCheck: (enabled: boolean) => void;
  dismissCelebration: () => void;
  showToast: (message: string, type: 'info' | 'success' | 'error') => void;
  dismissToast: () => void;
}

export const useGameStore = create<GameState>((set, get) => {
  // 初始載入
  const savedJourneyId = loadCurrentJourney();
  const initialJourneyId = (savedJourneyId === 'J1' || savedJourneyId === 'J2') ? savedJourneyId : 'J1';
  const initialJourney = initialJourneyId === 'J1' ? J1 : J2;

  const savedCitySlots = loadCitySlots(initialJourneyId);
  const savedEventPlacements = loadEventPlacements(initialJourneyId);

  return {
    currentJourneyId: initialJourneyId,
    currentJourney: initialJourney,

    citySlots: savedCitySlots || initialJourney.steps.map((step) => ({
      order: step.order,
      cityKey: undefined,
      state: 'idle',
    })),

    eventPlacements: savedEventPlacements || [],

    checkResult: null,
    showCelebration: false,

    cardFilter: {
      search: '',
      cardType: 'all',
    },

    gameMode: loadGameMode(),
    difficulty: loadDifficulty(),
    instantCheck: loadInstantCheck(),

    toast: null,

    setJourney: (journeyId) => {
      const journey = journeyId === 'J1' ? J1 : J2;
      const savedSlots = loadCitySlots(journeyId);
      const savedEvents = loadEventPlacements(journeyId);

      set({
        currentJourneyId: journeyId,
        currentJourney: journey,
        citySlots: savedSlots || journey.steps.map((step) => ({
          order: step.order,
          cityKey: undefined,
          state: 'idle',
        })),
        eventPlacements: savedEvents || [],
        checkResult: null,
        showCelebration: false,
      });

      saveCurrentJourney(journeyId);
    },

    initializeSlots: () => {
      const { currentJourney } = get();
      set({
        citySlots: currentJourney.steps.map((step) => ({
          order: step.order,
          cityKey: undefined,
          state: 'idle',
        })),
        eventPlacements: [],
      });
    },

    placeCityCard: (slotIndex, cityKey) => {
      const { citySlots, currentJourneyId, instantCheck, currentJourney } = get();
      const newSlots = [...citySlots];
      newSlots[slotIndex] = {
        ...newSlots[slotIndex],
        cityKey,
        state: instantCheck ? (checkSingleCity(currentJourney, slotIndex, cityKey) ? 'correct' : 'wrong') : 'idle',
      };

      set({ citySlots: newSlots });
      saveCitySlots(currentJourneyId, newSlots);
    },

    removeCityCard: (slotIndex) => {
      const { citySlots, currentJourneyId } = get();
      const newSlots = [...citySlots];
      newSlots[slotIndex] = {
        ...newSlots[slotIndex],
        cityKey: undefined,
        state: 'idle',
      };

      set({ citySlots: newSlots });
      saveCitySlots(currentJourneyId, newSlots);
    },

    placeEventCard: (order, eventKey) => {
      const { eventPlacements, currentJourneyId, instantCheck, currentJourney } = get();
      const newPlacement: EventPlacement = {
        order,
        eventKey,
        state: instantCheck ? (checkSingleEvent(currentJourney, order, eventKey) ? 'correct' : 'wrong') : 'idle',
      };

      set({ eventPlacements: [...eventPlacements, newPlacement] });
      saveEventPlacements(currentJourneyId, [...eventPlacements, newPlacement]);
    },

    removeEventCard: (order, eventKey) => {
      const { eventPlacements, currentJourneyId } = get();
      const newPlacements = eventPlacements.filter(
        (ep) => !(ep.order === order && ep.eventKey === eventKey)
      );

      set({ eventPlacements: newPlacements });
      saveEventPlacements(currentJourneyId, newPlacements);
    },

    checkAnswers: () => {
      const { currentJourney, citySlots, eventPlacements } = get();
      const result = checkAnswer(currentJourney, citySlots, eventPlacements);

      // 更新城市槽位狀態
      const updatedCitySlots = citySlots.map((slot, index) => ({
        ...slot,
        state: (result.cityCorrect[index] ? 'correct' : 'wrong') as 'correct' | 'wrong',
      }));

      // 更新事件狀態
      const updatedEventPlacements = eventPlacements.map((ep) => ({
        ...ep,
        state: (result.eventCorrect[ep.order]?.[ep.eventKey] ? 'correct' : 'wrong') as 'correct' | 'wrong',
      }));

      set({
        checkResult: result,
        citySlots: updatedCitySlots,
        eventPlacements: updatedEventPlacements,
        showCelebration: result.allCorrect,
      });
    },

    showCorrectAnswer: () => {
      const { currentJourney, currentJourneyId } = get();

      // 自動排好正確順序
      const correctCitySlots: CitySlot[] = currentJourney.steps.map((step) => ({
        order: step.order,
        cityKey: step.id,
        state: 'correct',
      }));

      const correctEventPlacements: EventPlacement[] = currentJourney.correctPairs.flatMap((pair) =>
        pair.eventKeys.map((eventKey) => ({
          order: pair.order,
          eventKey,
          state: 'correct' as const,
        }))
      );

      set({
        citySlots: correctCitySlots,
        eventPlacements: correctEventPlacements,
      });

      saveCitySlots(currentJourneyId, correctCitySlots);
      saveEventPlacements(currentJourneyId, correctEventPlacements);

      get().showToast('已顯示參考答案', 'info');
    },

    resetJourney: () => {
      const { currentJourneyId, currentJourney } = get();
      clearJourneyData(currentJourneyId);

      set({
        citySlots: currentJourney.steps.map((step) => ({
          order: step.order,
          cityKey: undefined,
          state: 'idle',
        })),
        eventPlacements: [],
        checkResult: null,
        showCelebration: false,
      });

      get().showToast('已重置', 'info');
    },

    setCardFilter: (filter) => {
      set((state) => ({
        cardFilter: { ...state.cardFilter, ...filter },
      }));
    },

    setGameMode: (mode) => {
      set({ gameMode: mode });
      saveGameMode(mode);
    },

    setDifficulty: (difficulty) => {
      set({ difficulty });
      saveDifficulty(difficulty);
    },

    setInstantCheck: (enabled) => {
      const { currentJourney, citySlots, eventPlacements, currentJourneyId } = get();

      if (enabled) {
        // 開啟立即檢核時，重新檢查所有已放置的卡片
        const updatedCitySlots = citySlots.map((slot, index) => ({
          ...slot,
          state: slot.cityKey
            ? (checkSingleCity(currentJourney, index, slot.cityKey) ? 'correct' : 'wrong') as 'correct' | 'wrong'
            : 'idle' as const,
        }));

        const updatedEventPlacements = eventPlacements.map((ep) => ({
          ...ep,
          state: checkSingleEvent(currentJourney, ep.order, ep.eventKey) ? 'correct' : 'wrong' as 'correct' | 'wrong',
        }));

        set({
          instantCheck: enabled,
          citySlots: updatedCitySlots,
          eventPlacements: updatedEventPlacements,
        });

        saveCitySlots(currentJourneyId, updatedCitySlots);
        saveEventPlacements(currentJourneyId, updatedEventPlacements);
      } else {
        // 關閉立即檢核時，清除所有狀態
        const resetCitySlots = citySlots.map((slot) => ({
          ...slot,
          state: 'idle' as const,
        }));

        const resetEventPlacements = eventPlacements.map((ep) => ({
          ...ep,
          state: 'idle' as const,
        }));

        set({
          instantCheck: enabled,
          citySlots: resetCitySlots,
          eventPlacements: resetEventPlacements,
        });

        saveCitySlots(currentJourneyId, resetCitySlots);
        saveEventPlacements(currentJourneyId, resetEventPlacements);
      }

      saveInstantCheck(enabled);
    },

    dismissCelebration: () => {
      set({ showCelebration: false });
    },

    showToast: (message, type) => {
      set({ toast: { message, type } });
      setTimeout(() => {
        get().dismissToast();
      }, 3000);
    },

    dismissToast: () => {
      set({ toast: null });
    },
  };
});
