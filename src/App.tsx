/**
 * 主應用元件
 */

import { DndContext, DragEndEvent, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { HeaderBar } from './components/HeaderBar';
import { Timeline } from './components/Timeline/Timeline';
import { Toolbox } from './components/Toolbox/Toolbox';
import { ControlBar } from './components/ControlBar';
import { ResultPanel } from './components/ResultPanel';
import { CelebrateOverlay } from './components/CelebrateOverlay';
import { Toast } from './components/Toast';
import { useGameStore } from './store/useGameStore';
import { announceLiveRegion } from './utils/a11y';

function App() {
  const { placeCityCard, placeEventCard } = useGameStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      announceLiveRegion('放置已取消');
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    // 城市卡片 → 城市槽位
    if (activeData?.type === 'city' && overData?.type === 'city-slot') {
      const cityKey = activeData.cityKey as string;
      const slotIndex = overData.slotIndex as number;
      placeCityCard(slotIndex, cityKey);
      announceLiveRegion(`已放置城市卡片 ${cityKey} 到槽位 ${slotIndex + 1}`, 'assertive');
    }

    // 事件卡片 → 事件軌道
    if (activeData?.type === 'event' && overData?.type === 'event-rail') {
      const eventKey = activeData.eventKey as string;
      const order = overData.order as number;
      placeEventCard(order, eventKey);
      announceLiveRegion(`已放置事件卡片到城市 ${order}`, 'assertive');
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="h-screen bg-surface flex flex-col overflow-hidden">
        {/* 頂部導航 */}
        <div className="flex-shrink-0">
          <HeaderBar />
        </div>

        {/* 主要內容區 */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Timeline 區域 */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <Timeline />
            </div>
          </main>

          {/* 工具箱（卡片池） - 右側固定區域 */}
          <aside className="w-full lg:w-96 flex-shrink-0">
            <Toolbox />
          </aside>
        </div>

        {/* 控制列 */}
        <div className="flex-shrink-0">
          <ControlBar />
        </div>

        {/* 結果面板 */}
        <ResultPanel />

        {/* 慶祝動畫 */}
        <CelebrateOverlay />

        {/* Toast 通知 */}
        <Toast />

        {/* Live Region（無障礙） */}
        <div
          id="live-region"
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        />
      </div>
    </DndContext>
  );
}

export default App;
