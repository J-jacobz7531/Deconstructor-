export interface CodeAnalysis {
  technologies: {
    frontend: string[];
    backend: string[];
    styling: string[];
    animation: string[];
  };
  structure: {
    components: string[];
    stateManagement: string;
  };
  logic: {
    coreFunctionality: string;
    userInteractions: string[];
  };
}
