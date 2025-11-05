/**
 * LocalStorage 持久化工具
 */

import type { CitySlot, EventPlacement, GameMode, Difficulty } from '../types';

const STORAGE_KEYS = {
  CITY_SLOTS: 'paul-journey-city-slots',
  EVENT_PLACEMENTS: 'paul-journey-event-placements',
  CURRENT_JOURNEY: 'paul-journey-current',
  GAME_MODE: 'paul-journey-mode',
  DIFFICULTY: 'paul-journey-difficulty',
  INSTANT_CHECK: 'paul-journey-instant-check',
} as const;

/**
 * 儲存城市槽位
 */
export function saveCitySlots(journeyId: string, slots: CitySlot[]): void {
  try {
    const key = `${STORAGE_KEYS.CITY_SLOTS}-${journeyId}`;
    localStorage.setItem(key, JSON.stringify(slots));
  } catch (error) {
    console.error('Failed to save city slots:', error);
  }
}

/**
 * 載入城市槽位
 */
export function loadCitySlots(journeyId: string): CitySlot[] | null {
  try {
    const key = `${STORAGE_KEYS.CITY_SLOTS}-${journeyId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load city slots:', error);
    return null;
  }
}

/**
 * 儲存事件配置
 */
export function saveEventPlacements(journeyId: string, placements: EventPlacement[]): void {
  try {
    const key = `${STORAGE_KEYS.EVENT_PLACEMENTS}-${journeyId}`;
    localStorage.setItem(key, JSON.stringify(placements));
  } catch (error) {
    console.error('Failed to save event placements:', error);
  }
}

/**
 * 載入事件配置
 */
export function loadEventPlacements(journeyId: string): EventPlacement[] | null {
  try {
    const key = `${STORAGE_KEYS.EVENT_PLACEMENTS}-${journeyId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load event placements:', error);
    return null;
  }
}

/**
 * 儲存當前旅程 ID
 */
export function saveCurrentJourney(journeyId: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_JOURNEY, journeyId);
  } catch (error) {
    console.error('Failed to save current journey:', error);
  }
}

/**
 * 載入當前旅程 ID
 */
export function loadCurrentJourney(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_JOURNEY);
  } catch (error) {
    console.error('Failed to load current journey:', error);
    return null;
  }
}

/**
 * 儲存遊戲模式
 */
export function saveGameMode(mode: GameMode): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_MODE, mode);
  } catch (error) {
    console.error('Failed to save game mode:', error);
  }
}

/**
 * 載入遊戲模式
 */
export function loadGameMode(): GameMode {
  try {
    const mode = localStorage.getItem(STORAGE_KEYS.GAME_MODE);
    return (mode as GameMode) || 'practice';
  } catch (error) {
    console.error('Failed to load game mode:', error);
    return 'practice';
  }
}

/**
 * 儲存難度
 */
export function saveDifficulty(difficulty: Difficulty): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DIFFICULTY, difficulty);
  } catch (error) {
    console.error('Failed to save difficulty:', error);
  }
}

/**
 * 載入難度
 */
export function loadDifficulty(): Difficulty {
  try {
    const difficulty = localStorage.getItem(STORAGE_KEYS.DIFFICULTY);
    return (difficulty as Difficulty) || 'medium';
  } catch (error) {
    console.error('Failed to load difficulty:', error);
    return 'medium';
  }
}

/**
 * 儲存立即檢核模式
 */
export function saveInstantCheck(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INSTANT_CHECK, String(enabled));
  } catch (error) {
    console.error('Failed to save instant check:', error);
  }
}

/**
 * 載入立即檢核模式
 */
export function loadInstantCheck(): boolean {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.INSTANT_CHECK);
    return value === 'true';
  } catch (error) {
    console.error('Failed to load instant check:', error);
    return false;
  }
}

/**
 * 清除特定旅程的資料
 */
export function clearJourneyData(journeyId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEYS.CITY_SLOTS}-${journeyId}`);
    localStorage.removeItem(`${STORAGE_KEYS.EVENT_PLACEMENTS}-${journeyId}`);
  } catch (error) {
    console.error('Failed to clear journey data:', error);
  }
}

/**
 * 清除所有資料
 */
export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    // 清除所有旅程特定的資料
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('paul-journey-')) {
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error('Failed to clear all data:', error);
  }
}
