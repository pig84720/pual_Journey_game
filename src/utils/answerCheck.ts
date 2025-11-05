/**
 * 答案檢核工具
 * 只回傳對/錯布林，不計分
 */

import type { Journey, CheckResult, CitySlot, EventPlacement } from '../types';

/**
 * 檢核答案
 * @param journey 當前旅程資料
 * @param citySlots 使用者排列的城市槽位
 * @param eventPlacements 使用者排列的事件
 * @returns 檢核結果（對/錯標示、全對與否）
 */
export function checkAnswer(
  journey: Journey,
  citySlots: CitySlot[],
  eventPlacements: EventPlacement[]
): CheckResult {
  const cityCorrect: boolean[] = [];
  const eventCorrect: Record<number, Record<string, boolean>> = {};

  let correctCount = 0;
  let totalCount = 0;

  // 檢核城市順序
  journey.steps.forEach((step, index) => {
    totalCount++;
    const userSlot = citySlots[index];
    const isCorrect = userSlot?.cityKey === step.id;
    cityCorrect.push(isCorrect);
    if (isCorrect) correctCount++;
  });

  // 檢核事件配對
  journey.correctPairs.forEach((pair) => {
    eventCorrect[pair.order] = {};

    // 找出使用者放在這個 order 的事件
    const userEvents = eventPlacements
      .filter((ep) => ep.order === pair.order)
      .map((ep) => ep.eventKey);

    // 檢查每個應該在這裡的事件
    pair.eventKeys.forEach((eventKey) => {
      totalCount++;
      const isCorrect = userEvents.includes(eventKey);
      eventCorrect[pair.order][eventKey] = isCorrect;
      if (isCorrect) correctCount++;
    });

    // 檢查使用者放的多餘事件（算錯）
    userEvents.forEach((eventKey) => {
      if (!pair.eventKeys.includes(eventKey)) {
        totalCount++;
        eventCorrect[pair.order][eventKey] = false;
      }
    });
  });

  // 判斷是否全對
  const allCorrect = cityCorrect.every((c) => c) &&
    Object.values(eventCorrect).every((orderEvents) =>
      Object.values(orderEvents).every((isCorrect) => isCorrect)
    );

  return {
    cityCorrect,
    eventCorrect,
    allCorrect,
    correctCount,
    totalCount,
  };
}

/**
 * 檢核單一城市槽位
 */
export function checkSingleCity(
  journey: Journey,
  slotIndex: number,
  cityKey?: string
): boolean {
  const step = journey.steps[slotIndex];
  if (!step) return false;
  return cityKey === step.id;
}

/**
 * 檢核單一事件配對
 */
export function checkSingleEvent(
  journey: Journey,
  order: number,
  eventKey: string
): boolean {
  const pair = journey.correctPairs.find((p) => p.order === order);
  if (!pair) return false;
  return pair.eventKeys.includes(eventKey);
}
