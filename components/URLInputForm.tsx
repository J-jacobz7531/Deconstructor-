
import React from 'react';

interface URLInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const URLInputForm: React.FC<URLInputFormProps> = ({ url, setUrl, onAnalyze, isLoading }) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-lg">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="w-full sm:flex-grow bg-gray-800 text-gray-200 px-4 py-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-300"
        disabled={isLoading}
      />
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-300 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 whitespace-nowrap"
      >
        {isLoading ? 'Analyzing...' : 'Deconstruct'}
      </button>
    </form>
  );
};
