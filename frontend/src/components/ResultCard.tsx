import React from 'react';
import { Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { ToneType } from './ToneSelector';

interface ResultCardProps {
  tone: string;
  resultText?: string;
  isLoading?: boolean;
  error?: string;
}

export function ResultCard({ tone, resultText, isLoading = false, error }: ResultCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{tone}</h3>
        {resultText && !isLoading && !error && (
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-sm"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col min-h-[120px]">
        {isLoading ? (
          <div className="flex-grow flex items-center justify-center text-gray-400">
             <Loader2 className="w-6 h-6 animate-spin" />
             <span className="ml-2 text-sm animate-pulse">Generating...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm whitespace-pre-wrap">{error}</div>
        ) : resultText ? (
          <div className="text-gray-700 whitespace-pre-wrap">{resultText}</div>
        ) : (
          <div className="text-gray-400 text-sm italic flex-grow flex items-center justify-center">
            Waiting for input...
          </div>
        )}
      </div>
    </div>
  );
}
