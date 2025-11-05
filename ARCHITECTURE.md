# 架構說明文件

## 專案概覽

保羅傳道之旅測驗是一個無評分、高質感的互動式學習遊戲，使用現代 Web 技術棧打造。

## 核心設計理念

### 1. 無評分機制
- **只有對/錯標示**：綠框表示正確，紅框表示錯誤
- **慶祝全對**：所有答案正確時觸發拉炮動畫與祝賀詞
- **專注學習過程**：不顯示分數、百分比或等第

### 2. 資料驅動
所有題庫資料集中在 `src/data/journeys.ts`，使用 TypeScript 型別保證資料正確性。

### 3. 無障礙優先
- WCAG 2.2 AA 色彩對比
- 完整鍵盤導航支援
- ARIA 標籤與 Live Region
- 螢幕閱讀器友善

## 技術架構

### 狀態管理 (Zustand)

```typescript
// 全域狀態結構
{
  currentJourneyId: 'J1' | 'J2',
  citySlots: CitySlot[],           // Timeline 上的城市槽位
  eventPlacements: EventPlacement[], // 事件配置
  checkResult: CheckResult | null,   // 檢核結果
  showCelebration: boolean,          // 是否顯示慶祝動畫
  instantCheck: boolean,             // 立即檢核模式
}
```

### 拖放系統 (@dnd-kit)

使用 `@dnd-kit` 實現：
- **PointerSensor**：滑鼠/觸控拖放
- **KeyboardSensor**：鍵盤拖放（Tab、Space、方向鍵、Enter）
- **Droppable zones**：城市槽位與事件軌道
- **Draggable cards**：城市卡與事件卡

### 檢核邏輯

位於 `src/utils/answerCheck.ts`：

```typescript
checkAnswer() 回傳：
{
  cityCorrect: boolean[],           // 每個城市槽位是否正確
  eventCorrect: Record<...>,        // 每個事件是否正確
  allCorrect: boolean,              // 是否全對
  correctCount: number,             // 正確數（僅用於摘要）
  totalCount: number                // 總數（僅用於摘要）
}
```

### 持久化 (LocalStorage)

保存：
- 當前旅程 ID
- 城市槽位排列
- 事件配置
- 遊戲模式與難度
- 立即檢核開關

## 元件架構

```
App
├── HeaderBar              # 頂部導航（旅程切換）
├── Timeline               # 左側 Timeline
│   ├── CitySlot          # 城市槽位（可放置城市卡）
│   └── EventRail         # 事件軌道（可放置事件卡）
├── Toolbox                # 右側工具箱（卡片池）
│   ├── Tabs              # 城市卡 / 事件卡切換
│   ├── Search            # 搜尋
│   ├── Filters           # 洗牌等過濾器
│   └── Cards             # 卡片列表
├── ControlBar             # 底部控制列
├── ResultPanel            # 檢核結果面板
├── CelebrateOverlay       # 慶祝動畫 Overlay
└── Toast                  # 通知元件
```

## 樣式設計

### Tailwind 客製化

```javascript
colors: {
  brand: { 50-700 },  // 深靛藍系
  accent: { 100-600 }, // 霧金系
  surface: '#F6F1E7',
  success: '#1E6F5C',
  error: '#8B1E3F',
}
```

### 動效設計

- **拖動**：輕微縮放 (1.02) + 陰影加強
- **正確**：輕點回彈
- **錯誤**：120ms 微弱 shake
- **慶祝**：拉炮 + Overlay 淡入

## 測試策略

### 單元測試
- `answerCheck.test.ts`：檢核邏輯測試
  - 全對情況
  - 部分錯誤
  - 單一槽位檢核

### 無障礙測試
- `timeline.a11y.test.tsx`：ARIA 標籤、data-state 屬性測試

## 效能優化

1. **useMemo**：過濾卡片時避免重複計算
2. **狀態分離**：卡片池與 Timeline 狀態獨立
3. **LocalStorage 緩存**：避免重複載入

## 擴充性

### 新增旅程
1. 在 `src/data/journeys.ts` 新增 Journey 物件
2. 更新 `journeyId` 型別
3. 在 HeaderBar 新增切換按鈕

### 新增檢核模式
1. 在 `answerCheck.ts` 實作新邏輯
2. 在 store 新增對應狀態
3. 更新 ControlBar UI

## 部署建議

### 靜態網站託管
- Vercel / Netlify / GitHub Pages
- 執行 `npm run build`，部署 `dist/` 資料夾

### 環境變數
目前無需環境變數，所有資料皆為靜態

### 瀏覽器支援
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 維護指南

### 更新題庫
編輯 `src/data/journeys.ts`，遵循 `Journey` 型別定義。

### 調整樣式
主要在 `tailwind.config.js` 調整色票、字型、間距。

### 新增測試
在 `src/tests/` 新增測試檔案，命名為 `*.test.ts` 或 `*.test.tsx`。
