/**
 * Validated Chemical Substances Dataset for Grade 7 (KHTN 7 - Lessons 5, 6, 7)
 * Source tag: [SOURCE: SGK KHTN 7 - Bài 5, 6, 7 & PhET Interactive Simulations]
 */
import { SubstanceData } from '../types';

export const SUBSTANCES_DATA: SubstanceData[] = [
  {
    id: 'h2',
    formula: 'H₂',
    nameVi: 'Khí Hydrogen',
    nameEn: 'Hydrogen Gas',
    type: 'elemental-nonmetal',
    bondingType: 'covalent',
    molecularMass: 2,
    composition: [{ symbol: 'H', count: 2 }],
    descriptionVi: 'Đơn chất do 2 nguyên tử H liên kết với nhau bằng 1 cặp electron dùng chung (liên kết đơn H-H).',
    descriptionEn: 'Elemental substance formed by 2 H atoms sharing 1 pair of electrons (single bond H-H).',
    bondTypeDisplay: 'single',
    bondsCount: 1,
    structure3D: {
      atoms: [
        { symbol: 'H', x: -35, y: 0, z: 0, color: '#e2e8f0', radius: 18 },
        { symbol: 'H', x: 35, y: 0, z: 0, color: '#e2e8f0', radius: 18 }
      ],
      bonds: [{ from: 0, to: 1, order: 1 }]
    },
    sourceRef: 'SGK KHTN 7 - Bài 5, 6'
  },
  {
    id: 'o2',
    formula: 'O₂',
    nameVi: 'Khí Oxygen',
    nameEn: 'Oxygen Gas',
    type: 'elemental-nonmetal',
    bondingType: 'covalent',
    molecularMass: 32,
    composition: [{ symbol: 'O', count: 2 }],
    descriptionVi: 'Đơn chất tạo bởi 2 nguyên tử Oxygen liên kết qua 2 cặp electron dùng chung (liên kết đôi O=O).',
    descriptionEn: 'Elemental substance of 2 Oxygen atoms sharing 2 pairs of electrons (double bond O=O).',
    bondTypeDisplay: 'double',
    bondsCount: 1,
    structure3D: {
      atoms: [
        { symbol: 'O', x: -40, y: 0, z: 0, color: '#ef4444', radius: 24 },
        { symbol: 'O', x: 40, y: 0, z: 0, color: '#ef4444', radius: 24 }
      ],
      bonds: [{ from: 0, to: 1, order: 2 }]
    },
    sourceRef: 'SGK KHTN 7 - Bài 5, 6'
  },
  {
    id: 'n2',
    formula: 'N₂',
    nameVi: 'Khí Nitrogen',
    nameEn: 'Nitrogen Gas',
    type: 'elemental-nonmetal',
    bondingType: 'covalent',
    molecularMass: 28,
    composition: [{ symbol: 'N', count: 2 }],
    descriptionVi: 'Đơn chất tạo bởi 2 nguyên tử Nitrogen liên kết rất bền qua 3 cặp electron dùng chung (liên kết ba N≡N).',
    descriptionEn: 'Elemental gas with very strong triple bond sharing 3 electron pairs (N≡N).',
    bondTypeDisplay: 'triple',
    bondsCount: 1,
    structure3D: {
      atoms: [
        { symbol: 'N', x: -38, y: 0, z: 0, color: '#3b82f6', radius: 22 },
        { symbol: 'N', x: 38, y: 0, z: 0, color: '#3b82f6', radius: 22 }
      ],
      bonds: [{ from: 0, to: 1, order: 3 }]
    },
    sourceRef: 'SGK KHTN 7 - Bài 5, 6'
  },
  {
    id: 'h2o',
    formula: 'H₂O',
    nameVi: 'Nước',
    nameEn: 'Water',
    type: 'compound-covalent',
    bondingType: 'covalent',
    molecularMass: 18,
    composition: [
      { symbol: 'H', count: 2 },
      { symbol: 'O', count: 1 }
    ],
    descriptionVi: 'Hợp chất gồm 1 nguyên tử Oxygen liên kết với 2 nguyên tử Hydrogen theo góc gấp khúc ~104.5°.',
    descriptionEn: 'Compound of 1 Oxygen bonded to 2 Hydrogen atoms in a bent arrangement (~104.5°).',
    bondTypeDisplay: 'single',
    bondsCount: 2,
    structure3D: {
      atoms: [
        { symbol: 'O', x: 0, y: -15, z: 0, color: '#ef4444', radius: 25 },
        { symbol: 'H', x: -45, y: 25, z: 0, color: '#e2e8f0', radius: 16 },
        { symbol: 'H', x: 45, y: 25, z: 0, color: '#e2e8f0', radius: 16 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 }
      ]
    },
    sourceRef: 'SGK KHTN 7 - Bài 5, 6, 7'
  },
  {
    id: 'co2',
    formula: 'CO₂',
    nameVi: 'Khí Carbon dioxide',
    nameEn: 'Carbon Dioxide',
    type: 'compound-covalent',
    bondingType: 'covalent',
    molecularMass: 44,
    composition: [
      { symbol: 'C', count: 1 },
      { symbol: 'O', count: 2 }
    ],
    descriptionVi: 'Hợp chất phân tử thẳng hàng: 1 nguyên tử Carbon ở giữa liên kết đôi với 2 nguyên tử Oxygen (O=C=O).',
    descriptionEn: 'Linear molecule with central Carbon double-bonded to two Oxygen atoms (O=C=O).',
    bondTypeDisplay: 'double',
    bondsCount: 2,
    structure3D: {
      atoms: [
        { symbol: 'C', x: 0, y: 0, z: 0, color: '#475569', radius: 22 },
        { symbol: 'O', x: -65, y: 0, z: 0, color: '#ef4444', radius: 24 },
        { symbol: 'O', x: 65, y: 0, z: 0, color: '#ef4444', radius: 24 }
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 }
      ]
    },
    sourceRef: 'SGK KHTN 7 - Bài 5, 6, 7'
  },
  {
    id: 'ch4',
    formula: 'CH₄',
    nameVi: 'Khí Methane',
    nameEn: 'Methane Gas',
    type: 'compound-covalent',
    bondingType: 'covalent',
    molecularMass: 16,
    composition: [
      { symbol: 'C', count: 1 },
      { symbol: 'H', count: 4 }
    ],
    descriptionVi: 'Thành phần chính của khí thiên nhiên và khí biogas, cấu trúc hình tứ diện đều bền vững.',
    descriptionEn: 'Main component of natural gas & biogas with tetrahedral geometry around carbon.',
    bondTypeDisplay: 'single',
    bondsCount: 4,
    structure3D: {
      atoms: [
        { symbol: 'C', x: 0, y: 0, z: 0, color: '#475569', radius: 22 },
        { symbol: 'H', x: 0, y: -45, z: 0, color: '#e2e8f0', radius: 15 },
        { symbol: 'H', x: 42, y: 20, z: -25, color: '#e2e8f0', radius: 15 },
        { symbol: 'H', x: -42, y: 20, z: -25, color: '#e2e8f0', radius: 15 },
        { symbol: 'H', x: 0, y: 25, z: 45, color: '#e2e8f0', radius: 15 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 }
      ]
    },
    sourceRef: 'SGK KHTN 7 - Bài 5, 6, 7'
  },
  {
    id: 'nh3',
    formula: 'NH₃',
    nameVi: 'Khí Ammonia',
    nameEn: 'Ammonia',
    type: 'compound-covalent',
    bondingType: 'covalent',
    molecularMass: 17,
    composition: [
      { symbol: 'N', count: 1 },
      { symbol: 'H', count: 3 }
    ],
    descriptionVi: 'Chất khí có mùi khai đặc trưng, 1 nguyên tử N liên kết đơn với 3 nguyên tử H hình chóp tam giác.',
    descriptionEn: 'Gas with pungent odor, trigonal pyramidal geometry with N bonded to 3 H atoms.',
    bondTypeDisplay: 'single',
    bondsCount: 3,
    structure3D: {
      atoms: [
        { symbol: 'N', x: 0, y: -20, z: 0, color: '#3b82f6', radius: 22 },
        { symbol: 'H', x: -40, y: 25, z: -20, color: '#e2e8f0', radius: 15 },
        { symbol: 'H', x: 40, y: 25, z: -20, color: '#e2e8f0', radius: 15 },
        { symbol: 'H', x: 0, y: 25, z: 40, color: '#e2e8f0', radius: 15 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }
      ]
    },
    sourceRef: 'SGK KHTN 7 - Bài 5, 6, 7'
  },
  {
    id: 'nacl',
    formula: 'NaCl',
    nameVi: 'Muối ăn (Sodium chloride)',
    nameEn: 'Sodium Chloride (Table Salt)',
    type: 'compound-ionic',
    bondingType: 'ionic',
    molecularMass: 58.5,
    composition: [
      { symbol: 'Na', count: 1 },
      { symbol: 'Cl', count: 1 }
    ],
    descriptionVi: 'Hợp chất ion: nguyên tử Na nhường 1 electron tạo ion Na⁺, Cl nhận 1 electron tạo ion Cl⁻, hút nhau bằng lực tĩnh điện.',
    descriptionEn: 'Ionic compound: Na donates 1 electron to form Na⁺, Cl accepts it to form Cl⁻, held by electrostatic force.',
    bondTypeDisplay: 'ionic',
    bondsCount: 4,
    structure3D: {
      atoms: [
        // Representing an elementary alternating ionic cell
        { symbol: 'Na⁺', x: -30, y: -30, z: 0, color: '#a855f7', radius: 18 },
        { symbol: 'Cl⁻', x: 30, y: -30, z: 0, color: '#22c55e', radius: 25 },
        { symbol: 'Cl⁻', x: -30, y: 30, z: 0, color: '#22c55e', radius: 25 },
        { symbol: 'Na⁺', x: 30, y: 30, z: 0, color: '#a855f7', radius: 18 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
        { from: 2, to: 3, order: 1 }
      ]
    },
    sourceRef: 'SGK KHTN 7 - Bài 6, 7'
  }
];
