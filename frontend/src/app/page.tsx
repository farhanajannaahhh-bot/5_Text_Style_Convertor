"use client";

import React, { useState } from 'react';
import { TextArea } from '@/components/TextArea';
import { ToneSelector, ToneType, TONES } from '@/components/ToneSelector';
import { ResultCard } from '@/components/ResultCard';

type ResultsState = {
  [key in ToneType]?: { text?: string; isLoading: boolean; error?: string };
};

export default function Home() {
  const [sourceText, setSourceText] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneType>('Professional');
  const [results, setResults] = useState<ResultsState>({});

  const handleTransform = async () => {
    if (!sourceText.trim()) return;

    const tonesToFetch = selectedTone === 'View All' 
      ? TONES.filter(t => t !== 'View All') 
      : [selectedTone];

    // Initialize loading states
    setResults(prev => {
      const newStates = { ...prev };
      tonesToFetch.forEach(t => {
        newStates[t] = { isLoading: true };
      });
      return newStates;
    });

    // Fetch tones concurrently
    await Promise.all(
      tonesToFetch.map(async (tone) => {
        try {
          const response = await fetch('/api/transform', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: sourceText, tone }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch');
          }

          setResults(prev => ({
            ...prev,
            [tone]: { isLoading: false, text: data.result }
          }));
        } catch (error: any) {
          setResults(prev => ({
            ...prev,
            [tone]: { isLoading: false, error: error.message }
          }));
        }
      })
    );
  };

  const activeTones = selectedTone === 'View All' ? TONES.filter(t => t !== 'View All') : [selectedTone];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-indigo-600 drop-shadow-sm">
            Tone Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your content seamlessly into Professional, Casual, Social, or Polite styles using the power of AI.
          </p>
        </header>

        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col space-y-6">
          <TextArea 
            value={sourceText} 
            onChange={(e) => setSourceText(e.target.value)} 
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <ToneSelector
              selectedTone={selectedTone}
              onSelectTone={setSelectedTone}
            />
            
            <button
              onClick={handleTransform}
              disabled={!sourceText.trim() || Object.values(results).some(r => r?.isLoading)}
              className="w-full sm:w-auto mt-4 sm:mt-0 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Convert Text
            </button>
          </div>
        </section>

        {Object.keys(results).length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Converted Results</h2>
            <div className={`grid gap-6 ${activeTones.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
              {activeTones.map((tone) => {
                const result = results[tone];
                if (!result) return null;
                
                return (
                  <ResultCard
                    key={tone}
                    tone={tone}
                    isLoading={result.isLoading}
                    resultText={result.text}
                    error={result.error}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
