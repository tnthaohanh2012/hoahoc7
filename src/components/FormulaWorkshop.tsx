import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  HelpCircle,
  SplitSquareVertical,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { VALENCY_PRACTICE_ITEMS, SUB_VS_COEFF_DATA } from '../data/valencyRules';
import { sound } from '../utils/sound';

interface Props {
  language: Language;
  onCompleteModule: (modNum: number) => void;
}

export const FormulaWorkshop: React.FC<Props> = ({ language, onCompleteModule }) => {
  const t = TRANSLATIONS[language];
  const [selectedItemId, setSelectedItemId] = useState<string>('ev-07-nacl');
  const [activeTab, setActiveTab] = useState<'stepper' | 'subVsCoeff'>('stepper');
  const [currentStep, setCurrentStep] = useState<number>(4); // 1, 2, 3, 4
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [coeffMode, setCoeffMode] = useState<'single' | 'double'>('single');

  const currentItem = VALENCY_PRACTICE_ITEMS.find(i => i.id === selectedItemId) || VALENCY_PRACTICE_ITEMS[0];

  const handleSelectItem = (id: string) => {
    sound.playTap();
    setSelectedItemId(id);
    setCurrentStep(4);
    if (!completedItems.includes(id)) {
      const next = [...completedItems, id];
      setCompletedItems(next);
      if (next.length >= 3) {
        onCompleteModule(4);
      }
    }
  };

  const getRomanValency = (v: number) => {
    switch (v) {
      case 1: return 'I';
      case 2: return 'II';
      case 3: return 'III';
      case 4: return 'IV';
      case 5: return 'V';
      case 6: return 'VI';
      default: return `${v}`;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200 dark:border-purple-800 mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Bài 7 (KHTN 7)' : 'Lesson 7 (Grade 7)'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t['formula.title']}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t['formula.subtitle']}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('stepper');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'stepper'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'vi' ? 'Quy tắc chéo lập công thức (EV-05, EV-06, EV-07)' : 'Cross-over Formula Builder'}</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('subVsCoeff');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'subVsCoeff'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <SplitSquareVertical className="w-4 h-4" />
          <span>{language === 'vi' ? 'Phân biệt Chỉ số vs Hệ số (EV-08: H₂O vs 2H₂O)' : 'Subscripts vs Coefficients (EV-08)'}</span>
        </button>
      </div>

      {activeTab === 'stepper' ? (
        /* Stepper Workshop */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Practice Selector List */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t['formula.choosePair']}
            </h4>

            <div className="space-y-2">
              {VALENCY_PRACTICE_ITEMS.map(item => {
                const isSelected = item.id === selectedItemId;
                const isDone = completedItems.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between focus:outline-none ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50/60 dark:bg-purple-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {item.element1.symbol} + {item.element2.symbol}
                        </span>
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {getRomanValency(item.element1.valency)} & {getRomanValency(item.element2.valency)}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {language === 'vi' 
                          ? `${item.element1.nameVi} và ${item.element2.nameVi}` 
                          : `${item.element1.nameEn} & ${item.element2.nameEn}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-purple-700 dark:text-purple-300 text-sm">
                        {item.expectedFormula}
                      </span>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold block text-slate-700 dark:text-slate-300 mb-0.5">
                {language === 'vi' ? 'Quy tắc hóa trị:' : 'Valency Cross-over Principle:'}
              </span>
              {language === 'vi'
                ? 'Trong công thức AxBy, tích của chỉ số và hóa trị của nguyên tố này bằng tích của chỉ số và hóa trị của nguyên tố kia: a × x = b × y'
                : 'In formula AxBy, the product of subscript and valency of one element equals that of the other: a × x = b × y'}
            </div>
          </div>

          {/* Right: Step-by-Step Cross-over Visualizer */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                  {language === 'vi' ? 'Ví dụ kiểm chuẩn' : 'Curriculum Benchmark'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {language === 'vi' 
                    ? `Lập công thức hóa học giữa ${currentItem.element1.nameVi} và ${currentItem.element2.nameVi}` 
                    : `Construct Formula: ${currentItem.element1.nameEn} & ${currentItem.element2.nameEn}`}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">{t['formula.result']}</span>
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
                  {currentItem.expectedFormula}
                </span>
              </div>
            </div>

            {/* Visual Reasoning Steps */}
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                    {t['formula.step1']}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {currentItem.element1.symbol} ({getRomanValency(currentItem.element1.valency)}) • {currentItem.element2.symbol} ({getRomanValency(currentItem.element2.valency)})
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-4 text-center">
                  <div className="font-mono text-lg font-bold">
                    <span className="text-purple-600 dark:text-purple-400">{currentItem.element1.symbol}</span>
                    <sub className="text-xs text-slate-400">x</sub>
                    <sup className="text-xs text-red-500 ml-0.5 font-bold">({getRomanValency(currentItem.element1.valency)})</sup>
                  </div>
                  <span className="text-slate-400 font-bold">+</span>
                  <div className="font-mono text-lg font-bold">
                    <span className="text-teal-600 dark:text-teal-400">{currentItem.element2.symbol}</span>
                    <sub className="text-xs text-slate-400">y</sub>
                    <sup className="text-xs text-red-500 ml-0.5 font-bold">({getRomanValency(currentItem.element2.valency)})</sup>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider block">
                  {t['formula.step2']}
                </span>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-4 font-mono text-sm sm:text-base font-bold">
                  <span>x × {getRomanValency(currentItem.element1.valency)} = y × {getRomanValency(currentItem.element2.valency)}</span>
                  <ArrowRight className="w-4 h-4 text-purple-500" />
                  <span className="bg-purple-100 dark:bg-purple-950 px-3 py-1 rounded-lg text-purple-800 dark:text-purple-200">
                    x / y = {getRomanValency(currentItem.element2.valency)} / {getRomanValency(currentItem.element1.valency)} = {currentItem.ratioRaw}
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider block">
                  {t['formula.step3']}
                </span>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs sm:text-sm font-medium">
                  <span>
                    {language === 'vi' ? 'Tỉ lệ tối giản:' : 'Lowest whole-number ratio:'}
                  </span>
                  <span className="font-mono font-bold text-base bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-lg text-emerald-800 dark:text-emerald-300">
                    x / y = {currentItem.ratioSimplified}
                  </span>
                </div>
                {currentItem.specialRuleVi && (
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                    ⚠️ {language === 'vi' ? currentItem.specialRuleVi : currentItem.specialRuleEn}
                  </p>
                )}
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
                <span className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider block">
                  {t['formula.step4']}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {language === 'vi' ? currentItem.explanationVi : currentItem.explanationEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Subscript vs Coefficient Visualizer (EV-08) */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              {language === 'vi' ? 'Giải mã hiểu lầm số 1 của học sinh Lớp 7' : 'Debunking Grade 7 Common Misconception #1'}
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t['formula.subVsCoeffTitle']}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'vi'
                ? 'Nhiều bạn thường nhầm lẫn giữa chỉ số dưới và hệ số đứng trước. Hãy quan sát mô hình trực quan dưới đây!'
                : 'Learners frequently confuse subscript and coefficient. Compare the visual particle count below!'}
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playTap();
                setCoeffMode('single');
              }}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all focus:outline-none ${
                coeffMode === 'single'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              H₂O (Một phân tử)
            </button>

            <button
              onClick={() => {
                sound.playTap();
                setCoeffMode('double');
              }}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all focus:outline-none ${
                coeffMode === 'double'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              2H₂O (Hai phân tử)
            </button>
          </div>

          {/* Molecule Visual Stage */}
          <div className="p-8 bg-slate-950 rounded-3xl flex flex-col items-center justify-center min-h-[260px] text-white space-y-4">
            <div className="flex items-center justify-center gap-10 flex-wrap">
              {/* Molecule 1 */}
              <div className="flex flex-col items-center gap-2 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <svg viewBox="-60 -40 120 80" className="w-36 h-24">
                  {/* Bonds */}
                  <line x1="0" y1="-10" x2="-35" y2="20" stroke="#94a3b8" strokeWidth="4" />
                  <line x1="0" y1="-10" x2="35" y2="20" stroke="#94a3b8" strokeWidth="4" />
                  {/* Central Oxygen */}
                  <circle cx="0" cy="-10" r="18" fill="#ef4444" />
                  <text x="0" y="-6" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">O</text>
                  {/* Hydrogens */}
                  <circle cx="-35" cy="20" r="13" fill="#e2e8f0" />
                  <text x="-35" y="24" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">H</text>
                  <circle cx="35" cy="20" r="13" fill="#e2e8f0" />
                  <text x="35" y="24" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">H</text>
                </svg>
                <span className="text-[11px] font-mono font-bold text-slate-400">Phân tử nước #1</span>
              </div>

              {/* Molecule 2 (only in double mode) */}
              {coeffMode === 'double' && (
                <div className="flex flex-col items-center gap-2 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 animate-fade-in">
                  <svg viewBox="-60 -40 120 80" className="w-36 h-24">
                    {/* Bonds */}
                    <line x1="0" y1="-10" x2="-35" y2="20" stroke="#94a3b8" strokeWidth="4" />
                    <line x1="0" y1="-10" x2="35" y2="20" stroke="#94a3b8" strokeWidth="4" />
                    {/* Central Oxygen */}
                    <circle cx="0" cy="-10" r="18" fill="#ef4444" />
                    <text x="0" y="-6" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">O</text>
                    {/* Hydrogens */}
                    <circle cx="-35" cy="20" r="13" fill="#e2e8f0" />
                    <text x="-35" y="24" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">H</text>
                    <circle cx="35" cy="20" r="13" fill="#e2e8f0" />
                    <text x="35" y="24" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">H</text>
                  </svg>
                  <span className="text-[11px] font-mono font-bold text-slate-400">Phân tử nước #2</span>
                </div>
              )}
            </div>

            {/* Live Count Tally */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="px-3 py-1 bg-slate-800 rounded-lg text-emerald-400 font-bold">
                {coeffMode === 'single' ? '1 Phân tử (Molecules: 1)' : '2 Phân tử riêng biệt (Molecules: 2)'}
              </span>
              <span className="px-3 py-1 bg-slate-800 rounded-lg text-sky-300 font-bold">
                {coeffMode === 'single' ? 'Tổng: 2 H, 1 O' : 'Tổng: 4 H, 2 O'}
              </span>
            </div>
          </div>

          {/* Explanation Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {coeffMode === 'single' 
                ? (language === 'vi' ? SUB_VS_COEFF_DATA.singleVi.title : SUB_VS_COEFF_DATA.singleEn.title)
                : (language === 'vi' ? SUB_VS_COEFF_DATA.doubleVi.title : SUB_VS_COEFF_DATA.doubleEn.title)}
            </h4>
            <p className="leading-relaxed">
              • <strong>{language === 'vi' ? 'Ý nghĩa chỉ số (Subscript 2):' : 'Subscript 2 meaning:'}</strong>{' '}
              {coeffMode === 'single' 
                ? (language === 'vi' ? SUB_VS_COEFF_DATA.singleVi.subscriptMeaning : SUB_VS_COEFF_DATA.singleEn.subscriptMeaning)
                : (language === 'vi' ? SUB_VS_COEFF_DATA.doubleVi.subscriptMeaning : SUB_VS_COEFF_DATA.doubleEn.subscriptMeaning)}
            </p>
            <p className="leading-relaxed">
              • <strong>{language === 'vi' ? 'Ý nghĩa hệ số (Coefficient):' : 'Coefficient meaning:'}</strong>{' '}
              {coeffMode === 'single' 
                ? (language === 'vi' ? SUB_VS_COEFF_DATA.singleVi.coefficientMeaning : SUB_VS_COEFF_DATA.singleEn.coefficientMeaning)
                : (language === 'vi' ? SUB_VS_COEFF_DATA.doubleVi.coefficientMeaning : SUB_VS_COEFF_DATA.doubleEn.coefficientMeaning)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
