import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Sparkles, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ModelLimitationBanner } from './ModelLimitationBanner';
import { sound } from '../utils/sound';

interface Props {
  language: Language;
  onCompleteModule: (modNum: number) => void;
}

const PRESET_ATOMS = [
  { z: 1, symbol: 'H', nameVi: 'Hydrogen', nameEn: 'Hydrogen', p: 1, n: 0, shells: [1], color: '#38bdf8' },
  { z: 2, symbol: 'He', nameVi: 'Helium', nameEn: 'Helium', p: 2, n: 2, shells: [2], color: '#f59e0b' },
  { z: 6, symbol: 'C', nameVi: 'Carbon', nameEn: 'Carbon', p: 6, n: 6, shells: [2, 4], color: '#94a3b8' },
  { z: 8, symbol: 'O', nameVi: 'Oxygen', nameEn: 'Oxygen', p: 8, n: 8, shells: [2, 6], color: '#ef4444' },
  { z: 11, symbol: 'Na', nameVi: 'Sodium', nameEn: 'Sodium', p: 11, n: 12, shells: [2, 8, 1], color: '#a855f7' }
];

interface ParticleCard {
  id: string;
  nameVi: string;
  nameEn: string;
  formula: string;
  type: 'atom' | 'elemental-molecule' | 'compound-molecule';
  detailVi: string;
  detailEn: string;
}

const PRACTICE_PARTICLES: ParticleCard[] = [
  {
    id: 'p1',
    nameVi: 'Khí Helium trong bóng bay',
    nameEn: 'Helium gas in balloon',
    formula: 'He',
    type: 'atom',
    detailVi: 'Helium là khí hiếm tồn tại dưới dạng các nguyên tử riêng rẽ không liên kết.',
    detailEn: 'Helium is a noble gas existing as standalone unbonded atoms.'
  },
  {
    id: 'p2',
    nameVi: 'Khí Oxygen ta hít thở',
    nameEn: 'Oxygen gas we breathe',
    formula: 'O₂',
    type: 'elemental-molecule',
    detailVi: 'Gồm 2 nguyên tử Oxygen liên kết hóa học với nhau. Cùng 1 nguyên tố nên là phân tử đơn chất.',
    detailEn: 'Composed of 2 bonded Oxygen atoms of the same element, thus an elemental molecule.'
  },
  {
    id: 'p3',
    nameVi: 'Nước uống tinh khiết',
    nameEn: 'Pure drinking water',
    formula: 'H₂O',
    type: 'compound-molecule',
    detailVi: 'Tạo bởi 2 nguyên tố khác nhau (H và O) liên kết lại, là phân tử hợp chất.',
    detailEn: 'Formed by 2 different elements (H and O) bonded together: a compound molecule.'
  },
  {
    id: 'p4',
    nameVi: 'Khí Nitrogen trong không khí',
    nameEn: 'Nitrogen gas in air',
    formula: 'N₂',
    type: 'elemental-molecule',
    detailVi: 'Gồm 2 nguyên tử Nitrogen liên kết ba rất bền vững.',
    detailEn: 'Consists of 2 Nitrogen atoms held by a strong triple bond.'
  },
  {
    id: 'p5',
    nameVi: 'Khí Carbon dioxide (CO₂)',
    nameEn: 'Carbon dioxide gas (CO₂)',
    formula: 'CO₂',
    type: 'compound-molecule',
    detailVi: 'Gồm 1 nguyên tử C liên kết với 2 nguyên tử O, là phân tử hợp chất.',
    detailEn: '1 Carbon atom bonded to 2 Oxygen atoms: a compound molecule.'
  },
  {
    id: 'p6',
    nameVi: 'Nguyên tử Vàng tinh khiết',
    nameEn: 'Pure Gold atom',
    formula: 'Au',
    type: 'atom',
    detailVi: 'Hạt vi mô cấu tạo nên kim loại vàng nguyên chất.',
    detailEn: 'Microscopic particle building pure elemental gold.'
  }
];

