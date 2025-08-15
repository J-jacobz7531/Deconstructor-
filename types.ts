export interface TechnologyDetail {
  name: string;
  category: string;
  reasoning: string;
}

export interface CodeAnalysis {
  technologies: TechnologyDetail[];
  structure: {
    components: string[];
    stateManagement: string;
  };
  logic: {
    coreFunctionality: string;
    userInteractions: string[];
  };
}
