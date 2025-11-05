# 保羅傳道之旅測驗

互動式學習遊戲，幫助使用者透過拖放操作，掌握保羅兩次傳道之旅的順序與重要事件。

## 特色

- **無評分設計**：專注於學習過程，按「對答案」時只標示對/錯（綠框/紅框），全對觸發慶祝動畫
- **兩套完整題庫**：第一次傳道（徒 13–14）、第二次傳道（徒 15:36–18:22）
- **高質感介面**：內斂配色、Noto 字體、流暢動效
- **完整無障礙支援**：WCAG 2.2 AA、鍵盤操作、螢幕閱讀器友善
- **資料來源**：《使徒行傳》中文和合本（繁體＋現代標點），稱呼使用「神」

## 快速開始

### 前置需求

- Node.js 18+
- pnpm（或 npm/yarn）

### 安裝

```bash
pnpm install
```

### 開發

```bash
pnpm dev
```

瀏覽器開啟 http://localhost:5173

### 建置

```bash
pnpm build
```

輸出至 `dist/` 資料夾

### 測試

```bash
# 執行測試
pnpm test

# 測試 UI
pnpm test:ui
```

## 使用說明

### 基本操作

1. **選擇旅程**：頂部切換「第一次傳道」或「第二次傳道」
2. **拖放卡片**：
   - 從右側卡片池拖曳「城市卡」到左側 Timeline 的對應槽位
   - 拖曳「事件卡」到城市下方的事件軌道
3. **檢核答案**：
   - 點擊「對答案」：正確顯示綠框，錯誤顯示紅框
   - 全對時觸發拉炮慶祝動畫與祝賀詞
4. **其他功能**：
   - 「顯示答案」：自動排好正確順序（會跳出確認）
   - 「重置」：清除所有已放置的卡片
   - 「立即檢核模式」：放下卡片即時顯示對/錯（不顯示分數）

### 鍵盤操作

- `Tab`：移動焦點
- `Space`：拖起卡片
- `方向鍵`：移動卡片
- `Enter`：放下卡片

## 技術架構

### 核心技術

- **框架**：React 18 + TypeScript + Vite
- **樣式**：Tailwind CSS
- **拖放**：@dnd-kit（支援鍵盤與觸控）
- **狀態管理**：Zustand
- **動效**：Framer Motion
- **慶祝動畫**：canvas-confetti
- **驗證**：Zod
- **測試**：Vitest + Testing Library

### 專案結構

```
src/
├── components/
│   ├── Cards/              # 卡片元件（城市、事件）
│   ├── Timeline/           # Timeline 元件（槽位、軌道）
│   ├── Toolbox/            # 工具箱（卡片池、搜尋、分頁）
│   ├── ControlBar.tsx      # 控制列（對答案、顯示答案、重置）
│   ├── ResultPanel.tsx     # 結果面板（正確/錯誤摘要）
│   ├── CelebrateOverlay.tsx # 慶祝動畫
│   ├── Toast.tsx           # 通知元件
│   └── HeaderBar.tsx       # 頂部導航
├── store/
│   └── useGameStore.ts     # Zustand 全域狀態
├── utils/
│   ├── answerCheck.ts      # 答案檢核（只回傳對/錯，不計分）
│   ├── persist.ts          # LocalStorage 持久化
│   ├── shuffle.ts          # 洗牌工具
│   └── a11y.ts             # 無障礙輔助
├── data/
│   └── journeys.ts         # 題庫資料（J1、J2）
├── types.ts                # TypeScript 型別定義
└── tests/                  # 測試檔案
```

## 設計準則

### 視覺設計

- **配色**：
  - Primary：`#1C274C`（深靛藍）
  - Secondary：`#B38B59`（霧金）
  - Surface：`#F6F1E7`（象牙白）
  - Success：`#1E6F5C`、Error：`#8B1E3F`
- **字體**：Noto Serif TC（標題）、Noto Sans（正文）
- **圓角**：16px
- **陰影**：`0 6px 24px rgba(0,0,0,0.08)`

### 無障礙設計

- **色彩對比**：達 WCAG 2.2 AA 標準
- **ARIA 標籤**：所有互動元素具備 `aria-label`
- **鍵盤導航**：完整支援 Tab、Space、方向鍵、Enter
- **Live Region**：拖放操作自動宣告
- **觸控目標**：≥ 44×44 px

### 響應式設計

- **桌面**：左右分欄（Timeline + 卡片池）
- **平板/手機**：上下排列，卡片池可捲動

## 資料來源

所有題庫與用詞皆依據：

- **聖經版本**：《使徒行傳》中文和合本（繁體＋現代標點）
- **神學用詞**：稱呼使用「神」而非「上帝」
- **章節引用**：徒 13–14（第一次）、徒 15:36–18:22（第二次）

## 授權

MIT License

## 貢獻

歡迎提交 Issue 或 Pull Request！

---

**技術支援**：如有問題，請參考 [Vite 文件](https://vitejs.dev/) 與 [React 文件](https://react.dev/)