export const ConceptExplorer: React.FC<Props> = ({ language, onCompleteModule }) => {
  const t = TRANSLATIONS[language];
  const [selectedAtomIndex, setSelectedAtomIndex] = useState(3); // Oxygen default
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Mini game state
  const [userClassifications, setUserClassifications] = useState<Record<string, string>>({});
  const [gameChecked, setGameChecked] = useState(false);
  const [gameScore, setGameScore] = useState<number | null>(null);

  const currentAtom = PRESET_ATOMS[selectedAtomIndex];

  // Animation loop for orbiting electrons
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectAtom = (idx: number) => {
    sound.playTap();
    setSelectedAtomIndex(idx);
  };

  const handleClassify = (cardId: string, category: string) => {
    sound.playTap();
    setUserClassifications(prev => ({ ...prev, [cardId]: category }));
    setGameChecked(false);
  };

  const checkGameAnswers = () => {
    let correct = 0;
    PRACTICE_PARTICLES.forEach(p => {
      if (userClassifications[p.id] === p.type) {
        correct++;
      }
    });
    setGameScore(correct);
    setGameChecked(true);

    if (correct === PRACTICE_PARTICLES.length) {
      sound.playCorrect();
      onCompleteModule(1);
    } else {
      sound.playTryAgain();
    }
  };

  const resetGame = () => {
    sound.playTap();
    setUserClassifications({});
    setGameChecked(false);
    setGameScore(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Bài 2 & 5 (KHTN 7)' : 'Lessons 2 & 5 (Grade 7)'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {language === 'vi' ? 'Thế giới Hạt & Cấu tạo Nguyên tử' : 'Particle World & Atomic Structure'}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {language === 'vi'
            ? 'Khám phá mô hình Rutherford-Bohr và phân biệt rõ 4 khái niệm: Nguyên tử, Nguyên tố, Phân tử, Chất.'
            : 'Explore the Rutherford-Bohr atomic model and clarify: Atom, Chemical Element, Molecule, Substance.'}
        </p>
      </div>

      <ModelLimitationBanner
        language={language}
        extraNoteVi="Mô hình Rutherford-Bohr là mô hình bán cổ điển trực quan. Trong cơ học lượng tử hiện đại, electron chuyển động dạng đám mây xác suất (orbital), không quay theo đường ray cố định."
        extraNoteEn="The Rutherford-Bohr model is an educational visualization. In modern physics, electrons occupy probability clouds (orbitals) rather than circular planar tracks."
      />

      {/* Part 1: Interactive Rutherford - Bohr Atom Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        {/* Left: Atom Visual Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl relative overflow-hidden min-h-[380px] shadow-inner">
          <div className="absolute top-3 left-4 text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {language === 'vi' ? 'Mô hình Rutherford - Bohr' : 'Rutherford - Bohr Model'}
          </div>

          {/* Atom Selector */}
          <div className="absolute top-3 right-3 flex items-center gap-1 z-20">
            {PRESET_ATOMS.map((atom, idx) => (
              <button
                key={atom.symbol}
                onClick={() => handleSelectAtom(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedAtomIndex === idx
                    ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {atom.symbol}
              </button>
            ))}
          </div>

          {/* SVG Animated Atom Model */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            <svg viewBox="-140 -140 280 280" className="w-full h-full">
              {/* Electron Shell Tracks (K, L, M) */}
              {currentAtom.shells.map((_, sIdx) => {
                const radius = 45 + sIdx * 35;
                return (
                  <g key={`shell-track-${sIdx}`}>
                    <circle
                      cx="0"
                      cy="0"
                      r={radius}
                      fill="none"
                      stroke="rgba(148, 163, 184, 0.25)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={radius + 4}
                      y="-4"
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {sIdx === 0 ? 'K (max 2)' : sIdx === 1 ? 'L (max 8)' : 'M (max 8)'}
                    </text>
                  </g>
                );
              })}

              {/* Orbiting Electrons */}
              {currentAtom.shells.map((electronCount, shellIdx) => {
                const radius = 45 + shellIdx * 35;
                const speedMultiplier = shellIdx === 0 ? 1 : shellIdx === 1 ? -0.7 : 0.5;
                const currentAngleOffset = rotationAngle * speedMultiplier;

                return Array.from({ length: electronCount }).map((_, eIdx) => {
                  const angle = (eIdx * (360 / electronCount) + currentAngleOffset) * (Math.PI / 180);
                  const ex = Math.cos(angle) * radius;
                  const ey = Math.sin(angle) * radius;

                  return (
                    <g key={`e-${shellIdx}-${eIdx}`}>
                      {/* Glow halo */}
                      <circle cx={ex} cy={ey} r="7" fill="#38bdf8" opacity="0.3" />
                      {/* Electron body */}
                      <circle cx={ex} cy={ey} r="4.5" fill="#38bdf8" />
                      {/* Negative sign */}
                      <text
                        x={ex}
                        y={ey + 2.5}
                        textAnchor="middle"
                        fill="#0f172a"
                        fontSize="7"
                        fontWeight="bold"
                      >
                        -
                      </text>
                    </g>
                  );
                });
              })}

              {/* Nucleus Glow & Core */}
              <circle cx="0" cy="0" r="26" fill="rgba(239, 68, 68, 0.15)" />
              <circle cx="0" cy="0" r="18" fill="url(#nucleusGrad)" stroke="#ef4444" strokeWidth="1.5" />

              {/* Nucleus Symbol */}
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {currentAtom.symbol}
              </text>

              <defs>
                <radialGradient id="nucleusGrad">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Animation Controls */}
          <div className="absolute bottom-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-800">
            <button
              onClick={() => {
                sound.playTap();
                setIsPlaying(!isPlaying);
              }}
              className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 focus:outline-none"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? t['action.pause'] : t['action.play']}</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => {
                sound.playTap();
                setRotationAngle(0);
              }}
              className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 focus:outline-none"
              title="Đặt lại góc"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Particle Ledger & Structure Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'vi' ? currentAtom.nameVi : currentAtom.nameEn} ({currentAtom.symbol})
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {language === 'vi' ? `Số hiệu nguyên tử Z = ${currentAtom.z}` : `Atomic Number Z = ${currentAtom.z}`}
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                {language === 'vi' ? 'Trung hòa điện' : 'Neutral'}
              </span>
            </div>

            {/* Subatomic particles count */}
            <div className="grid grid-cols-3 gap-2.5 my-4">
              <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl p-3 text-center">
                <span className="text-xs text-red-600 dark:text-red-400 font-semibold block">Proton (+)</span>
                <span className="text-xl font-black text-red-700 dark:text-red-300">{currentAtom.p}</span>
                <span className="text-[10px] text-slate-500 block">ở hạt nhân</span>
              </div>

              <div className="bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-center">
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold block">Neutron (0)</span>
                <span className="text-xl font-black text-slate-800 dark:text-slate-200">{currentAtom.n}</span>
                <span className="text-[10px] text-slate-500 block">ở hạt nhân</span>
              </div>

              <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/50 rounded-xl p-3 text-center">
                <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold block">Electron (-)</span>
                <span className="text-xl font-black text-sky-700 dark:text-sky-300">{currentAtom.z}</span>
                <span className="text-[10px] text-slate-500 block">ở lớp vỏ</span>
              </div>
            </div>

            {/* Electron Shell details */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3.5 space-y-2 text-xs border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  {language === 'vi' ? 'Các lớp electron (từ trong ra ngoài):' : 'Electron Shells (inner to outer):'}
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {currentAtom.shells.join(' - ')}
                </span>
              </div>

              <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                {language === 'vi' ? (
                  <>
                    • Lớp 1 (K): Tối đa 2 electron.
                    <br />
                    • Lớp 2 (L): Tối đa 8 electron.
                    <br />
                    • Lớp 3 (M): Tối đa 8 electron (ở lớp ngoài cùng của nguyên tố chu kỳ 3).
                  </>
                ) : (
                  <>
                    • Shell 1 (K): Maximum 2 electrons.
                    <br />
                    • Shell 2 (L): Maximum 8 electrons.
                    <br />
                    • Shell 3 (M): Maximum 8 electrons in outermost valence of period 3 elements.
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-emerald-50/50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
              {language === 'vi' ? 'Quy luật cốt lõi KHTN 7:' : 'Core Rule for Grade 7:'}
            </span>
            {language === 'vi'
              ? 'Số hạt Proton (+) luôn bằng số hạt Electron (-). Do đó nguyên tử luôn trung hòa về điện.'
              : 'Number of Protons (+) always equals Electrons (-). Thus, an atom is electrically neutral.'}
          </div>
        </div>
      </div>

      {/* Part 2: Distinguish 4 Core Concepts Matrix */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          {language === 'vi' 
            ? 'Phân biệt: Nguyên tử – Nguyên tố – Phân tử – Chất' 
            : 'Distinguish: Atom – Element – Molecule – Substance'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
              1. {t['concept.atom']}
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'vi'
                ? 'Hạt vô cùng nhỏ trung hòa về điện, gồm hạt nhân và vỏ electron quay quanh.'
                : 'Extremely tiny, electrically neutral particle consisting of a nucleus and electron cloud.'}
            </p>
            <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
              {language === 'vi' ? 'Ví dụ: 1 nguyên tử O' : 'Example: 1 atom of O'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200">
              2. {t['concept.element']}
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'vi'
                ? 'Tập hợp những nguyên tử có cùng số proton trong hạt nhân (cùng số hiệu Z).'
                : 'Collection of atoms having the exact same number of protons (same atomic number Z).'}
            </p>
            <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">
              {language === 'vi' ? 'Ví dụ: Nguyên tố Oxygen (O)' : 'Example: Oxygen element (O)'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
              3. {t['concept.molecule']}
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'vi'
                ? 'Hạt đại diện cho chất, gồm một số nguyên tử liên kết hóa học với nhau.'
                : 'Particle representing a substance, consisting of atoms chemically bonded together.'}
            </p>
            <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              {language === 'vi' ? 'Ví dụ: Phân tử O₂, phân tử H₂O' : 'Example: O₂ molecule, H₂O molecule'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">
              4. {t['concept.substance']}
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'vi'
                ? 'Dạng vật chất xác định (gồm Đơn chất từ 1 nguyên tố, Hợp chất từ 2 nguyên tố trở lên).'
                : 'Defined matter having set composition (Elemental from 1 element, Compound from 2+ elements).'}
            </p>
            <div className="text-[11px] font-semibold text-purple-700 dark:text-purple-400">
              {language === 'vi' ? 'Ví dụ: Khí oxygen, Nước cất' : 'Example: Oxygen gas, Water'}
            </div>
          </div>
        </div>
      </div>

      {/* Part 3: Interactive Classification Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {language === 'vi' ? 'Thực hành Phân loại Hạt vi mô' : 'Particle Classification Practice'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'vi'
                ? 'Chọn danh mục đúng cho từng hạt dưới đây để rèn luyện tư duy phân biệt.'
                : 'Classify each particle below into the correct scientific category.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetGame}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 focus:outline-none"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t['action.reset']}
            </button>
            <button
              onClick={checkGameAnswers}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/30 flex items-center gap-1.5 focus:outline-none"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t['action.check']}
            </button>
          </div>
        </div>

        {/* Score feedback banner */}
        {gameChecked && gameScore !== null && (
          <div className={`p-4 rounded-2xl flex items-center justify-between text-xs font-medium border ${
            gameScore === PRACTICE_PARTICLES.length 
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
              : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
          }`}>
            <span>
              {gameScore === PRACTICE_PARTICLES.length 
                ? (language === 'vi' ? 'Tuyệt vời! Bạn đã phân loại chính xác 6/6 hạt vi mô!' : 'Excellent! You correctly classified all 6/6 particles!')
                : (language === 'vi' ? `Bạn đã làm đúng ${gameScore}/${PRACTICE_PARTICLES.length} hạt. Hãy xem giải thích và thử lại câu chưa đúng nhé.` : `You got ${gameScore}/${PRACTICE_PARTICLES.length} correct. Review explanations and try again.`)}
            </span>
          </div>
        )}

        {/* Particle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRACTICE_PARTICLES.map(particle => {
            const currentChoice = userClassifications[particle.id];
            const isCorrect = gameChecked && currentChoice === particle.type;
            const isWrong = gameChecked && currentChoice && currentChoice !== particle.type;

            return (
              <div
                key={particle.id}
                className={`p-4 rounded-2xl border transition-all space-y-3 ${
                  isCorrect
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : isWrong
                    ? 'border-red-400 bg-red-50/40 dark:bg-red-950/20'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {language === 'vi' ? particle.nameVi : particle.nameEn}
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    {particle.formula}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-500 font-medium block">
                    {language === 'vi' ? 'Thuộc loại hạt nào?' : 'Classify as:'}
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { key: 'atom', labelVi: 'Nguyên tử', labelEn: 'Atom' },
                      { key: 'elemental-molecule', labelVi: 'Đơn chất', labelEn: 'Elemental' },
                      { key: 'compound-molecule', labelVi: 'Hợp chất', labelEn: 'Compound' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => handleClassify(particle.id, opt.key)}
                        className={`py-1.5 px-1 rounded-lg text-[11px] font-semibold transition-all text-center focus:outline-none ${
                          currentChoice === opt.key
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        {language === 'vi' ? opt.labelVi : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explanation on check */}
                {gameChecked && (
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                    {language === 'vi' ? particle.detailVi : particle.detailEn}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
