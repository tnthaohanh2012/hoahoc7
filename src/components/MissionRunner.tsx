import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Download,
  Check,
  Trophy
} from 'lucide-react';
import { Language, Question } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { TRANSLATIONS } from '../data/translations';
import { sound } from '../utils/sound';

interface Props {
  language: Language;
  onCompleteModule: (modNum: number, score: number) => void;
}

export const MissionRunner: React.FC<Props> = ({ language, onCompleteModule }) => {
  const t = TRANSLATIONS[language];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, { choice: string; isCorrect: boolean }>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: Question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (submitted) return;
    sound.playTap();
    setSelectedOption(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentQ.correctAnswer;
    setSubmitted(true);

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playTryAgain();
    }

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: { choice: selectedOption, isCorrect }
    }));
  };

  const handleRetryQuestion = () => {
    sound.playTap();
    setSelectedOption(null);
    setSubmitted(false);
  };

  const handleNextQuestion = () => {
    sound.playTap();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setShowHint(false);
    } else {
      // Finished quiz!
      sound.playFanfare();
      setIsFinished(true);

      // Compute final score
      const correctCount = Object.values({
        ...userAnswers,
        [currentQ.id]: { choice: selectedOption!, isCorrect: selectedOption === currentQ.correctAnswer }
      }).filter(a => a.isCorrect).length;

      const finalPercent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
      onCompleteModule(6, finalPercent);
    }
  };

  const calculateFinalStats = () => {
    const total = QUIZ_QUESTIONS.length;
    const correct = Object.values(userAnswers).filter(a => a.isCorrect).length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 80;
    return { total, correct, percentage, passed };
  };

  const restartQuiz = () => {
    sound.playTap();
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setUserAnswers({});
    setShowHint(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const { total, correct, percentage, passed } = calculateFinalStats();

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t['quiz.completeTitle']}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t['quiz.completeDesc']}
            </p>
          </div>

          {/* Score Circle */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t['quiz.score']}
            </span>
            <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
              {percentage}%
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {language === 'vi' 
                ? `Đúng ${correct} trên tổng số ${total} câu hỏi.` 
                : `${correct} out of ${total} questions correct.`}
            </div>
          </div>

          {passed ? (
            /* Certificate of Achievement */
            <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-2 border-amber-300 dark:border-amber-700 shadow-md space-y-3 text-amber-950 dark:text-amber-200">
              <div className="flex items-center justify-center gap-2 font-bold text-amber-700 dark:text-amber-400 text-sm">
                <Sparkles className="w-5 h-5" />
                <span>{t['quiz.passBadge']}</span>
              </div>
              <h3 className="text-lg font-extrabold uppercase tracking-wide">
                {t['quiz.certificate']}
              </h3>
              <p className="text-xs leading-relaxed max-w-md mx-auto text-amber-900 dark:text-amber-300">
                {language === 'vi'
                  ? 'Chứng nhận người học đã hoàn thành xuất sắc các mục tiêu kiến thức cốt lõi KHTN 7 Kết nối tri thức: Cấu tạo nguyên tử, Ký hiệu hóa học, Bảng tuần hoàn, Hóa trị và Mô hình phân tử.'
                  : 'Certifies that the learner has successfully demonstrated mastery of Grade 7 Chemistry fundamentals: Atomic structure, Chemical symbols, Periodic table, Valency, and Molecular models.'}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
              {language === 'vi'
                ? 'Bạn đạt dưới 80% chuẩn đầu ra. Đừng nản lòng nhé! Hãy xem lại các bài học và nhấn "Làm lại bài kiểm tra" để cải thiện kết quả.'
                : 'Score is under the 80% mastery target. Review previous modules and click "Try Quiz Again" to improve.'}
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t['action.reset']}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentCorrect = submitted && selectedOption === currentQ.correctAnswer;
  const isCurrentWrong = submitted && selectedOption !== currentQ.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-300 text-xs font-semibold border border-yellow-200 dark:border-yellow-800 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Đánh giá năng lực KHTN 7' : 'Curriculum Assessment'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t['quiz.title']}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {language === 'vi'
            ? '10 câu hỏi bao quát toàn bộ trọng tâm Bài 2 đến Bài 7 kèm giải thích chi tiết, ví dụ tương tự và quyền thử lại.'
            : '10 comprehensive questions covering Lessons 2 through 7 with explanations, similar examples, and retries.'}
        </p>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        {/* Progress Bar & Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t['quiz.question']} {currentIdx + 1} / {QUIZ_QUESTIONS.length}
          </span>
          <div className="flex items-center gap-1.5">
            {QUIZ_QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIdx
                    ? 'w-5 bg-emerald-500'
                    : userAnswers[QUIZ_QUESTIONS[i].id]?.isCorrect
                    ? 'bg-emerald-400'
                    : userAnswers[QUIZ_QUESTIONS[i].id]
                    ? 'bg-rose-400'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Prompt */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {language === 'vi' ? currentQ.promptVi : currentQ.promptEn}
          </h3>

          {/* Hint button */}
          {!submitted && (
            <div>
              {!showHint ? (
                <button
                  onClick={() => {
                    sound.playTap();
                    setShowHint(true);
                  }}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t['action.showHint']}</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                  💡 {language === 'vi' ? currentQ.hintVi : currentQ.hintEn}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options?.map(opt => {
            const isChosen = selectedOption === opt.id;
            const isAnswer = opt.id === currentQ.correctAnswer;

            let optClass = 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200';

            if (submitted) {
              if (isAnswer) {
                optClass = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-bold';
              } else if (isChosen && !isAnswer) {
                optClass = 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100';
              } else {
                optClass = 'border-slate-200 dark:border-slate-700 opacity-60 text-slate-500';
              }
            } else if (isChosen) {
              optClass = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={submitted}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between text-xs sm:text-sm focus:outline-none ${optClass}`}
              >
                <span>{language === 'vi' ? opt.textVi : opt.textEn}</span>
                {submitted && isAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                {submitted && isChosen && !isAnswer && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Check Button (before submit) */}
        {!submitted && (
          <div className="pt-2">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 focus:outline-none"
            >
              <Check className="w-4 h-4" />
              <span>{t['action.check']}</span>
            </button>
          </div>
        )}

        {/* Feedback Section (Mandatory 3 components: Explanation + Similar Example + Retry) */}
        {submitted && (
          <div className={`p-5 rounded-3xl border text-xs space-y-4 ${
            isCurrentCorrect
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              {isCurrentCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{t['feedback.correct']}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>{t['feedback.tryAgain']}</span>
                </>
              )}
            </div>

            {/* 1. Deep Scientific Explanation */}
            <div className="space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider text-[10px]">
                {t['feedback.explanation']}:
              </span>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                {language === 'vi' ? currentQ.explanationVi : currentQ.explanationEn}
              </p>
            </div>

            {/* 2. Similar Example */}
            <div className="space-y-1 bg-white/60 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider text-[10px]">
                {t['action.similarExample']}:
              </span>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                {language === 'vi' ? currentQ.similarExampleVi : currentQ.similarExampleEn}
              </p>
            </div>

            {/* 3. Action Buttons: Retry vs Next */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {isCurrentWrong && (
                <button
                  onClick={handleRetryQuestion}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-50 flex items-center gap-1.5 focus:outline-none shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t['action.retry']}</span>
                </button>
              )}

              <button
                onClick={handleNextQuestion}
                className="ml-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 focus:outline-none"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? t['action.next'] : 'Xem kết quả bài thi'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
