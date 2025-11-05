/**
 * 型別定義 - 保羅傳道之旅測驗遊戲
 * 所有資料皆基於《使徒行傳》中文和合本（繁體＋現代標點）
 * 稱呼使用「神」而非「上帝」
 */

/**
 * 經文引用（和合本）
 */
export type VerseRef = {
  book: '徒';
  chap: number;
  vers?: string;
};

/**
 * 傳道旅程中的一個城市站點
 */
export type Step = {
  id: string;           // 唯一識別符（例如 "J1_S1"）
  order: number;
  place: string;        // 和合本地名
  modernHint?: string;  // 現今地理提示（可有可無）
  verses: VerseRef[];   // 主要經文（和合本）
  note?: string;        // 一行提示（用「神」而非「上帝」）
};

/**
 * 與城市相關的事件
 */
export type Event = {
  key: string;
  title: string;        // 事件標題（和合本用詞）
  verses: VerseRef[];
  note?: string;
};

/**
 * 一次完整的傳道旅程
 */
export type Journey = {
  id: 'J1' | 'J2';
  title: string;
  steps: Step[];
  events: Event[];
  correctPairs: Array<{ order: number; eventKeys: string[] }>;
};

/**
 * 卡片狀態（用於對答案後的視覺標示）
 */
export type CardState = 'idle' | 'correct' | 'wrong';

/**
 * Timeline 上的城市槽位
 */
export type CitySlot = {
  order: number;
  cityKey?: string;     // 對應 Step 的 id (唯一識別)
  state: CardState;
};

/**
 * Timeline 上的事件配置
 */
export type EventPlacement = {
  order: number;        // 屬於哪個城市槽位
  eventKey: string;     // 對應 Event 的 key
  state: CardState;
};

/**
 * 檢核結果
 */
export type CheckResult = {
  cityCorrect: boolean[];
  eventCorrect: Record<number, Record<string, boolean>>;
  allCorrect: boolean;
  correctCount: number;
  totalCount: number;
};

/**
 * 卡片池的過濾器
 */
export type CardFilter = {
  search: string;
  cardType: 'all' | 'city' | 'event';
};

/**
 * 遊戲模式
 */
export type GameMode = 'practice' | 'challenge';

/**
 * 難度級別
 */
export type Difficulty = 'easy' | 'medium' | 'hard';
