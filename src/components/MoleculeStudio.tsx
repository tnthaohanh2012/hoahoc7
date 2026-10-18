import React, { useState, useEffect, useRef } from 'react';
import { 
  Orbit, 
  Rotate3d, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Info, 
  Layers, 
  Sparkles,
  Move
} from 'lucide-react';
import { Language } from '../types';
import { SUBSTANCES_DATA } from '../data/substances';
import { TRANSLATIONS } from '../data/translations';
import { ModelLimitationBanner } from './ModelLimitationBanner';
import { sound } from '../utils/sound';

interface Props {
  language: Language;
  onCompleteModule: (modNum: number) => void;
}

export const MoleculeStudio: React.FC<Props> = ({ language, onCompleteModule }) => {
  const t = TRANSLATIONS[language];
  const [selectedSubstanceId, setSelectedSubstanceId] = useState<string>('h2o');
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [isVibrating, setIsVibrating] = useState<boolean>(true);
  const [rotX, setRotX] = useState<number>(15);
  const [rotY, setRotY] = useState<number>(30);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastMousePos, setLastMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [exploredIds, setExploredIds] = useState<string[]>(['h2o']);
  const [vibrationPhase, setVibrationPhase] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentSubstance = SUBSTANCES_DATA.find(s => s.id === selectedSubstanceId) || SUBSTANCES_DATA[0];

  // Vibration loop
  useEffect(() => {
    if (!isVibrating) return;
    const interval = setInterval(() => {
      setVibrationPhase(prev => (prev + 0.15) % (Math.PI * 2));
    }, 40);
    return () => clearInterval(interval);
  }, [isVibrating]);

  const handleSelectSubstance = (id: string) => {
    sound.playTap();
    setSelectedSubstanceId(id);
    if (!exploredIds.includes(id)) {
      const next = [...exploredIds, id];
      setExploredIds(next);
      if (next.length >= 3) {
        onCompleteModule(5);
      }
    }
  };

  // Mouse / Touch Drag handlers for 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setRotY(prev => prev + dx * 0.8);
    setRotX(prev => Math.max(-80, Math.min(80, prev - dy * 0.8)));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePos.x;
    const dy = e.touches[0].clientY - lastMousePos.y;
    setRotY(prev => prev + dx * 0.8);
    setRotX(prev => Math.max(-80, Math.min(80, prev - dy * 0.8)));
    setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const resetAngle = () => {
    sound.playTap();
    setRotX(15);
    setRotY(30);
  };

  // Compute 3D projection of atoms and bonds
  const radX = (rotX * Math.PI) / 180;
  const radY = (rotY * Math.PI) / 180;

  const vibDelta = Math.sin(vibrationPhase) * 2;

  const projectedAtoms = currentSubstance.structure3D.atoms.map((atom, index) => {
    // Add tiny vibration to outer atoms
    const vx = index > 0 ? atom.x + vibDelta * (index % 2 === 0 ? 1 : -1) : atom.x;
    const vy = index > 0 ? atom.y + vibDelta * 0.7 : atom.y;
    const vz = atom.z;

    // Rotate Y
    const x1 = vx * Math.cos(radY) + vz * Math.sin(radY);
    const z1 = -vx * Math.sin(radY) + vz * Math.cos(radY);

    // Rotate X
    const y2 = vy * Math.cos(radX) - z1 * Math.sin(radX);
    const z2 = vy * Math.sin(radX) + z1 * Math.cos(radX);

    // Perspective factor
    const scale = 250 / (250 + z2);

    return {
      ...atom,
      px: x1 * scale,
      py: y2 * scale,
      pz: z2,
      scale,
      effectiveRadius: atom.radius * scale
    };
  });

  // Sort atoms and bonds by z-depth for correct painter's algorithm
  const sortedRenderItems = [
    // Bonds
    ...currentSubstance.structure3D.bonds.map(b => {
      const a1 = projectedAtoms[b.from];
      const a2 = projectedAtoms[b.to];
      const avgZ = (a1.pz + a2.pz) / 2;
      return {
        type: 'bond' as const,
        z: avgZ - 1, // slightly behind atoms
        bond: b,
        p1: a1,
        p2: a2
      };
    }),
    // Atoms
    ...projectedAtoms.map(a => ({
      type: 'atom' as const,
      z: a.pz,
      atom: a
    }))
  ].sort((a, b) => a.z - b.z);

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-rose-800 mb-2">
          <Orbit className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Bài 6 (KHTN 7)' : 'Lesson 6 (Grade 7)'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t['studio.title']}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t['studio.subtitle']}
        </p>
      </div>

      <ModelLimitationBanner
        language={language}
        extraNoteVi="Mô hình quả cầu và que nối (Ball-and-Stick) là quy ước trực quan giúp học sinh THCS quan sát hình học liên kết và số lượng nguyên tử. Trên thực tế các electron tạo thành đám mây liên kết chung bao quanh các hạt nhân."
        extraNoteEn="Ball-and-stick representations are pedagogical aids to observe geometry and atom counts. In physical reality, shared electrons form overlapping probability clouds around nuclei."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Molecule Selector */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t['studio.selectMolecule']}
          </h4>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {SUBSTANCES_DATA.map(sub => {
              const isSelected = sub.id === selectedSubstanceId;
              const isExplored = exploredIds.includes(sub.id);

              return (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubstance(sub.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between focus:outline-none ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                        {sub.formula}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        sub.bondingType === 'ionic'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
                          : 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300'
                      }`}>
                        {sub.bondingType === 'ionic' ? (language === 'vi' ? 'Liên kết ion' : 'Ionic') : (language === 'vi' ? 'Cộng hóa trị' : 'Covalent')}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block truncate">
                      {language === 'vi' ? sub.nameVi : sub.nameEn}
                    </span>
                  </div>

                  {isExplored && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation badge */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
            <span className="font-bold block text-slate-800 dark:text-slate-200">
              {currentSubstance.bondingType === 'ionic' ? 'Kiểu liên kết Ion:' : 'Kiểu liên kết Cộng hóa trị:'}
            </span>
            <p className="leading-relaxed text-[11px]">
              {currentSubstance.bondingType === 'ionic' ? t['studio.ionicExplain'] : t['studio.covalentExplain']}
            </p>
          </div>
        </div>

        {/* Right: Interactive 3D Model Stage */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
          {/* Top Bar of Stage */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {currentSubstance.formula}
                </h3>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  – {language === 'vi' ? currentSubstance.nameVi : currentSubstance.nameEn}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {language === 'vi' ? 'Khối lượng phân tử:' : 'Molecular Mass:'}{' '}
                <strong className="text-slate-700 dark:text-slate-300">{currentSubstance.molecularMass} amu</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playTap();
                  setIsVibrating(!isVibrating);
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5"
              >
                {isVibrating ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                <span>{isVibrating ? t['action.pause'] : t['action.play']}</span>
              </button>

              <button
                onClick={resetAngle}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5"
                title={t['action.resetAngle']}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t['action.resetAngle']}</span>
              </button>
            </div>
          </div>

          {/* 3D Ball-and-Stick Canvas / Stage */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-80 sm:h-96 bg-gradient-to-b from-slate-950 to-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-inner border border-slate-800"
          >
            {/* Rotation helper badge */}
            <div className="absolute top-3 left-4 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 pointer-events-none">
              <Move className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t['studio.rotateHint']}</span>
            </div>

            {/* Rotation coordinates */}
            <div className="absolute bottom-3 right-4 text-[10px] font-mono text-slate-500 pointer-events-none">
              RotX: {Math.round(rotX)}° • RotY: {Math.round(rotY)}°
            </div>

            {/* SVG 3D Ball-and-Stick Projection */}
            <svg viewBox="-150 -130 300 260" className="w-full h-full pointer-events-none">
              <defs>
                {/* Radial gradients for sphere 3D lighting */}
                <radialGradient id="sphere-O" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="40%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </radialGradient>
                <radialGradient id="sphere-H" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </radialGradient>
                <radialGradient id="sphere-C" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#0f172a" />
                </radialGradient>
                <radialGradient id="sphere-N" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </radialGradient>
                <radialGradient id="sphere-Na" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#d8b4fe" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#581c87" />
                </radialGradient>
                <radialGradient id="sphere-Cl" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#14532d" />
                </radialGradient>
              </defs>

              {sortedRenderItems.map((item, idx) => {
                if (item.type === 'bond') {
                  const b = item.bond;
                  const p1 = item.p1;
                  const p2 = item.p2;

                  if (b.order === 1) {
                    return (
                      <line
                        key={`bond-${idx}`}
                        x1={p1.px}
                        y1={p1.py}
                        x2={p2.px}
                        y2={p2.py}
                        stroke="#94a3b8"
                        strokeWidth="7"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                    );
                  } else if (b.order === 2) {
                    // Double bond: 2 parallel lines
                    const dx = p2.px - p1.px;
                    const dy = p2.py - p1.py;
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;
                    const nx = (-dy / len) * 4;
                    const ny = (dx / len) * 4;

                    return (
                      <g key={`double-bond-${idx}`}>
                        <line
                          x1={p1.px + nx}
                          y1={p1.py + ny}
                          x2={p2.px + nx}
                          y2={p2.py + ny}
                          stroke="#cbd5e1"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <line
                          x1={p1.px - nx}
                          y1={p1.py - ny}
                          x2={p2.px - nx}
                          y2={p2.py - ny}
                          stroke="#cbd5e1"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  } else if (b.order === 3) {
                    // Triple bond: 3 parallel lines
                    const dx = p2.px - p1.px;
                    const dy = p2.py - p1.py;
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;
                    const nx = (-dy / len) * 5;
                    const ny = (dx / len) * 5;

                    return (
                      <g key={`triple-bond-${idx}`}>
                        <line x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py} stroke="#cbd5e1" strokeWidth="3" />
                        <line x1={p1.px + nx} y1={p1.py + ny} x2={p2.px + nx} y2={p2.py + ny} stroke="#cbd5e1" strokeWidth="3" />
                        <line x1={p1.px - nx} y1={p1.py - ny} x2={p2.px - nx} y2={p2.py - ny} stroke="#cbd5e1" strokeWidth="3" />
                      </g>
                    );
                  }
                  return null;
                } else {
                  const atom = item.atom;
                  let gradId = 'sphere-O';
                  if (atom.symbol.startsWith('H')) gradId = 'sphere-H';
                  else if (atom.symbol.startsWith('C') && !atom.symbol.includes('l')) gradId = 'sphere-C';
                  else if (atom.symbol.startsWith('N') && !atom.symbol.includes('a')) gradId = 'sphere-N';
                  else if (atom.symbol.includes('Na')) gradId = 'sphere-Na';
                  else if (atom.symbol.includes('Cl')) gradId = 'sphere-Cl';

                  return (
                    <g key={`atom-${idx}`}>
                      {/* 3D Sphere body */}
                      <circle
                        cx={atom.px}
                        cy={atom.py}
                        r={atom.effectiveRadius}
                        fill={`url(#${gradId})`}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="1.5"
                      />
                      {/* Element Symbol label centered on ball */}
                      <text
                        x={atom.px}
                        y={atom.py + 4}
                        textAnchor="middle"
                        fill={atom.symbol.startsWith('H') ? '#0f172a' : '#ffffff'}
                        fontSize={Math.max(9, atom.effectiveRadius * 0.65)}
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="pointer-events-none select-none"
                      >
                        {atom.symbol}
                      </text>
                    </g>
                  );
                }
              })}
            </svg>
          </div>

          {/* Molecule Description Footer */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">
              {language === 'vi' ? 'Đặc điểm cấu tạo & liên kết:' : 'Structure & Bonding Properties:'}
            </span>
            <p className="leading-relaxed">
              {language === 'vi' ? currentSubstance.descriptionVi : currentSubstance.descriptionEn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
