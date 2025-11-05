/**
 * Timeline 主元件（城市 + 事件軌道的垂直排列）
 */

import { useGameStore } from '../../store/useGameStore';
import { CitySlot } from './CitySlot';
import { EventRail } from './EventRail';

export function Timeline() {
  const { citySlots, eventPlacements, currentJourney } = useGameStore();

  return (
    <div className="space-y-6">
      {citySlots.map((slot, index) => {
        const eventsForSlot = eventPlacements.filter((ep) => ep.order === slot.order);

        // 檢查該城市是否有對應的事件（根據 correctPairs）
        const hasEvents = currentJourney.correctPairs.some((pair) => pair.order === slot.order);

        return (
          <div key={slot.order} className="space-y-2">
            {/* 城市槽位 */}
            <CitySlot slot={slot} slotIndex={index} />

            {/* 事件軌道 - 只在該城市有事件時顯示 */}
            {hasEvents && <EventRail order={slot.order} events={eventsForSlot} />}
          </div>
        );
      })}
    </div>
  );
}
