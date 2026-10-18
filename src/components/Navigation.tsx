import React from 'react';
import { 
  Home, 
  Sparkles, 
  Binary, 
  Grid3X3, 
  Calculator, 
  Orbit, 
  Award 
} from 'lucide-react';
import { Language, UserProgress } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { sound } from '../utils/sound';

export type ScreenId = 'home' | 'module1' | 'module2' | 'module3' | 'module4' | 'module5' | 'module6';

interface Props {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  language: Language;
  progress: UserProgress;
}

export const Navigation: React.FC<Props> = ({
  activeScreen,
  onSelectScreen,
  language,
  progress
}) => {
  const t = TRANSLATIONS[language];

  const tabs: { id: ScreenId; labelVi: string; labelEn: string; icon: React.ElementType; moduleNum?: number }[] = [
    { id: 'home', labelVi: t['nav.home'], labelEn: t['nav.home'], icon: Home },
    { id: 'module1', labelVi: 'Hạt & Chất', labelEn: 'Particles & Matter', icon: Sparkles, moduleNum: 1 },
    { id: 'module2', labelVi: 'Ký hiệu hóa học', labelEn: 'Symbols', icon: Binary, moduleNum: 2 },
    { id: 'module3', labelVi: 'Bảng tuần hoàn', labelEn: 'Periodic Table', icon: Grid3X3, moduleNum: 3 },
    { id: 'module4', labelVi: 'Xưởng công thức', labelEn: 'Formula Workshop', icon: Calculator, moduleNum: 4 },
    { id: 'module5', labelVi: 'Studio liên kết', labelEn: 'Bond Studio', icon: Orbit, moduleNum: 5 },
    { id: 'module6', labelVi: 'Thử thách & Quiz', labelEn: 'Missions & Quiz', icon: Award, moduleNum: 6 },
  ];

  const handleSelect = (id: ScreenId) => {
    sound.playTap();
    onSelectScreen(id);
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 shadow-2xs overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-2 min-w-max py-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeScreen === tab.id;
          const isCompleted = tab.moduleNum ? progress.completedModules.includes(tab.moduleNum) : false;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 relative ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
              <span>{language === 'vi' ? tab.labelVi : tab.labelEn}</span>
              {isCompleted && (
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-200' : 'bg-emerald-500'}`} title="Đã hoàn thành / Completed" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
