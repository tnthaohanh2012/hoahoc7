/**
 * Validated Valency and Formula Building Rules for Grade 7 (KHTN 7 - Lesson 7)
 * Source tag: [SOURCE: SGK KHTN 7 - Bài 7: Hóa trị và công thức hóa học]
 */
import { ValencyPracticeItem } from '../types';

export const VALENCY_PRACTICE_ITEMS: ValencyPracticeItem[] = [
  {
    id: 'ev-07-nacl',
    element1: { symbol: 'Na', nameVi: 'Sodium', nameEn: 'Sodium', valency: 1 },
    element2: { symbol: 'Cl', nameVi: 'Chlorine', nameEn: 'Chlorine', valency: 1 },
    expectedFormula: 'NaCl',
    ratioRaw: '1/1',
    ratioSimplified: '1/1',
    explanationVi: 'Theo quy tắc hóa trị: x × I = y × I ⇒ x/y = 1/1 ⇒ x = 1, y = 1. Khi chỉ số là 1 thì KHÔNG GHI. Do đó công thức là NaCl (không viết Na₁Cl₁).',
    explanationEn: 'By valency rule: x × I = y × I ⇒ x/y = 1/1 ⇒ x = 1, y = 1. When subscript is 1, do NOT write it. Thus formula is NaCl (never Na₁Cl₁).',
    specialRuleVi: 'Quy tắc bỏ chỉ số 1: Subscript 1 luôn được lược bỏ.',
    specialRuleEn: 'Subscript 1 rule: Always omit subscript 1.',
    similarExampleId: 'hcl'
  },
  {
    id: 'ev-05-mgcl2',
    element1: { symbol: 'Mg', nameVi: 'Magnesium', nameEn: 'Magnesium', valency: 2 },
    element2: { symbol: 'Cl', nameVi: 'Chlorine', nameEn: 'Chlorine', valency: 1 },
    expectedFormula: 'MgCl₂',
    ratioRaw: '1/2',
    ratioSimplified: '1/2',
    explanationVi: 'Theo quy tắc hóa trị: x × II = y × I ⇒ x/y = I/II = 1/2 ⇒ x = 1, y = 2. Lược bỏ số 1, ta được công thức là MgCl₂.',
    explanationEn: 'By valency rule: x × II = y × I ⇒ x/y = 1/2 ⇒ x = 1, y = 2. Subscript 1 is omitted, giving MgCl₂.',
    similarExampleId: 'cacl2'
  },
  {
    id: 'ev-06-al2o3',
    element1: { symbol: 'Al', nameVi: 'Aluminium', nameEn: 'Aluminium', valency: 3 },
    element2: { symbol: 'O', nameVi: 'Oxygen', nameEn: 'Oxygen', valency: 2 },
    expectedFormula: 'Al₂O₃',
    ratioRaw: '2/3',
    ratioSimplified: '2/3',
    explanationVi: 'Theo quy tắc hóa trị: x × III = y × II ⇒ x/y = II/III = 2/3 (tối giản) ⇒ x = 2, y = 3. Công thức hóa học là Al₂O₃.',
    explanationEn: 'By valency rule: x × III = y × II ⇒ x/y = 2/3 (irreducible) ⇒ x = 2, y = 3. Resulting formula is Al₂O₃.',
    similarExampleId: 'fe2o3'
  },
  {
    id: 'h2o',
    element1: { symbol: 'H', nameVi: 'Hydrogen', nameEn: 'Hydrogen', valency: 1 },
    element2: { symbol: 'O', nameVi: 'Oxygen', nameEn: 'Oxygen', valency: 2 },
    expectedFormula: 'H₂O',
    ratioRaw: '2/1',
    ratioSimplified: '2/1',
    explanationVi: 'Theo quy tắc hóa trị: x × I = y × II ⇒ x/y = II/I = 2/1 ⇒ x = 2, y = 1. Lược bỏ chỉ số 1, công thức là H₂O.',
    explanationEn: 'By valency rule: x × I = y × II ⇒ x/y = 2/1 ⇒ x = 2, y = 1. Subscript 1 is omitted, giving H₂O.',
    similarExampleId: 'h2s'
  },
  {
    id: 'co2',
    element1: { symbol: 'C', nameVi: 'Carbon', nameEn: 'Carbon', valency: 4 },
    element2: { symbol: 'O', nameVi: 'Oxygen', nameEn: 'Oxygen', valency: 2 },
    expectedFormula: 'CO₂',
    ratioRaw: '2/4',
    ratioSimplified: '1/2',
    explanationVi: 'Theo quy tắc hóa trị: x × IV = y × II ⇒ x/y = II/IV = 2/4. Rút gọn tỉ lệ tối giản thành 1/2 ⇒ x = 1, y = 2. Lược bỏ 1 ta được CO₂.',
    explanationEn: 'By valency rule: x × IV = y × II ⇒ x/y = 2/4. Reduce to lowest terms 1/2 ⇒ x = 1, y = 2. Omit 1 giving CO₂.',
    specialRuleVi: 'Quy tắc rút gọn tỉ số: Phải rút gọn tỉ số hóa trị về phân số tối giản trước khi chọn chỉ số.',
    specialRuleEn: 'Ratio reduction rule: Must simplify the valency ratio to lowest whole numbers before taking subscripts.',
    similarExampleId: 'so2'
  },
  {
    id: 'cao',
    element1: { symbol: 'Ca', nameVi: 'Calcium', nameEn: 'Calcium', valency: 2 },
    element2: { symbol: 'O', nameVi: 'Oxygen', nameEn: 'Oxygen', valency: 2 },
    expectedFormula: 'CaO',
    ratioRaw: '2/2',
    ratioSimplified: '1/1',
    explanationVi: 'Theo quy tắc hóa trị: x × II = y × II ⇒ x/y = II/II = 2/2 = 1/1 ⇒ x = 1, y = 1. Bỏ chỉ số 1 được CaO (không ghi Ca₂O₂).',
    explanationEn: 'By valency rule: x × II = y × II ⇒ x/y = 2/2 = 1/1 ⇒ x = 1, y = 1. Subscript 1 omitted gives CaO (never Ca₂O₂).',
    similarExampleId: 'mgo'
  },
  {
    id: 'fe2o3',
    element1: { symbol: 'Fe', nameVi: 'Iron(III)', nameEn: 'Iron(III)', valency: 3 },
    element2: { symbol: 'O', nameVi: 'Oxygen', nameEn: 'Oxygen', valency: 2 },
    expectedFormula: 'Fe₂O₃',
    ratioRaw: '2/3',
    ratioSimplified: '2/3',
    explanationVi: 'Sắt có hóa trị III: x × III = y × II ⇒ x/y = 2/3 ⇒ x = 2, y = 3. Công thức là Fe₂O₃ (gỉ sắt đỏ nâu).',
    explanationEn: 'Iron has valency III: x × III = y × II ⇒ x/y = 2/3 ⇒ x = 2, y = 3. Formula is Fe₂O₃ (reddish rust).',
    similarExampleId: 'ev-06-al2o3'
  },
  {
    id: 'zncl2',
    element1: { symbol: 'Zn', nameVi: 'Zinc', nameEn: 'Zinc', valency: 2 },
    element2: { symbol: 'Cl', nameVi: 'Chlorine', nameEn: 'Chlorine', valency: 1 },
    expectedFormula: 'ZnCl₂',
    ratioRaw: '1/2',
    ratioSimplified: '1/2',
    explanationVi: 'Kẽm hóa trị II, Chlorine hóa trị I: x × II = y × I ⇒ x/y = 1/2 ⇒ x = 1, y = 2 ⇒ ZnCl₂.',
    explanationEn: 'Zinc valency II, Chlorine valency I: x × II = y × I ⇒ x/y = 1/2 ⇒ x = 1, y = 2 ⇒ ZnCl₂.',
    similarExampleId: 'ev-05-mgcl2'
  }
];

