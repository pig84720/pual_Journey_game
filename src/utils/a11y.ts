/**
 * 無障礙輔助工具
 */

import type { VerseRef } from '../types';

/**
 * 格式化經文引用（螢幕閱讀器友善）
 */
export function formatVerseRef(verse: VerseRef): string {
  if (verse.vers) {
    return `使徒行傳 第${verse.chap}章 第${verse.vers}節`;
  }
  return `使徒行傳 第${verse.chap}章`;
}

/**
 * 格式化多個經文引用
 */
export function formatVerseRefs(verses: VerseRef[]): string {
  return verses.map(formatVerseRef).join('、');
}

/**
 * 宣告 live region 更新（用於拖放操作）
 */
export function announceLiveRegion(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const liveRegion = document.getElementById('live-region');
  if (!liveRegion) {
    // 如果不存在，建立 live region
    const newLiveRegion = document.createElement('div');
    newLiveRegion.id = 'live-region';
    newLiveRegion.className = 'sr-only';
    newLiveRegion.setAttribute('aria-live', priority);
    newLiveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(newLiveRegion);
    setTimeout(() => {
      newLiveRegion.textContent = message;
    }, 100);
  } else {
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;
  }
}

/**
 * 產生唯一 ID（用於 ARIA 標籤）
 */
let idCounter = 0;
export function generateId(prefix: string): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * 檢查是否使用鍵盤操作
 */
export function isKeyboardEvent(event: Event): event is KeyboardEvent {
  return event.type.startsWith('key');
}

/**
 * 取得聚焦管理工具
 */
export function manageFocus() {
  let previousFocus: HTMLElement | null = null;

  return {
    /**
     * 儲存當前焦點
     */
    save() {
      previousFocus = document.activeElement as HTMLElement;
    },

    /**
     * 恢復先前焦點
     */
    restore() {
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    },

    /**
     * 設定焦點到元素
     */
    set(element: HTMLElement | null) {
      if (element && typeof element.focus === 'function') {
        element.focus();
      }
    },

    /**
     * 聚焦到第一個錯誤
     */
    focusFirstError() {
      const firstError = document.querySelector('[data-state="wrong"]') as HTMLElement;
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
}

/**
 * 取得螢幕閱讀器友善的狀態描述
 */
export function getStateLabel(state: 'idle' | 'correct' | 'wrong'): string {
  switch (state) {
    case 'correct':
      return '正確';
    case 'wrong':
      return '錯誤';
    default:
      return '';
  }
}

/**
 * 建立 ARIA 標籤
 */
export function createAriaLabel(parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join('，');
}
