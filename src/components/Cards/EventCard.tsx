/**
 * 事件卡片元件
 */

import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import type { Event, CardState, VerseRef } from '../../types';
import { formatVerseRefs, createAriaLabel, getStateLabel } from '../../utils/a11y';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
  state?: CardState;
  isDraggable?: boolean;
  className?: string;
}

export function EventCard({ event, state = 'idle', isDraggable = true, className = '' }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `event-${event.key}`,
    data: { type: 'event', eventKey: event.key },
    disabled: !isDraggable,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const stateClasses = {
    idle: '',
    correct: 'bg-success/10 border-success/50 ring-2 ring-success/40',
    wrong: 'bg-error/5 border-error/40 ring-2 ring-error/40 animate-shake',
  };

  const ariaLabel = createAriaLabel([
    event.title,
    formatVerseRefs(event.verses),
    event.note,
    getStateLabel(state),
  ]);

  const formatVerseShort = (verse: VerseRef) => {
    return verse.vers ? `徒${verse.chap}:${verse.vers}` : `徒${verse.chap}`;
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`
        relative bg-accent-100 rounded-card shadow-card border-2 border-accent-400
        p-3
        hover:shadow-card-hover transition-shadow
        ${isDragging ? 'opacity-50 scale-105' : ''}
        ${stateClasses[state]}
        ${className}
      `}
      aria-label={ariaLabel}
      data-state={state}
      whileHover={isDraggable ? { scale: 1.02 } : undefined}
      whileTap={isDraggable ? { scale: 0.98 } : undefined}
    >
      {/* 拖動手柄 - 只在主要內容區域啟用拖動 */}
      <div
        className={`flex flex-col gap-2 ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
        {...(isDraggable ? { ...attributes, ...listeners } : {})}
      >
        {/* 狀態標籤 */}
        {state !== 'idle' && (
          <div className="flex justify-end">
            <span className={`text-caption font-semibold ${state === 'correct' ? 'text-success' : 'text-error'}`}>
              {state === 'correct' ? '✓ 正確' : '✗ 錯誤'}
            </span>
          </div>
        )}

        {/* 事件標題 */}
        <h4 className="font-serif text-body text-brand-700 font-semibold leading-tight">
          {event.title}
        </h4>

        {/* 經文引用 */}
        <div className="text-caption text-on/60">
          {event.verses.map((v, i) => (
            <span key={i} className="inline-block mr-2">
              {formatVerseShort(v)}
            </span>
          ))}
        </div>

      </div>

      {/* 提示按鈕 - 放在拖動區域外 */}
      {event.note && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="mt-2 text-caption text-accent-600 hover:text-accent-400 text-left transition-colors cursor-pointer"
          aria-expanded={isExpanded}
        >
          {isExpanded ? '▼' : '▶'} 提示
        </button>
      )}

      {isExpanded && event.note && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-caption text-on/80 pt-2 border-t border-accent-400 mt-2"
        >
          {event.note}
        </motion.div>
      )}
    </motion.div>
  );
}
