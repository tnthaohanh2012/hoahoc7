# Chemistry Explorer (Khám phá Hóa học 7)

Interactive Chemistry Learning Simulator for Grade 7 (THCS) aligned with **KHTN 7 – Kết nối tri thức với cuộc sống (Bài 2 đến Bài 7)**.

## 🌟 Key Features

1. **100% Offline-First Architecture**:
   - Zero runtime network dependencies.
   - All chemical datasets, models, audio cues (Web Audio API synthesis), and SVGs are bundled locally.
   - No external CDNs, fonts, or tracking scripts.

2. **Full Bilingual Support**:
   - **Vietnamese (Mặc định)**: Accurate textbook terminology from KHTN 7 (Nguyên tử, Nguyên tố, Bảng tuần hoàn, Hóa trị, Liên kết).
   - **English (IUPAC Standard)**: Complete secondary language for all screens, labels, and explanations.
   - Real-time language switching with state preservation.

3. **Core Curriculum Modules**:
   - **Module 1 (Bài 2 & 5)**: Rutherford-Bohr atom model with orbiting electrons (K, L, M shells) and 4-way particle sorting (Atom, Element, Molecule, Substance).
   - **Module 2 (Bài 3)**: Chemical Names & Symbols with IUPAC capitalization tester (C vs Ca, Co vs CO trap avoidance).
   - **Module 3 (Bài 4)**: Interactive Periodic Table with offline search, filters (Metals, Non-metals, Noble gases), and Bohr shell inspector.
   - **Module 4 (Bài 7)**: Valency & Formula Workshop featuring the cross-over method, subscript 1 omission (NaCl not Na₁Cl₁), ratio simplification (Al₂O₃, MgCl₂), and visual comparison of Subscript vs Coefficient (H₂O vs 2H₂O - EV-08).
   - **Module 5 (Bài 6)**: Chemical Bonds & Molecule Studio with animated 2D and rotatable 3D ball-and-stick models (H₂, O₂, N₂, H₂O, CO₂, CH₄, NH₃, NaCl crystal cell) and scientific limitation notices.
   - **Module 6**: Comprehensive 10-Question Assessment with immediate scientific explanation, similar example, and penalty-free retry, awarding a Certificate of Achievement upon reaching ≥ 80%.

4. **Accessibility & Pedagogy**:
   - Keyboard accessible, readable contrast, scalable font sizing (Normal, Large, Extra Large).
   - Reduced motion toggle.
   - LocalStorage persistence with safe fallback and double-confirmed reset.

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 3000)
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build offline
npm run preview
```

## 🧪 Acceptance Test Verification (Section 15 of SPEC)

- [x] **EV-01**: Match carbon symbol -> `C` (Capitalization enforced).
- [x] **EV-02**: Match calcium symbol -> `Ca` (Distinguished from Carbon C).
- [x] **EV-03**: Read water formula -> `H₂O` (Subscript 2 represents 2 H atoms in 1 molecule).
- [x] **EV-04**: Read carbon dioxide formula -> `CO₂` (1 C bonded to 2 O atoms).
- [x] **EV-05**: Build magnesium chloride -> `MgCl₂` (Mg II and Cl I).
- [x] **EV-06**: Build aluminium oxide -> `Al₂O₃` (Al III and O II cross-over).
- [x] **EV-07**: Build sodium chloride -> `NaCl` (Subscript 1 omitted, never Na₁Cl₁).
- [x] **EV-08**: Compare `H₂O` vs `2H₂O` (1 molecule vs 2 separate molecules).
- [x] **EV-09**: Element search with no match -> Bilingual empty state message displayed.
- [x] **EV-10**: Switch VI ↔ EN -> Preserves current task, input, and saved progress.
- [x] **EV-11**: 100% Offline -> Zero remote API or CDN calls.
- [x] **EV-12**: Save & Reopen -> Resumes progress from LocalStorage.
