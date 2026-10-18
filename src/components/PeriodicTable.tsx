import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Layers, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  ExternalLink,
  Flame,
  Atom
} from 'lucide-react';
import { Language, ElementData, ElementCategory } from '../types';
import { ELEMENTS_DATA } from '../data/elements';
import { TRANSLATIONS } from '../data/translations';
import { sound } from '../utils/sound';

interface Props {
  language: Language;
  onCompleteModule: (modNum: number) => void;
}

export const PeriodicTable: React.FC<Props> = ({ language, onCompleteModule }) => {
  const t = TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ElementCategory | 'all'>('all');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [inspectedCount, setInspectedCount] = useState(0);

  const filteredElements = useMemo(() => {
    return ELEMENTS_DATA.filter(elem => {
      const matchesCategory = categoryFilter === 'all' || elem.category === categoryFilter;
      const term = searchTerm.trim().toLowerCase();
      if (!term) return matchesCategory;

      const matchesSymbol = elem.symbol.toLowerCase().includes(term);
      const matchesNameVi = elem.nameVi.toLowerCase().includes(term);
      const matchesNameEn = elem.nameEn.toLowerCase().includes(term);
      const matchesZ = elem.atomicNumber.toString() === term;

      return matchesCategory && (matchesSymbol || matchesNameVi || matchesNameEn || matchesZ);
    });
  }, [searchTerm, categoryFilter]);

  const handleTileClick = (elem: ElementData) => {
    sound.playTap();
    setSelectedElement(elem);
    setInspectedCount(prev => {
      const next = prev + 1;
      if (next >= 3) {
        onCompleteModule(3);
      }
      return next;
    });
  };

  const getCategoryColor = (cat: ElementCategory) => {
    switch (cat) {
      case 'metal':
        return 'border-amber-400 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 hover:border-amber-500';
      case 'nonmetal':
        return 'border-sky-400 bg-sky-50/70 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 hover:border-sky-500';
      case 'noble-gas':
        return 'border-purple-400 bg-purple-50/70 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 hover:border-purple-500';
      case 'metalloid':
        return 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 hover:border-emerald-500';
      default:
        return 'border-slate-300 bg-slate-50 text-slate-800';
    }
  };

  const getCategoryBadge = (cat: ElementCategory) => {
    switch (cat) {
      case 'metal':
        return language === 'vi' ? 'Kim loại' : 'Metal';
      case 'nonmetal':
        return language === 'vi' ? 'Phi kim' : 'Non-metal';
      case 'noble-gas':
        return language === 'vi' ? 'Khí hiếm' : 'Noble Gas';
      case 'metalloid':
        return language === 'vi' ? 'Á kim' : 'Metalloid';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Bài 4 (KHTN 7)' : 'Lesson 4 (Grade 7)'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t['periodic.title']}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t['periodic.subtitle']} • {t['periodic.clickHint']}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={t['periodic.searchPlaceholder']}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all' as const, labelVi: t['action.filterAll'], labelEn: t['action.filterAll'] },
            { id: 'metal' as const, labelVi: t['action.filterMetals'], labelEn: t['action.filterMetals'], color: 'bg-amber-500' },
            { id: 'nonmetal' as const, labelVi: t['action.filterNonmetals'], labelEn: t['action.filterNonmetals'], color: 'bg-sky-500' },
            { id: 'noble-gas' as const, labelVi: t['action.filterNoble'], labelEn: t['action.filterNoble'], color: 'bg-purple-500' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                sound.playTap();
                setCategoryFilter(f.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus:outline-none flex items-center gap-1.5 ${
                categoryFilter === f.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {f.color && <span className={`w-2 h-2 rounded-full ${f.color}`} />}
              <span>{language === 'vi' ? f.labelVi : f.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State (EV-09 check) */}
      {filteredElements.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200">
            {t['periodic.empty']}
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'vi'
              ? `Không có nguyên tố nào khớp với "${searchTerm}". Hãy thử tìm kiếm H, C, O, Fe hoặc bấm 'Tất cả'.`
              : `No elements match "${searchTerm}". Try searching for H, C, O, Fe or clear filters.`}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
          >
            {t['action.reset']}
          </button>
        </div>
      ) : (
        /* Element Tiles Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredElements.map(elem => {
            const isSelected = selectedElement?.atomicNumber === elem.atomicNumber;

            return (
              <button
                key={elem.symbol}
                onClick={() => handleTileClick(elem)}
                className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-102 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 relative flex flex-col justify-between h-28 ${getCategoryColor(
                  elem.category
                )} ${isSelected ? 'ring-2 ring-emerald-500 shadow-md' : ''}`}
              >
                {/* Top: Atomic Number & Mass */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold opacity-80">#{elem.atomicNumber}</span>
                  <span className="opacity-70">{elem.relativeAtomicMass}</span>
                </div>

                {/* Center: Big Symbol */}
                <div className="text-center py-1">
                  <span className="text-2xl font-black tracking-tight">{elem.symbol}</span>
                </div>

                {/* Bottom: Name & Group/Period */}
                <div className="text-center">
                  <span className="text-[11px] font-bold block truncate">
                    {language === 'vi' ? elem.nameVi : elem.nameEn}
                  </span>
                  <span className="text-[9px] opacity-75 font-mono block">
                    {elem.group} • P{elem.period}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Element Detail Drawer / Inspector */}
      {selectedElement && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex flex-col items-center justify-center shadow-lg">
                <span className="text-xs font-mono font-bold opacity-80">#{selectedElement.atomicNumber}</span>
                <span className="text-2xl font-black">{selectedElement.symbol}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {language === 'vi' ? selectedElement.nameVi : selectedElement.nameEn}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {getCategoryBadge(selectedElement.category)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  IUPAC: {selectedElement.nameEn} • {language === 'vi' ? 'Tiếng Việt:' : 'Vietnamese:'} {selectedElement.nameVi}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedElement(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              title={t['action.close']}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 font-medium block">{t['concept.atomicNumber']}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                Z = {selectedElement.atomicNumber}
              </span>
              <span className="text-[10px] text-slate-400 block">{selectedElement.atomicNumber} proton / {selectedElement.atomicNumber} electron</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 font-medium block">{t['concept.mass']}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                {selectedElement.relativeAtomicMass} amu
              </span>
              <span className="text-[10px] text-slate-400 block">{language === 'vi' ? 'Theo thang chuẩn KHTN 7' : 'Standard Grade 7 amu'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 font-medium block">{t['concept.period']} & {t['concept.group']}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                {selectedElement.group} / P{selectedElement.period}
              </span>
              <span className="text-[10px] text-slate-400 block">{selectedElement.electronShells.length} {language === 'vi' ? 'lớp electron' : 'shells'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 font-medium block">{t['concept.valency']} (KHTN 7)</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {selectedElement.valenciesForGrade7.join(', ')}
              </span>
              <span className="text-[10px] text-slate-400 block">{language === 'vi' ? 'Hóa trị thường gặp' : 'Common valencies'}</span>
            </div>
          </div>

          {/* Bohr shell visual and everyday use */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
            <div className="md:col-span-5 p-4 bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-center text-white">
              <span className="text-xs text-slate-400 font-medium mb-2">
                {t['periodic.electrons']}
              </span>
              <div className="flex items-center gap-2 font-mono text-emerald-400 text-sm font-bold bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                <Layers className="w-4 h-4" />
                <span>{selectedElement.electronShells.join(' - ')}</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-2">
                {language === 'vi'
                  ? `Có ${selectedElement.electronShells.length} lớp electron quay quanh hạt nhân.`
                  : `Has ${selectedElement.electronShells.length} electron shells around nucleus.`}
              </span>
            </div>

            <div className="md:col-span-7 p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1">
                  {language === 'vi' ? 'Ứng dụng trong đời sống thực tế:' : 'Everyday Real-world Applications:'}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {language === 'vi' ? selectedElement.applicationsVi : selectedElement.applicationsEn}
                </p>
              </div>
              <div className="pt-2 text-[10px] text-slate-400 font-mono">
                Nguồn: {selectedElement.sourceRef}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
