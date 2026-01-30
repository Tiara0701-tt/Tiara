export interface CocktailProfile {
  name: string;
  nameEn: string;
  mappingReason: string;
  base: string;
  ingredients: string;
  method: string;
  abv: string;
  tasteProfile: string;
  visual: string;
  smell: string;
  taste: string;
  vibe: string;
  bartenderWhisper: string;
}

export interface AnalysisResult {
  faceReading: string;
  socialMask: {
    description: string;
    traits: string[];
  };
  trueEssence: {
    description: string;
    traits: string[];
  };
  outerCocktail: CocktailProfile;
  innerCocktail: CocktailProfile;
  closingMessage: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}