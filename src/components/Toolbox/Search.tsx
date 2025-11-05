/**
 * 搜尋元件
 */

import { useState, useEffect } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Search({ value, onChange, placeholder = '搜尋...' }: SearchProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-10 rounded-lg border-2 border-brand-100
                 bg-white text-body text-on
                 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                 transition-colors"
        aria-label="搜尋卡片"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2
                   w-5 h-5 rounded-full bg-on/10 hover:bg-on/20
                   flex items-center justify-center text-on/60
                   transition-colors"
          aria-label="清除搜尋"
        >
          ×
        </button>
      )}
      {!localValue && (
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}
    </div>
  );
}
