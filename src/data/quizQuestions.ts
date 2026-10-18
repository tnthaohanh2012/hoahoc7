/**
 * Validated Assessment Questions and Mission Challenges for Grade 7
 * Includes: Explanation + Similar Example + Retry mechanism (Section 7 & 15 QA rules)
 */
import { Question } from '../types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'q1-ev01-symbol-c',
    module: 2,
    type: 'single-choice',
    promptVi: 'Ký hiệu hóa học chuẩn của nguyên tố Carbon là gì?',
    promptEn: 'What is the correct standard chemical symbol for the element Carbon?',
    options: [
      { id: 'opt-a', textVi: 'c (chữ c thường)', textEn: 'c (lowercase c)' },
      { id: 'opt-b', textVi: 'C (chữ C hoa)', textEn: 'C (uppercase C)' },
      { id: 'opt-c', textVi: 'CA', textEn: 'CA' },
      { id: 'opt-d', textVi: 'Cb', textEn: 'Cb' }
    ],
    correctAnswer: 'opt-b',
    explanationVi: 'Theo quy ước IUPAC và SGK KHTN 7, ký hiệu hóa học được biểu diễn bằng 1 hoặc 2 chữ cái. Chữ cái đầu tiên BẮT BUỘC phải viết in hoa. Do đó ký hiệu của Carbon là C (chữ C hoa), không được viết chữ thường "c".',
    explanationEn: 'According to IUPAC standards, a chemical symbol consists of one or two letters. The first letter MUST be capitalized. Therefore, the symbol for Carbon is C (uppercase C), never lowercase "c".',
    hintVi: 'Ký hiệu gồm 1 chữ cái luôn phải viết IN HOA.',
    hintEn: 'A single-letter chemical symbol must always be capitalized.',
    similarExampleVi: 'Ví dụ tương tự: Nguyên tố Nitrogen có ký hiệu là N (không viết là n); Oxygen là O (không viết là o).',
    similarExampleEn: 'Similar example: Nitrogen has symbol N (not n); Oxygen has symbol O (not o).',
    misconceptionAlertVi: 'Hiểu lầm phổ biến: Coi chữ in hoa và chữ in thường như nhau.',
    misconceptionAlertEn: 'Common misconception: Treating uppercase and lowercase letters as interchangeable.'
  },
  {
    id: 'q2-ev02-symbol-ca',
    module: 2,
    type: 'single-choice',
    promptVi: 'Để phân biệt với Carbon (C), ký hiệu hóa học chuẩn của nguyên tố Calcium (Canxi) là gì?',
    promptEn: 'To distinguish from Carbon (C), what is the standard chemical symbol for Calcium?',
    options: [
      { id: 'opt-a', textVi: 'CA', textEn: 'CA' },
      { id: 'opt-b', textVi: 'ca', textEn: 'ca' },
      { id: 'opt-c', textVi: 'Ca', textEn: 'Ca' },
      { id: 'opt-d', textVi: 'C', textEn: 'C' }
    ],
    correctAnswer: 'opt-c',
    explanationVi: 'Khi ký hiệu hóa học gồm 2 chữ cái, chữ cái đầu tiên viết HOA và chữ cái thứ hai BẮT BUỘC viết THƯỜNG. Vì vậy, Calcium có ký hiệu là Ca. Nếu viết CA thì bị hiểu nhầm là hợp chất của 2 nguyên tố C và A.',
    explanationEn: 'When a chemical symbol contains two letters, the first is capitalized and the second MUST be lowercase. Therefore Calcium is Ca. Writing CA could be mistaken for a compound of two elements C and A.',
    hintVi: 'Chữ cái đầu in hoa, chữ cái thứ hai viết thường: C + a.',
    hintEn: 'First letter capital, second letter lowercase: C + a.',
    similarExampleVi: 'Ví dụ tương tự: Sodium có ký hiệu Na (không phải NA hay na); Chlorine có ký hiệu Cl (không phải CL hay cl).',
    similarExampleEn: 'Similar example: Sodium is Na (not NA or na); Chlorine is Cl (not CL or cl).'
  },
  {
    id: 'q3-atom-model',
    module: 1,
    type: 'single-choice',
    promptVi: 'Theo mô hình nguyên tử Rutherford - Bohr, hạt nhân nguyên tử chứa các loại hạt nào?',
    promptEn: 'According to the Rutherford - Bohr atomic model, which particles are in the atomic nucleus?',
    options: [
      { id: 'opt-a', textVi: 'Proton (mang điện dương) và Neutron (không mang điện)', textEn: 'Protons (positively charged) and Neutrons (neutral)' },
      { id: 'opt-b', textVi: 'Electron (mang điện âm) và Proton', textEn: 'Electrons (negatively charged) and Protons' },
      { id: 'opt-c', textVi: 'Chỉ có các electron quay xung quanh', textEn: 'Only orbiting electrons' },
      { id: 'opt-d', textVi: 'Hạt nhân không có hạt nào', textEn: 'The nucleus contains no particles' }
    ],
    correctAnswer: 'opt-a',
    explanationVi: 'Hạt nhân nằm ở tâm nguyên tử, gồm các proton (mang điện tích dương +) và neutron (không mang điện). Các electron (mang điện tích âm -) chuyển động xung quanh hạt nhân theo từng lớp electron.',
    explanationEn: 'The nucleus at the center consists of protons (positive +) and neutrons (neutral). Electrons (negative -) orbit around the nucleus in electron shells.',
    hintVi: 'Hạt electron chuyển động ở lớp vỏ bên ngoài, còn hạt nhân nằm ở tâm.',
    hintEn: 'Electrons orbit in the outer shells, while the nucleus is at the center.',
    similarExampleVi: 'Ví dụ: Nguyên tử Helium có 2 proton và 2 neutron ở hạt nhân, lớp vỏ ngoài có 2 electron.',
    similarExampleEn: 'Example: Helium atom has 2 protons and 2 neutrons in the nucleus, with 2 electrons in its shell.'
  },
  {
    id: 'q4-concept-distinction',
    module: 1,
    type: 'single-choice',
    promptVi: 'Khí Oxygen trong không khí mà chúng ta hít thở (gồm 2 nguyên tử Oxygen liên kết với nhau thành O₂) được gọi chính xác là gì?',
    promptEn: 'The oxygen gas in air that we breathe (2 Oxygen atoms bonded together as O₂) is best classified as:',
    options: [
      { id: 'opt-a', textVi: 'Một phân tử đơn chất', textEn: 'A molecule of an elemental substance' },
      { id: 'opt-b', textVi: 'Một nguyên tử riêng lẻ', textEn: 'An isolated single atom' },
      { id: 'opt-c', textVi: 'Một hợp chất phức tạp', textEn: 'A complex chemical compound' },
      { id: 'opt-d', textVi: 'Một hỗn hợp không đồng nhất', textEn: 'A heterogeneous mixture' }
    ],
    correctAnswer: 'opt-a',
    explanationVi: 'O₂ gồm 2 nguyên tử của CÙNG MỘT nguyên tố hóa học (Oxygen) liên kết hóa học với nhau tạo thành hạt phân tử. Vì chỉ gồm 1 nguyên tố nên nó là phân tử đơn chất (khác với hợp chất như H₂O gồm 2 nguyên tố khác nhau).',
    explanationEn: 'O₂ consists of 2 atoms of the SAME chemical element bonded together, making it a molecule of an elemental substance (unlike a compound like H₂O which contains 2 different elements).',
    hintVi: 'Chỉ có 1 loại nguyên tố (O), nhưng có 2 nguyên tử liên kết lại.',
    hintEn: 'Contains only one kind of element (O), but 2 atoms are chemically joined.',
    similarExampleVi: 'Ví dụ tương tự: Khí Nitrogen (N₂) và Khí Hydrogen (H₂) đều là các phân tử đơn chất.',
    similarExampleEn: 'Similar example: Nitrogen gas (N₂) and Hydrogen gas (H₂) are both elemental molecules.'
  },
  {
    id: 'q5-periodic-table-tile',
    module: 3,
    type: 'single-choice',
    promptVi: 'Trong bảng tuần hoàn, ô số 11 (Na - Sodium) cho biết số hiệu nguyên tử Z = 11. Con số này cho biết điều gì?',
    promptEn: 'In the periodic table, tile 11 (Na - Sodium) has atomic number Z = 11. What does this number tell us?',
    options: [
      { id: 'opt-a', textVi: 'Số proton trong hạt nhân và số electron của nguyên tử Na là 11', textEn: 'The number of protons in the nucleus and electrons in Na atom is 11' },
      { id: 'opt-b', textVi: 'Khối lượng của nguyên tử Na là 11 gam', textEn: 'The mass of a Na atom is 11 grams' },
      { id: 'opt-c', textVi: 'Na có 11 lớp electron', textEn: 'Na has 11 electron shells' },
      { id: 'opt-d', textVi: 'Na có hóa trị 11', textEn: 'Na has a valency of 11' }
    ],
    correctAnswer: 'opt-a',
    explanationVi: 'Số hiệu nguyên tử (Z) chính là số proton trong hạt nhân nguyên tử. Vì nguyên tử trung hòa về điện nên số proton bằng số electron = 11.',
    explanationEn: 'The atomic number (Z) equals the number of protons in the nucleus. Because atoms are electrically neutral, protons = electrons = 11.',
    hintVi: 'Số hiệu nguyên tử Z = Số hạt proton = Số hạt electron.',
    hintEn: 'Atomic number Z = Number of protons = Number of electrons.',
    similarExampleVi: 'Ví dụ: Ô số 8 (Oxygen, Z = 8) có 8 proton và 8 electron; Ô số 6 (Carbon, Z = 6) có 6 proton và 6 electron.',
    similarExampleEn: 'Example: Tile 8 (Oxygen, Z = 8) has 8 protons and 8 electrons; Tile 6 (Carbon, Z = 6) has 6 protons and 6 electrons.'
  },
  {
    id: 'q6-ev05-valency-mgcl2',
    module: 4,
    type: 'single-choice',
    promptVi: 'Biết Magnesium (Mg) có hóa trị II và Chlorine (Cl) có hóa trị I. Công thức hóa học đúng tạo bởi Mg và Cl là gì?',
    promptEn: 'Knowing Magnesium (Mg) has valency II and Chlorine (Cl) has valency I, what is the correct formula?',
    options: [
      { id: 'opt-a', textVi: 'MgCl', textEn: 'MgCl' },
      { id: 'opt-b', textVi: 'Mg₂Cl', textEn: 'Mg₂Cl' },
      { id: 'opt-c', textVi: 'MgCl₂', textEn: 'MgCl₂' },
      { id: 'opt-d', textVi: 'Mg₂Cl₂', textEn: 'Mg₂Cl₂' }
    ],
    correctAnswer: 'opt-c',
    explanationVi: 'Đặt công thức Mg_x Cl_y. Theo quy tắc hóa trị: x × II = y × I ⇒ x/y = I/II = 1/2 ⇒ x = 1, y = 2. Chỉ số 1 được lược bỏ không viết, ta được MgCl₂.',
    explanationEn: 'Set formula Mg_x Cl_y. Valency cross-over: x × II = y × I ⇒ x/y = 1/2 ⇒ x = 1, y = 2. Omit subscript 1, giving MgCl₂.',
    hintVi: 'Áp dụng quy tắc hóa trị: x/y = hóa trị của Cl / hóa trị của Mg.',
    hintEn: 'Apply the cross-over rule: x/y = valency of Cl / valency of Mg.',
    similarExampleVi: 'Ví dụ tương tự: Calcium hóa trị II và Chlorine hóa trị I tạo ra muối CaCl₂.',
    similarExampleEn: 'Similar example: Calcium (II) and Chlorine (I) form CaCl₂.'
  },
  {
    id: 'q7-ev06-valency-al2o3',
    module: 4,
    type: 'single-choice',
    promptVi: 'Biết Aluminium (Al) có hóa trị III và Oxygen (O) có hóa trị II. Công thức hóa học hợp chất tạo bởi Al và O là:',
    promptEn: 'Aluminium (Al) has valency III and Oxygen (O) has valency II. What is the chemical formula formed?',
    options: [
      { id: 'opt-a', textVi: 'AlO', textEn: 'AlO' },
      { id: 'opt-b', textVi: 'Al₃O₂', textEn: 'Al₃O₂' },
      { id: 'opt-c', textVi: 'Al₂O₃', textEn: 'Al₂O₃' },
      { id: 'opt-d', textVi: 'Al₂O', textEn: 'Al₂O' }
    ],
    correctAnswer: 'opt-c',
    explanationVi: 'Đặt công thức Al_x O_y. Theo quy tắc hóa trị: x × III = y × II ⇒ x/y = II/III = 2/3 (tối giản) ⇒ x = 2, y = 3. Công thức là Al₂O₃.',
    explanationEn: 'Set formula Al_x O_y. By valency rule: x × III = y × II ⇒ x/y = 2/3 (lowest terms) ⇒ x = 2, y = 3. The formula is Al₂O₃.',
    hintVi: 'Tỉ số x/y = hóa trị của O / hóa trị của Al = 2/3.',
    hintEn: 'Ratio x/y = valency of O / valency of Al = 2/3.',
    similarExampleVi: 'Ví dụ tương tự: Sắt(III) hóa trị III kết hợp với Oxygen hóa trị II tạo thành Fe₂O₃ (gỉ sắt).',
    similarExampleEn: 'Similar example: Iron(III) and Oxygen(II) form Fe₂O₃ (rust).'
  },
  {
    id: 'q8-ev07-valency-nacl',
    module: 4,
    type: 'single-choice',
    promptVi: 'Sodium (Na) có hóa trị I, Chlorine (Cl) có hóa trị I. Tại sao công thức viết là NaCl mà KHÔNG viết là Na₁Cl₁?',
    promptEn: 'Sodium (Na) has valency I, Chlorine (Cl) has valency I. Why is it written as NaCl and NOT Na₁Cl₁?',
    options: [
      { id: 'opt-a', textVi: 'Quy ước quốc tế: Khi chỉ số nguyên tử bằng 1 thì KHÔNG GHI', textEn: 'International convention: When an atomic subscript is 1, it is OMITTED' },
      { id: 'opt-b', textVi: 'Vì Na và Cl không liên kết với nhau', textEn: 'Because Na and Cl do not bond together' },
      { id: 'opt-c', textVi: 'Vì số 1 không tồn tại trong hóa học', textEn: 'Because number 1 does not exist in chemistry' },
      { id: 'opt-d', textVi: 'Viết Na₁Cl₁ vẫn đúng như thường', textEn: 'Writing Na₁Cl₁ is equally valid' }
    ],
    correctAnswer: 'opt-a',
    explanationVi: 'Theo quy ước viết công thức hóa học: Nếu chỉ số chân là 1 thì lược bỏ không ghi. Bản thân ký hiệu Na đã đại diện cho 1 nguyên tử Na, Cl đại diện cho 1 nguyên tử Cl. Do đó công thức chuẩn là NaCl.',
    explanationEn: 'Chemical formula convention dictates that subscript 1 is omitted. The symbol Na inherently represents one Na atom, and Cl represents one Cl atom. The standard formula is NaCl.',
    hintVi: 'Nhớ quy tắc lược bỏ số 1 ở chân nguyên tố.',
    hintEn: 'Remember the rule to omit subscript 1.',
    similarExampleVi: 'Ví dụ tương tự: Khí Hydrogen chloride có H(I) và Cl(I) viết là HCl (không viết H₁Cl₁).',
    similarExampleEn: 'Similar example: Hydrogen chloride with H(I) and Cl(I) is written as HCl (never H₁Cl₁).'
  },
  {
    id: 'q9-ev08-sub-vs-coeff',
    module: 4,
    type: 'single-choice',
    promptVi: 'Quan sát hai cách viết H₂O và 2H₂O. Phát biểu nào sau đây phân biệt ĐÚNG chỉ số và hệ số?',
    promptEn: 'Observe H₂O and 2H₂O. Which statement correctly distinguishes subscript from coefficient?',
    options: [
      { id: 'opt-a', textVi: 'H₂O chỉ 1 phân tử nước (chứa 2 nguyên tử H và 1 O); 2H₂O chỉ 2 phân tử nước riêng biệt', textEn: 'H₂O denotes 1 water molecule (2 H and 1 O atoms); 2H₂O denotes 2 separate water molecules' },
      { id: 'opt-b', textVi: 'H₂O và 2H₂O hoàn toàn giống nhau, không có gì khác biệt', textEn: 'H₂O and 2H₂O are completely identical with no difference' },
      { id: 'opt-c', textVi: 'Chỉ số 2 ở chân và hệ số 2 ở trước đều chỉ số lượng nguyên tử H', textEn: 'Subscript 2 and coefficient 2 both only represent the count of H atoms' },
      { id: 'opt-d', textVi: '2H₂O là một phân tử khổng lồ có 4 nguyên tử O', textEn: '2H₂O is a single giant molecule with 4 Oxygen atoms' }
    ],
    correctAnswer: 'opt-a',
    explanationVi: 'Chỉ số chân (subscript 2 trong H₂O) thể hiện số nguyên tử trong MỘT phân tử. Hệ số (coefficient 2 trong 2H₂O) viết to ở trước thể hiện SỐ LƯỢNG PHÂN TỬ. Vì vậy, 2H₂O nghĩa là có 2 phân tử nước rời nhau (tổng cộng 4 nguyên tử H và 2 nguyên tử O).',
    explanationEn: 'The subscript 2 shows the number of atoms INSIDE one molecule. The coefficient 2 in front indicates the NUMBER OF MOLECULES. Thus 2H₂O means 2 separate water molecules (total 4 H atoms and 2 O atoms).',
    hintVi: 'Hệ số đứng trước nhân lên toàn bộ số lượng phân tử.',
    hintEn: 'The coefficient in front multiplies the entire molecule count.',
    similarExampleVi: 'Ví dụ: O₂ là 1 phân tử khí oxygen; 3O₂ là 3 phân tử khí oxygen riêng biệt (tổng 6 nguyên tử O).',
    similarExampleEn: 'Example: O₂ is 1 molecule of oxygen gas; 3O₂ represents 3 separate oxygen molecules (total 6 O atoms).'
  },
  {
    id: 'q10-model-limitation',
    module: 5,
    type: 'single-choice',
    promptVi: 'Mô hình quả cầu và que nối (ball-and-stick) của phân tử nước H₂O trong bài học giúp ta hiểu điều gì, và giới hạn của nó là gì?',
    promptEn: 'What does the ball-and-stick model of H₂O help us understand, and what is its scientific limitation?',
    options: [
      { id: 'opt-a', textVi: 'Giúp hình dung trật tự liên kết và dạng gấp khúc; giới hạn là que nối và quả cầu không phải ảnh chụp thực tế hay đúng tỉ lệ kích thước nguyên tử', textEn: 'Helps visualize bonding arrangement and bent shape; limitation is sticks/spheres are not real photographs or to-scale atomic sizes' },
      { id: 'opt-b', textVi: 'Là ảnh chụp thực tế bằng kính hiển vi quang học thông thường', textEn: 'It is an actual photograph taken with a normal light microscope' },
      { id: 'opt-c', textVi: 'Nguyên tử trong thực tế có gắn các thanh nhựa que nối cứng ngắc', textEn: 'Real atoms have rigid plastic sticks connecting them' },
      { id: 'opt-d', textVi: 'Mô hình phản ánh chính xác 100% khoảng cách và chuyển động electron', textEn: 'The model represents 100% exact distances and electron movements' }
    ],
    correctAnswer: 'opt-a',
    explanationVi: 'Mô hình phân tử là công cụ trực quan hóa giúp người học hiểu vị trí nguyên tử và liên kết giữa chúng. Trong tự nhiên không có que nối cứng và kích thước không theo tỉ lệ vẽ; electron chuyển động tạo thành đám mây mờ bao quanh hạt nhân.',
    explanationEn: 'Molecular models are visualization aids helping learners grasp atomic arrangements and bonds. In nature, there are no rigid physical sticks; electrons move in clouds surrounding the nucleus.',
    hintVi: 'Mô hình là hình ảnh quy ước đơn giản hóa, không phải ảnh chụp thực tế.',
    hintEn: 'Models are simplified pedagogical conventions, not literal microscopic photos.',
    similarExampleVi: 'Lưu ý: Mọi mô hình 3D trong sách giáo khoa và phần mềm đều mang tính ước lệ sư phạm.',
    similarExampleEn: 'Note: All 3D educational models are pedagogical simplifications.'
  }
];
