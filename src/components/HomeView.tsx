import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Binary, 
  Grid3X3, 
  Calculator, 
  Orbit, 
  Award, 
  Clock, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { Language, UserProgress } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ScreenId } from './Navigation';
import { sound } from '../utils/sound';

interface Props {
  language: Language;
  progress: UserProgress;
  onSelectScreen: (screen: ScreenId) => void;
}

export const HomeView: React.FC<Props> = ({
  language,
  progress,
  onSelectScreen
}) => {
  const t = TRANSLATIONS[language];

  const modules = [
    {
      id: 'module1' as ScreenId,
      num: 1,
      title: t['module1.title'],
      desc: t['module1.desc'],
      icon: Sparkles,
      color: 'from-amber-500 to-orange-500',
      badge: language === 'vi' ? 'Bài 2 & 5' : 'Lessons 2 & 5',
      time: '3-4 min'
    },
    {
      id: 'module2' as ScreenId,
      num: 2,
      title: t['module2.title'],
      desc: t['module2.desc'],
      icon: Binary,
      color: 'from-blue-500 to-cyan-500',
      badge: language === 'vi' ? 'Bài 3' : 'Lesson 3',
      time: '3 min'
    },
    {
      id: 'module3' as ScreenId,
      num: 3,
      title: t['module3.title'],
      desc: t['module3.desc'],
      icon: Grid3X3,
      color: 'from-emerald-500 to-teal-500',
      badge: language === 'vi' ? 'Bài 4' : 'Lesson 4',
      time: '4 min'
    },
    {
      id: 'module4' as ScreenId,
      num: 4,
      title: t['module4.title'],
      desc: t['module4.desc'],
      icon: Calculator,
      color: 'from-purple-500 to-indigo-500',
      badge: language === 'vi' ? 'Bài 7' : 'Lesson 7',
      time: '5 min'
    },
    {
      id: 'module5' as ScreenId,
      num: 5,
      title: t['module5.title'],
      desc: t['module5.desc'],
      icon: Orbit,
      color: 'from-rose-500 to-pink-500',
      badge: language === 'vi' ? 'Bài 6' : 'Lesson 6',
      time: '4 min'
    },
    {
      id: 'module6' as ScreenId,
      num: 6,
      title: t['module6.title'],
      desc: t['module6.desc'],
      icon: Award,
      color: 'from-yellow-500 to-amber-600',
      badge: language === 'vi' ? 'Đánh giá' : 'Assessment',
      time: '3-5 min'
    }
  ];

  const completedCount = progress.completedModules.length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  // Next suggested module
  const nextModuleNum = [1, 2, 3, 4, 5, 6].find(n => !progress.completedModules.includes(n)) || 1;
  const nextModuleId = `module${nextModuleNum}` as ScreenId;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-800/40">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t['curriculum.badge']}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Lộ trình 15 - 20 phút' : '15 - 20 min session'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'vi' 
              ? 'Khám phá Thế giới Hóa học Lớp 7 Trực quan & Tương tác'
              : 'Interactive Visual Chemistry Explorer for Grade 7'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {language === 'vi'
              ? 'Mô phỏng sinh động từ cấu tạo nguyên tử Rutherford-Bohr, bảng tuần hoàn, quy tắc chéo lập công thức hóa học cho đến mô hình phân tử 2D/3D xoay chiều.'
              : 'Interactive models from Rutherford-Bohr atomic structure and the periodic table to valency cross-over formula workshops and rotatable 3D molecular structures.'}
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playTap();
                onSelectScreen(nextModuleId);
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-102 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>
                {completedCount === 0 
                  ? t['action.start'] 
                  : (language === 'vi' ? `Tiếp tục: Bài ${nextModuleNum}` : `Continue: Module ${nextModuleNum}`)}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playTap();
                onSelectScreen('module3');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <Grid3X3 className="w-4 h-4" />
              <span>{t['nav.periodicTable']}</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-300 font-medium mb-1.5">
              <span>{language === 'vi' ? 'Tiến độ học tập toàn khóa:' : 'Overall Course Progress:'}</span>
              <span className="font-bold text-emerald-300">{completedCount}/6 {language === 'vi' ? 'chủ đề' : 'modules'} ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Module Grid (Screen B) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'vi' ? 'Các Chủ đề Bài học (KHTN 7)' : 'Learning Modules (Grade 7)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {language === 'vi' 
                ? 'Học theo lộ trình đề xuất hoặc tự do lựa chọn chủ đề bạn muốn luyện tập.'
                : 'Follow the recommended pathway or freely pick any topic to practice.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {modules.map(mod => {
            const Icon = mod.icon;
            const isCompleted = progress.completedModules.includes(mod.num);

            return (
              <div
                key={mod.id}
                onClick={() => {
                  sound.playTap();
                  onSelectScreen(mod.id);
                }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {mod.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{mod.time}</span>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-1" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 mb-2.5">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${mod.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {mod.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>{isCompleted ? (language === 'vi' ? 'Học lại' : 'Review') : t['action.explore']}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Safety & Pedagogy Note */}
      <section className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 rounded-2xl p-5 text-xs text-slate-600 dark:text-slate-300 space-y-2">
        <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          {language === 'vi' ? 'Mục tiêu & Chuẩn kiến thức KHTN 7' : 'Curriculum Objectives & Standards'}
        </h4>
        <p className="leading-relaxed">
          {language === 'vi'
            ? 'Ứng dụng bám sát nội dung Bài 2 đến Bài 7 môn Khoa học Tự nhiên 7 (Bộ sách Kết nối tri thức với cuộc sống). Mọi dữ liệu về nguyên tố, hóa trị, ký hiệu và công thức đều được đối chiếu theo danh mục chuẩn IUPAC và SGK hiện hành. Khi kết thúc, bạn có thể thực hiện bài Quiz để nhận chứng nhận hoàn thành.'
            : 'Aligned strictly with Lessons 2 through 7 of Grade 7 Natural Sciences. All element data, valencies, symbols, and formulas are verified against current textbook references and IUPAC standards. You can complete the final mission quiz to earn your mastery certificate.'}
        </p>
      </section>
    </div>
  );
};
