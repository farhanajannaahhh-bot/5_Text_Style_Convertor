import React from 'react';

export const TONES = ['Professional', 'Casual', 'Social', 'Polite', 'View All'] as const;
export type ToneType = typeof TONES[number];

interface ToneSelectorProps {
  selectedTone: ToneType;
  onSelectTone: (tone: ToneType) => void;
  disabled?: boolean;
}

export function ToneSelector({ selectedTone, onSelectTone, disabled = false }: ToneSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-3">
        Select Desired Tone
      </label>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button
            key={tone}
            type="button"
            onClick={() => onSelectTone(tone)}
            disabled={disabled}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTone === tone
                ? 'bg-primary text-white shadow-md transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {tone}
          </button>
        ))}
      </div>
    </div>
  );
}
