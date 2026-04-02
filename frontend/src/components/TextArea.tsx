import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function TextArea({ value, onChange, placeholder = "Enter your text here...", disabled = false }: TextAreaProps) {
  return (
    <div className="w-full">
      <label htmlFor="source-text" className="block text-sm font-medium text-foreground mb-2">
        Source Text
      </label>
      <textarea
        id="source-text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full min-h-[150px] p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all duration-200 resize-y shadow-sm"
      />
    </div>
  );
}
