
import React, { useState, useCallback } from 'react';
import { URLInputForm } from './components/URLInputForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CodeIcon } from './components/icons/CodeIcon';
import { analyzeUrl } from './services/geminiService';
import type { CodeAnalysis } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('https://cornrevolution.resn.global/');
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!url) {
      setError('Please enter a URL to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeUrl(url);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the URL. The AI may be busy, or an error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <CodeIcon className="w-12 h-12 text-yellow-400"/>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">
              Code Deconstructor
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Enter a URL to get an AI-powered breakdown of its likely tech stack, structure, and implementation.
          </p>
        </header>

        <main>
          <URLInputForm 
            url={url}
            setUrl={setUrl}
            onAnalyze={handleAnalysis}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {analysis && !isLoading && (
             <div className="mt-8 animate-fade-in">
                <AnalysisDisplay analysis={analysis} />
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
