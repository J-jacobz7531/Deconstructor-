import React from 'react';
import type { CodeAnalysis, TechnologyDetail } from '../types';

interface AnalysisDisplayProps {
  analysis: CodeAnalysis;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
    <h3 className="text-xl font-bold text-yellow-400 mb-4">{title}</h3>
    <div className="text-gray-300 space-y-4">{children}</div>
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

const DetailedTechDisplay: React.FC<{ technologies: TechnologyDetail[] }> = ({ technologies }) => {
  const groupedByCategory = technologies.reduce((acc, tech) => {
    const category = tech.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, TechnologyDetail[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedByCategory).map(([category, techs]) => (
        <div key={category}>
          <h4 className="font-bold text-gray-200 mb-3">{category}</h4>
          <div className="space-y-4">
            {techs.map((tech, i) => (
              <div key={i} className="pl-4 border-l-2 border-gray-700">
                <p className="font-roboto-mono font-bold text-lime-300">{tech.name}</p>
                <p className="text-gray-400 text-sm mt-1">{tech.reasoning}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const { technologies, structure, logic } = analysis;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InfoCard title="Technologies">
        <DetailedTechDisplay technologies={technologies} />
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
