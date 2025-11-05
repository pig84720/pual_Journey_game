/**
 * 工具箱主元件（卡片池）
 */

import { useState, useMemo, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Tabs } from './Tabs';
import { CityCard } from '../Cards/CityCard';
import { EventCard } from '../Cards/EventCard';
import { shuffle } from '../../utils/shuffle';

export function Toolbox() {
  const {
    currentJourney,
    citySlots,
    eventPlacements,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'city' | 'event'>('city');

  // 使用 useState 儲存隨機順序，初始化時就洗牌
  const [shuffledCities, setShuffledCities] = useState<typeof currentJourney.steps>(() =>
    shuffle([...currentJourney.steps])
  );
  const [shuffledEvents, setShuffledEvents] = useState<typeof currentJourney.events>(() =>
    shuffle([...currentJourney.events])
  );

  // 當旅程改變時，重新洗牌一次
  useEffect(() => {
    setShuffledCities(shuffle([...currentJourney.steps]));
    setShuffledEvents(shuffle([...currentJourney.events]));
  }, [currentJourney.id]);

  // 過濾可用卡片（已放置的不顯示）
  const usedCitiesKeys = useMemo(
    () => citySlots.map((s) => s.cityKey).filter(Boolean),
    [citySlots]
  );

  const usedEventsKeys = useMemo(
    () => eventPlacements.map((ep) => ep.eventKey),
    [eventPlacements]
  );

  const filteredCities = useMemo(() => {
    const usedSet = new Set(usedCitiesKeys);

    return shuffledCities.filter((step) => !usedSet.has(step.id));
  }, [shuffledCities, usedCitiesKeys]);

  const filteredEvents = useMemo(() => {
    const usedSet = new Set(usedEventsKeys);

    return shuffledEvents.filter((event) => !usedSet.has(event.key));
  }, [shuffledEvents, usedEventsKeys]);

  return (
    <div className="h-full flex flex-col bg-surface border-l border-brand-100">
      {/* 頭部 */}
      <div className="p-4 space-y-3 border-b border-brand-100">
        {/* 分頁 */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 卡片列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {activeTab === 'city' && (
            <div role="tabpanel" id="city-cards" aria-label="城市卡片">
              {filteredCities.length > 0 ? (
                filteredCities.map((step) => (
                  <div key={step.id} className="mb-3">
                    <CityCard step={step} isDraggable={true} />
                  </div>
                ))
              ) : (
                <p className="text-center text-on/40 py-8">
                  所有地點卡片已放置
                </p>
              )}
            </div>
          )}

          {activeTab === 'event' && (
            <div role="tabpanel" id="event-cards" aria-label="事件卡片">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div key={event.key} className="mb-3">
                    <EventCard event={event} isDraggable={true} />
                  </div>
                ))
              ) : (
                <p className="text-center text-on/40 py-8">
                  所有事件卡片已放置
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
