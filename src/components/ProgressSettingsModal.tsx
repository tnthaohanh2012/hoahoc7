import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Languages, 
  Volume2, 
  VolumeX, 
  Eye, 
  Type, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  HardDrive
} from 'lucide-react';
import { Language, UserProgress } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { sound } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onResetProgress: () => void;
}

export const ProgressSettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  progress,
  onUpdateProgress,
  onResetProgress
}) => {
  const t = TRANSLATIONS[language];
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleToggleSound = () => {
    sound.playTap();
    onUpdateProgress(prev => {
      const next = !prev.soundEnabled;
      sound.setEnabled(next);
      return { ...prev, soundEnabled: next };
    });
  };

  const handleToggleReducedMotion = () => {
    sound.playTap();
    onUpdateProgress(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const handleFontSizeChange = (size: 'normal' | 'large' | 'xlarge') => {
    sound.playTap();
    onUpdateProgress(prev => ({ ...prev, fontSize: size }));
  };

  const handleConfirmReset = () => {
    sound.playTap();
    onResetProgress();
    setShowConfirmReset(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t['settings.title']}
            </h3>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Learning Progress Summary */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200">
            <span>{language === 'vi' ? 'Tiến độ học tập hiện tại' : 'Learning Progress'}</span>
            <span className="font-mono">{progress.completedModules.length} / 6 {language === 'vi' ? 'chủ đề' : 'modules'}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {[1, 2, 3, 4, 5, 6].map(num => {
              const isDone = progress.completedModules.includes(num);
              return (
                <span
                  key={num}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <span>{language === 'vi' ? `Bài ${num}` : `Mod ${num}`}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3" />}
                </span>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t['settings.offlineStatus']}</span>
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Languages className="w-4 h-4 text-emerald-500" />
            <span>{t['settings.language']}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                sound.playTap();
                onLanguageChange('vi');
              }}
              className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                language === 'vi'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 shadow-2xs'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              Tiếng Việt (Mặc định SGK)
            </button>

            <button
              onClick={() => {
                sound.playTap();
                onLanguageChange('en');
              }}
              className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                language === 'en'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 shadow-2xs'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              English (IUPAC Standard)
            </button>
          </div>
        </div>

        {/* Audio Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              {t['settings.sound']}
            </span>
            <span className="text-[11px] text-slate-500 block">
              {language === 'vi' ? 'Âm thanh thông báo đúng/sai và hoàn thành bài tập' : 'Audio cues for correct answers and feedback'}
            </span>
          </div>

          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl transition-all ${
              progress.soundEnabled
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
            }`}
          >
            {progress.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
          <div className="space-y-0.5 pr-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              {t['settings.reducedMotion']}
            </span>
            <span className="text-[11px] text-slate-500 block">
              {language === 'vi' ? 'Tắt chuyển động quay liên tục trong mô hình nguyên tử' : 'Disable continuous electron rotation'}
            </span>
          </div>

          <button
            onClick={handleToggleReducedMotion}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              progress.reducedMotion
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {progress.reducedMotion ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Font Size Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Type className="w-4 h-4 text-emerald-500" />
            <span>{t['settings.fontSize']}</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'normal' as const, label: t['settings.fontSizeNormal'] },
              { id: 'large' as const, label: t['settings.fontSizeLarge'] },
              { id: 'xlarge' as const, label: t['settings.fontSizeXLarge'] }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => handleFontSizeChange(f.id)}
                className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                  progress.fontSize === f.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Progress Section (Double Confirmation) */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          {!showConfirmReset ? (
            <button
              onClick={() => {
                sound.playTap();
                setShowConfirmReset(true);
              }}
              className="w-full py-2.5 rounded-xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t['action.resetProgress']}</span>
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 space-y-3 animate-fade-in">
              <div className="flex items-start gap-2 text-rose-900 dark:text-rose-200 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {t['settings.resetWarning']}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleConfirmReset}
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  {t['action.confirmReset']}
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-white dark:hover:bg-slate-700 transition-colors"
                >
                  {t['action.cancel']}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
