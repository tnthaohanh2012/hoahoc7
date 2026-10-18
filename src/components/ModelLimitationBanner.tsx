import React from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  language: Language;
  extraNoteVi?: string;
  extraNoteEn?: string;
}

export const ModelLimitationBanner: React.FC<Props> = ({ language, extraNoteVi, extraNoteEn }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 my-3 shadow-xs">
      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-medium leading-relaxed">{t['model.limitations']}</p>
        {(extraNoteVi || extraNoteEn) && (
          <p className="text-amber-800 dark:text-amber-300 opacity-90">
            <Info className="inline w-3 h-3 mr-1" />
            {language === 'vi' ? extraNoteVi : extraNoteEn}
          </p>
        )}
      </div>
    </div>
  );
};
