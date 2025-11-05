/**
 * 分頁元件（切換城市 / 事件卡片）
 */

import { motion } from 'framer-motion';

interface TabsProps {
  activeTab: 'city' | 'event';
  onTabChange: (tab: 'city' | 'event') => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div
      className="flex gap-2 bg-brand-50 p-1 rounded-lg"
      role="tablist"
      aria-label="卡片類型"
    >
      <button
        role="tab"
        aria-selected={activeTab === 'city'}
        aria-controls="city-cards"
        onClick={() => onTabChange('city')}
        className={`
          relative px-4 py-2 rounded-md text-body font-medium transition-colors
          ${activeTab === 'city' ? 'text-brand-700' : 'text-on/60 hover:text-on'}
        `}
      >
        {activeTab === 'city' && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-white rounded-md shadow-sm"
            transition={{ type: 'spring', duration: 0.3 }}
          />
        )}
        <span className="relative z-10">地點</span>
      </button>

      <button
        role="tab"
        aria-selected={activeTab === 'event'}
        aria-controls="event-cards"
        onClick={() => onTabChange('event')}
        className={`
          relative px-4 py-2 rounded-md text-body font-medium transition-colors
          ${activeTab === 'event' ? 'text-brand-700' : 'text-on/60 hover:text-on'}
        `}
      >
        {activeTab === 'event' && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-white rounded-md shadow-sm"
            transition={{ type: 'spring', duration: 0.3 }}
          />
        )}
        <span className="relative z-10">事件</span>
      </button>
    </div>
  );
}
