/**
 * 陣列洗牌工具（Fisher-Yates shuffle）
 */

/**
 * 洗牌陣列（返回新陣列，不修改原陣列）
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 取得陣列的隨機子集
 */
export function randomSubset<T>(array: T[], count: number): T[] {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * 隨機排序（用於顯示題庫卡片）
 */
export function randomize<T>(array: T[], seed?: number): T[] {
  if (seed !== undefined) {
    // 使用種子的簡單偽隨機（可預測，用於測試）
    let s = seed;
    const seededRandom = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  return shuffle(array);
}
