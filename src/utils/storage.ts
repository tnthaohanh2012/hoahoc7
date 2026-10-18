/**
 * Local Storage Persistence Manager for Chemistry Explorer
 * Resilient against private browsing restrictions and corrupted JSON.
 */
import { UserProgress } from '../types';

const STORAGE_KEY = 'chemistry_explorer_grade7_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  moduleScores: {},
  completedActivities: [],
  quizAnswers: {},
  lastVisitedModule: 1,
  totalTimeSeconds: 0,
  preferredLanguage: 'vi',
  soundEnabled: true,
  reducedMotion: false,
  fontSize: 'normal',
  updatedAt: new Date().toISOString()
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : [],
      moduleScores: parsed.moduleScores && typeof parsed.moduleScores === 'object' ? parsed.moduleScores : {},
      completedActivities: Array.isArray(parsed.completedActivities) ? parsed.completedActivities : []
    };
  } catch (e) {
    console.warn('Failed to load local progress, resetting to defaults:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const dataToSave: UserProgress = {
      ...progress,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (e) {
    console.warn('LocalStorage unavailable or quota exceeded:', e);
    return false;
  }
}

export function clearProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove localStorage key:', e);
    }
  }
  return { ...DEFAULT_PROGRESS, updatedAt: new Date().toISOString() };
}
