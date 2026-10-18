import React from 'react';
import { 
  Atom, 
  WifiOff, 
  Volume2, 
  VolumeX, 
  Settings, 
  Languages, 
  BookOpen
} from 'lucide-react';
import { Language, UserProgress } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { sound } from '../utils/sound';

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<Props> = ({
  language,
  onLanguageChange,
  progress,
  onUpdateProgress,
  onOpenSettings,
  onGoHome
}) => {
  const t = TRANSLATIONS[language];

  const toggleSound = () => {
    sound.playTap();
    onUpdateProgress(prev => {
      const nextSound = !prev.soundEnabled;
      sound.setEnabled(nextSound);
      return { ...prev, soundEnabled: nextSound };
    });
  };

  const handleLanguageToggle = () => {
    sound.playTap();
    const nextLang = language === 'vi' ? 'en' : 'vi';
    onLanguageChange(nextLang);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <button
          onClick={() => {
            sound.playTap();
            onGoHome();
          }}
          className="flex items-center gap-2.5 text-left group hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          title="Trang chủ / Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Atom className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                {t['app.title']}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <BookOpen className="w-3 h-3" />
                {t['curriculum.badge']}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-xs md:max-w-md">
              {t['app.subtitle']}
            </p>
          </div>
        </button>

        {/* Status badges & Quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Offline Badge */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-2xs"
            title={t['offline.tooltip']}
          >
            <WifiOff className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden lg:inline">{t['offline.badge']}</span>
            <span className="lg:hidden text-[11px]">Offline</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            title={progress.soundEnabled ? 'Tắt âm thanh / Mute' : 'Bật âm thanh / Unmute'}
            aria-label="Toggle Sound"
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 opacity-60" />
            )}
          </button>

          {/* Language Switch */}
          <button
            onClick={handleLanguageToggle}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-2xs"
            title="Đổi ngôn ngữ / Switch Language"
            aria-label="Switch Language"
          >
            <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
          </button>

          {/* Settings & Progress Modal button */}
          <button
            onClick={() => {
              sound.playTap();
              onOpenSettings();
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            title={t['nav.settings']}
            aria-label="Settings and progress"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