/**
 * Educational Misconception Comparison Data (EV-08): Subscript vs Coefficient
 */
export const SUB_VS_COEFF_DATA = {
  formulaSingle: 'H₂O',
  formulaDouble: '2H₂O',
  singleVi: {
    title: 'H₂O (Một phân tử nước)',
    subscriptMeaning: 'Chỉ số "2" ở chân H cho biết trong 1 phân tử nước có 2 nguyên tử H liên kết với 1 nguyên tử O.',
    coefficientMeaning: 'Hệ số đứng trước ngầm hiểu là 1 (không cần viết).',
    particleCount: { molecules: 1, totalH: 2, totalO: 1 }
  },
  doubleVi: {
    title: '2H₂O (Hai phân tử nước riêng biệt)',
    subscriptMeaning: 'Chỉ số "2" ở chân vẫn thể hiện mỗi phân tử gồm 2 nguyên tử H và 1 nguyên tử O.',
    coefficientMeaning: 'Hệ số "2" to viết đằng trước thể hiện có 2 phân tử nước độc lập.',
    particleCount: { molecules: 2, totalH: 4, totalO: 2 }
  },
  singleEn: {
    title: 'H₂O (One water molecule)',
    subscriptMeaning: 'The subscript "2" shows there are 2 H atoms bonded to 1 O atom inside one molecule.',
    coefficientMeaning: 'The coefficient in front is implied to be 1.',
    particleCount: { molecules: 1, totalH: 2, totalO: 1 }
  },
  doubleEn: {
    title: '2H₂O (Two separate water molecules)',
    subscriptMeaning: 'The subscript "2" still means each molecule contains 2 H atoms and 1 O atom.',
    coefficientMeaning: 'The big coefficient "2" in front indicates there are 2 independent water molecules.',
    particleCount: { molecules: 2, totalH: 4, totalO: 2 }
  }
};
