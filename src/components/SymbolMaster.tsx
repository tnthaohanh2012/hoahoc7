import React, { useState } from 'react';
import { 
  Binary, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  BookCheck
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { sound } from '../utils/sound';

interface Props {
  language: Language;
  onCompleteModule: (modNum: number) => void;
}

interface TestItem {
  nameVi: string;
  nameEn: string;
  correctSymbol: string;
  hintVi: string;
  hintEn: string;
  trapNoteVi: string;
  trapNoteEn: string;
}

const SYMBOL_TEST_ITEMS: TestItem[] = [
  {
    nameVi: 'Carbon',
    nameEn: 'Carbon',
    correctSymbol: 'C',
    hintVi: 'Ký hiệu 1 chữ cái in hoa.',
    hintEn: 'Single uppercase letter.',
    trapNoteVi: 'Không được viết chữ "c" thường. Chữ in hoa C là bắt buộc (EV-01).',
    trapNoteEn: 'Lowercase "c" is invalid. Uppercase C is required (EV-01).'
  },
  {
    nameVi: 'Calcium',
    nameEn: 'Calcium',
    correctSymbol: 'Ca',
    hintVi: 'Chữ C hoa, chữ a thường.',
    hintEn: 'Uppercase C, lowercase a.',
    trapNoteVi: 'Phải viết Ca để phân biệt với Carbon (C). Không viết CA hay ca (EV-02).',
    trapNoteEn: 'Must write Ca to distinguish from Carbon (C). Never CA or ca (EV-02).'
  },
  {
    nameVi: 'Sodium (Natri)',
    nameEn: 'Sodium',
    correctSymbol: 'Na',
    hintVi: 'Bắt đầu từ chữ N hoa và chữ a thường.',
    hintEn: 'Starts with capital N followed by lowercase a.',
    trapNoteVi: 'Không viết NA (sẽ bị hiểu nhầm là hợp chất của N và A) hoặc na.',
    trapNoteEn: 'Never NA (could look like a compound of N and A) or na.'
  },
  {
    nameVi: 'Nitrogen',
    nameEn: 'Nitrogen',
    correctSymbol: 'N',
    hintVi: '1 chữ cái N in hoa.',
    hintEn: 'Single capital N.',
    trapNoteVi: 'Chữ cái đầu tiên viết hoa N.',
    trapNoteEn: 'First letter capital N.'
  },
  {
    nameVi: 'Oxygen',
    nameEn: 'Oxygen',
    correctSymbol: 'O',
    hintVi: 'Chữ O in hoa.',
    hintEn: 'Capital O.',
    trapNoteVi: 'Ký hiệu là O (chữ in hoa).',
    trapNoteEn: 'Symbol is O (uppercase).'
  },
  {
    nameVi: 'Iron (Sắt)',
    nameEn: 'Iron',
    correctSymbol: 'Fe',
    hintVi: 'Bắt nguồn từ tiếng Latinh Ferrum.',
    hintEn: 'Derived from Latin Ferrum.',
    trapNoteVi: 'Chữ F hoa và chữ e thường (Fe).',
    trapNoteEn: 'Capital F and lowercase e (Fe).'
  },
  {
    nameVi: 'Copper (Đồng)',
    nameEn: 'Copper',
    correctSymbol: 'Cu',
    hintVi: 'Bắt nguồn từ tiếng Latinh Cuprum.',
    hintEn: 'Derived from Latin Cuprum.',
    trapNoteVi: 'Chữ C hoa và chữ u thường (Cu).',
    trapNoteEn: 'Capital C and lowercase u (Cu).'
  },
  {
    nameVi: 'Chlorine',
    nameEn: 'Chlorine',
    correctSymbol: 'Cl',
    hintVi: 'Chữ C hoa và chữ l (chữ L thường).',
    hintEn: 'Capital C and lowercase l.',
    trapNoteVi: 'Chữ l là L thường, không phải số 1 hay chữ I.',
    trapNoteEn: 'The second letter is lowercase l, not digit 1 or letter I.'
  }
];

export const SymbolMaster: React.FC<Props> = ({ language, onCompleteModule }) => {
  const t = TRANSLATIONS[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const currentItem = SYMBOL_TEST_ITEMS[currentIndex];

  const handleCheck = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    if (trimmed === currentItem.correctSymbol) {
      sound.playCorrect();
      setFeedback('correct');
      setFeedbackMsg(language === 'vi' ? 'Chính xác 100%! Viết hoa đúng chuẩn quy ước.' : '100% Correct! Perfect capitalization.');
      setScore(prev => prev + 1);
    } else {
      sound.playTryAgain();
      setFeedback('wrong');
      // Detect specific capitalization mistake
      if (trimmed.toUpperCase() === currentItem.correctSymbol.toUpperCase()) {
        setFeedbackMsg(
          language === 'vi'
            ? `Chữ cái bạn chọn đúng, nhưng SAI quy tắc viết hoa! Bạn gõ "${trimmed}", chuẩn phải là "${currentItem.correctSymbol}". ${currentItem.trapNoteVi}`
            : `Right letter, but WRONG capitalization! You typed "${trimmed}", standard is "${currentItem.correctSymbol}". ${currentItem.trapNoteEn}`
        );
      } else {
        setFeedbackMsg(
          language === 'vi'
            ? `Chưa chính xác. Ký hiệu chuẩn của ${currentItem.nameVi} là "${currentItem.correctSymbol}". ${currentItem.trapNoteVi}`
            : `Incorrect. Standard symbol for ${currentItem.nameEn} is "${currentItem.correctSymbol}". ${currentItem.trapNoteEn}`
        );
      }
    }
  };

  const handleNext = () => {
    sound.playTap();
    if (currentIndex < SYMBOL_TEST_ITEMS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputVal('');
      setFeedback('idle');
      setFeedbackMsg('');
      setShowHint(false);
    } else {
      // Completed all items
      sound.playFanfare();
      onCompleteModule(2);
    }
  };

  const handleRetry = () => {
    sound.playTap();
    setInputVal('');
    setFeedback('idle');
    setFeedbackMsg('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800 mb-2">
          <Binary className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Bài 3 (KHTN 7)' : 'Lesson 3 (Grade 7)'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {language === 'vi' ? 'Tên gọi & Ký hiệu Hóa học Chuẩn' : 'Chemical Names & Standard Symbols'}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {language === 'vi'
            ? 'Quy tắc viết hoa chữ cái đầu và phân biệt các cặp nguyên tố dễ gây nhầm lẫn nhất (C vs Ca, Co vs CO).'
            : 'Master IUPAC capitalization rules and avoid confusing pairs (C vs Ca, Co vs CO).'}
        </p>
      </div>

      {/* Part 1: Capitalization Rule Comparison Matrix */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookCheck className="w-5 h-5 text-blue-500" />
          {language === 'vi' ? 'Quy tắc vàng viết Ký hiệu Hóa học' : 'Golden Rules for Chemical Symbols'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider block">
              {language === 'vi' ? 'Quy tắc 1: Ký hiệu 1 chữ cái' : 'Rule 1: Single-letter symbols'}
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'vi'
                ? 'BẮT BUỘC viết bằng CHỮ IN HOA. Tuyệt đối không viết chữ thường.'
                : 'MUST be written as an UPPERCASE letter. Lowercase is strictly invalid.'}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { s: 'H', n: 'Hydrogen' },
                { s: 'C', n: 'Carbon' },
                { s: 'N', n: 'Nitrogen' },
                { s: 'O', n: 'Oxygen' },
                { s: 'P', n: 'Phosphorus' },
                { s: 'S', n: 'Sulfur' },
                { s: 'K', n: 'Potassium' }
              ].map(item => (
                <span key={item.s} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
                  {item.s} <span className="font-sans font-normal text-[10px] text-slate-500">({item.n})</span>
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-2">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block">
              {language === 'vi' ? 'Quy tắc 2: Ký hiệu 2 chữ cái' : 'Rule 2: Two-letter symbols'}
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'vi'
                ? 'Chữ cái đầu tiên IN HOA, chữ cái thứ hai BẮT BUỘC VIẾT THƯỜNG.'
                : 'First letter UPPERCASE, second letter MUST be lowercase.'}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { s: 'He', n: 'Helium' },
                { s: 'Ca', n: 'Calcium' },
                { s: 'Na', n: 'Sodium' },
                { s: 'Mg', n: 'Magnesium' },
                { s: 'Al', n: 'Aluminium' },
                { s: 'Cl', n: 'Chlorine' },
                { s: 'Fe', n: 'Iron' },
                { s: 'Cu', n: 'Copper' }
              ].map(item => (
                <span key={item.s} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-700 text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                  {item.s} <span className="font-sans font-normal text-[10px] text-slate-500">({item.n})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Famous Misconception Trap Alert */}
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 text-rose-900 dark:text-rose-200">
            <span className="font-bold block">
              {language === 'vi' ? 'Cạm bẫy kinh điển: Co vs CO khác nhau hoàn toàn!' : 'Classic Trap: Co vs CO are entirely different!'}
            </span>
            <p className="leading-relaxed">
              {language === 'vi'
                ? '• Co (chữ o thường): Là nguyên tố kim loại Cobalt (Z = 27).\n• CO (cả 2 chữ in hoa): Là hợp chất khí độc Carbon monoxide tạo bởi 1 nguyên tử C và 1 nguyên tử O. Viết sai chữ hoa/thường sẽ làm biến đổi hoàn toàn bản chất chất!'
                : '• Co (lowercase o): The metal element Cobalt (Z = 27).\n• CO (both uppercase): Toxic gas compound Carbon monoxide made of 1 C atom and 1 O atom. Case changes the entire chemistry!'}
            </p>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Symbol Typewriter Practice */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <span className="text-xs font-semibold text-slate-500">
            {language === 'vi' 
              ? `Luyện tập ký hiệu (${currentIndex + 1} / ${SYMBOL_TEST_ITEMS.length})` 
              : `Symbol Practice (${currentIndex + 1} / ${SYMBOL_TEST_ITEMS.length})`}
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {language === 'vi' ? `Điểm: ${score}` : `Score: ${score}`}
          </span>
        </div>

        <div className="text-center space-y-2 py-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {language === 'vi' ? 'Hãy gõ ký hiệu hóa học chuẩn:' : 'Type standard chemical symbol:'}
          </span>
          <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white pt-2">
            {language === 'vi' ? currentItem.nameVi : currentItem.nameEn}
          </h4>
        </div>

        {/* Input box */}
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            value={inputVal}
            maxLength={3}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleCheck();
            }}
            placeholder="Ký hiệu..."
            className="w-32 h-14 text-center font-mono text-2xl font-black rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all uppercase-first"
            autoFocus
          />

          <button
            onClick={handleCheck}
            disabled={!inputVal.trim() || feedback === 'correct'}
            className="h-14 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all focus:outline-none flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t['action.check']}</span>
          </button>
        </div>

        {/* Feedback Area */}
        {feedback !== 'idle' && (
          <div className={`p-4 rounded-2xl text-xs space-y-2 border ${
            feedback === 'correct'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {feedback === 'correct' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
              <span>{feedback === 'correct' ? t['feedback.correct'] : t['feedback.tryAgain']}</span>
            </div>
            <p className="leading-relaxed">{feedbackMsg}</p>

            <div className="pt-2 flex items-center justify-between">
              {feedback === 'wrong' && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t['action.retry']}</span>
                </button>
              )}

              {feedback === 'correct' && (
                <button
                  onClick={handleNext}
                  className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md hover:bg-emerald-500 transition-all"
                >
                  <span>{currentIndex < SYMBOL_TEST_ITEMS.length - 1 ? t['action.next'] : 'Hoàn thành chủ đề'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Hint button */}
        <div className="text-center pt-2">
          {!showHint ? (
            <button
              onClick={() => {
                sound.playTap();
                setShowHint(true);
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t['action.showHint']}</span>
            </button>
          ) : (
            <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-800 dark:text-blue-300">
              💡 {language === 'vi' ? currentItem.hintVi : currentItem.hintEn}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
