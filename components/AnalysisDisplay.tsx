import React from 'react';
import type { CodeAnalysis } from '../types';

interface AnalysisDisplayProps {
  analysis: CodeAnalysis;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
    <h3 className="text-xl font-bold text-yellow-400 mb-4">{title}</h3>
    <div className="text-gray-300 space-y-3">{children}</div>
  </div>
);

const TechList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div>
    <h4 className="font-semibold text-gray-200">{title}</h4>
    {items && items.length > 0 ? (
      <ul className="mt-2 space-y-1 font-roboto-mono text-sm list-disc list-inside">
        {items.map((item, i) => (
          <li key={i}><span className="text-lime-300">{item}</span></li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-sm font-roboto-mono">Not specified.</p>
    )}
  </div>
);

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const { technologies, structure, logic } = analysis;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InfoCard title="Technologies">
        <TechList title="Frontend" items={technologies.frontend} />
        <TechList title="Styling" items={technologies.styling} />
        <TechList title="Animation" items={technologies.animation} />
        <TechList title="Backend" items={technologies.backend} />
      </InfoCard>

      <InfoCard title="Structure">
        <div>
          <h4 className="font-semibold text-gray-200">State Management</h4>
          <p className="mt-1 font-roboto-mono text-sm text-lime-300">{structure.stateManagement || 'N/A'}</p>
        </div>
        <TechList title="Key Components" items={structure.components} />
      </InfoCard>

      <InfoCard title="Application Logic">
        <div>
          <h4 className="font-semibold text-gray-200">Core Functionality</h4>
          <p className="mt-1 text-gray-400">{logic.coreFunctionality || 'N/A'}</p>
        </div>
        <TechList title="User Interactions" items={logic.userInteractions} />
      </InfoCard>
    </div>
  );
};
