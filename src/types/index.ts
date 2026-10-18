export type Language = 'vi' | 'en';

export type ElementCategory = 'metal' | 'nonmetal' | 'noble-gas' | 'metalloid';

export interface ElementData {
  atomicNumber: number; // Z
  symbol: string;
  nameVi: string;
  nameEn: string;
  group: string; // e.g. "IA", "IIA", "IVA", "VIIIA"
  period: number; // 1, 2, 3, 4
  relativeAtomicMass: number; // e.g. 1, 12, 16, 23, 35.5
  category: ElementCategory;
  valenciesForGrade7: number[]; // e.g. [1], [2, 3], [4]
  electronShells: number[]; // e.g. [2, 8, 1] for Na
  stateAtRoomTemp: 'solid' | 'liquid' | 'gas';
  applicationsVi: string;
  applicationsEn: string;
  sourceRef: string;
}

export type SubstanceType = 'elemental-metal' | 'elemental-nonmetal' | 'elemental-noble' | 'compound-covalent' | 'compound-ionic';

export interface SubstanceData {
  id: string;
  formula: string;
  nameVi: string;
  nameEn: string;
  type: SubstanceType;
  bondingType: 'covalent' | 'ionic' | 'metallic' | 'none';
  molecularMass: number;
  composition: { symbol: string; count: number }[];
  descriptionVi: string;
  descriptionEn: string;
  bondsCount?: number;
  bondTypeDisplay?: 'single' | 'double' | 'triple' | 'ionic';
  structure3D: {
    atoms: { symbol: string; x: number; y: number; z: number; color: string; radius: number }[];
    bonds: { from: number; to: number; order: 1 | 2 | 3 }[];
  };
  sourceRef: string;
}

export interface ValencyPracticeItem {
  id: string;
  element1: { symbol: string; nameVi: string; nameEn: string; valency: number };
  element2: { symbol: string; nameVi: string; nameEn: string; valency: number };
  expectedFormula: string;
  ratioRaw: string; // e.g. "2/2" or "1/2" or "2/3"
  ratioSimplified: string; // e.g. "1/1" or "1/2" or "2/3"
  explanationVi: string;
  explanationEn: string;
  specialRuleVi?: string; // e.g. "Chỉ số 1 không ghi"
  specialRuleEn?: string;
  similarExampleId?: string;
}

export interface Question {
  id: string;
  module: 1 | 2 | 3 | 4 | 5 | 6;
  type: 'single-choice' | 'matching' | 'formula-builder' | 'classification';
  promptVi: string;
  promptEn: string;
  options?: { id: string; textVi: string; textEn: string }[];
  correctAnswer: string | string[];
  explanationVi: string;
  explanationEn: string;
  hintVi: string;
  hintEn: string;
  similarExampleVi: string;
  similarExampleEn: string;
  misconceptionAlertVi?: string;
  misconceptionAlertEn?: string;
}

export interface UserProgress {
  completedModules: number[];
  moduleScores: Record<number, number>;
  completedActivities: string[];
  quizAnswers: Record<string, string>;
  lastVisitedModule: number;
  totalTimeSeconds: number;
  preferredLanguage: Language;
  soundEnabled: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  updatedAt: string;
}
