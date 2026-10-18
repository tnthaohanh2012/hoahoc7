/**
 * Chemistry Explorer (Khám phá Hóa học 7)
 * Interactive Chemistry Simulation for Grade 7 (KHTN 7 Kết nối tri thức, Lessons 2-7)
 * 100% Offline-first, Bilingual (Vietnamese / English), Fully client-side React SPA
 */
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, ScreenId } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { ConceptExplorer } from './components/ConceptExplorer';
import { SymbolMaster } from './components/SymbolMaster';
import { PeriodicTable } from './components/PeriodicTable';
import { FormulaWorkshop } from './components/FormulaWorkshop';
import { MoleculeStudio } from './components/MoleculeStudio';
import { MissionRunner } from './components/MissionRunner';
import { ProgressSettingsModal } from './components/ProgressSettingsModal';
import { Language, UserProgress } from './types';
import { loadProgress, saveProgress, clearProgress } from './utils/storage';
import { sound } from './utils/sound';
import { TRANSLATIONS } from './data/translations';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync sound setting on mount
  useEffect(() => {
    sound.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Persist progress changes
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  };

  const handleLanguageChange = (newLang: Language) => {
    updateProgress(prev => ({
      ...prev,
      preferredLanguage: newLang
    }));
  };

  const handleCompleteModule = (modNum: number, score?: number) => {
    updateProgress(prev => {
      const completed = prev.completedModules.includes(modNum)
        ? prev.completedModules
        : [...prev.completedModules, modNum];

      const scores = { ...prev.moduleScores };
      if (score !== undefined) {
        scores[modNum] = score;
      }

      return {
        ...prev,
        completedModules: completed,
        moduleScores: scores
      };
    });

    const lang = progress.preferredLanguage;
    const msg = lang === 'vi' 
      ? `🎉 Chúc mừng! Bạn đã hoàn thành Bài học số ${modNum}!` 
      : `🎉 Congratulations! You completed Module ${modNum}!`;
    
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResetProgress = () => {
    const cleared = clearProgress();
    setProgress(cleared);
    setActiveScreen('home');
    const msg = progress.preferredLanguage === 'vi' 
      ? 'Đã đặt lại toàn bộ tiến độ học tập.' 
      : 'All learning progress has been reset.';
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const language = progress.preferredLanguage;
  const t = TRANSLATIONS[language];

  // Font size class mapping
  const fontSizeClass = {
    normal: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  }[progress.fontSize || 'normal'];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-emerald-500 selection:text-white ${fontSizeClass}`}>
      {/* App Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        progress={progress}
        onUpdateProgress={updateProgress}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoHome={() => setActiveScreen('home')}
      />

      {/* Navigation Bar */}
      <Navigation
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        language={language}
        progress={progress}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce border border-emerald-400">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* View Routing */}
        {activeScreen === 'home' && (
          <HomeView
            language={language}
            progress={progress}
            onSelectScreen={setActiveScreen}
          />
        )}

        {activeScreen === 'module1' && (
          <ConceptExplorer
            language={language}
            onCompleteModule={handleCompleteModule}
          />
        )}

        {activeScreen === 'module2' && (
          <SymbolMaster
            language={language}
            onCompleteModule={handleCompleteModule}
          />
        )}

        {activeScreen === 'module3' && (
          <PeriodicTable
            language={language}
            onCompleteModule={handleCompleteModule}
          />
        )}

        {activeScreen === 'module4' && (
          <FormulaWorkshop
            language={language}
            onCompleteModule={handleCompleteModule}
          />
        )}

        {activeScreen === 'module5' && (
          <MoleculeStudio
            language={language}
            onCompleteModule={handleCompleteModule}
          />
        )}

        {activeScreen === 'module6' && (
          <MissionRunner
            language={language}
            onCompleteModule={handleCompleteModule}
          />
        )}
      </main>

      {/* Settings & Progress Modal */}
      <ProgressSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        onLanguageChange={handleLanguageChange}
        progress={progress}
        onUpdateProgress={updateProgress}
        onResetProgress={handleResetProgress}
      />

      {/* Offline Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Chemistry Explorer – {language === 'vi' ? 'Khoa học Tự nhiên 7 (Kết nối tri thức)' : 'Grade 7 Natural Sciences'} • {t['offline.badge']}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {t['nav.settings']}
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveScreen('home')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {t['nav.home']}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
