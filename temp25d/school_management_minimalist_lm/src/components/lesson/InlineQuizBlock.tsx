import React from 'react';
import type { QuizQuestion } from '../../types/lesson';
import { useQuiz } from '../../hooks/useQuiz';
import { useCourse } from '../../context/CourseContext';
import { HelpCircle } from 'lucide-react';
import clsx from 'clsx';

interface InlineQuizBlockProps {
  quiz: QuizQuestion;
}

export const InlineQuizBlock: React.FC<InlineQuizBlockProps> = ({ quiz }) => {
  const { submitQuizAttempt } = useCourse();
  const {
    selectedOptionId,
    setSelectedOptionId,
    isCorrect,
    checked,
    feedbackMessage,
    checkAnswer
  } = useQuiz(quiz);

  const handleCheck = () => {
    checkAnswer();
    const selectedOption = quiz.options.find(opt => opt.id === selectedOptionId);
    if (selectedOption?.correct) {
      submitQuizAttempt(quiz.id, 100);
    } else if (selectedOption) {
      submitQuizAttempt(quiz.id, 0);
    }
  };

  return (
    <div className="my-14 bg-secondary p-8 rounded-2xl border border-secondary/80 focus-hide">
      <div className="flex items-center gap-2 text-primary font-heading text-sm font-semibold mb-4 uppercase tracking-widest">
        <HelpCircle size={18} />
        <span>Knowledge Check</span>
      </div>
      
      <fieldset className="w-full">
        <legend className="font-heading text-xl font-semibold mb-6 text-[#0f172a] leading-snug">
          {quiz.prompt}
        </legend>
        
        <div className="space-y-3" id="quiz-options">
          {quiz.options.map(option => {
            const isSelected = selectedOptionId === option.id;
            const isOptionCorrect = option.correct;
            
            return (
              <label
                key={option.id}
                className={clsx(
                  "flex items-start gap-3 p-4 bg-white rounded-xl cursor-pointer border transition-all duration-200 group",
                  {
                    "border-primary/40 shadow-sm": isSelected && !checked,
                    "border-green-500 bg-green-50/50": checked && isSelected && isOptionCorrect,
                    "border-red-500 bg-red-50/50": checked && isSelected && !isOptionCorrect,
                    "border-transparent hover:border-primary/20": !isSelected,
                  }
                )}
              >
                <input
                  type="radio"
                  name={quiz.id}
                  checked={isSelected}
                  onChange={() => !checked && setSelectedOptionId(option.id)}
                  disabled={checked}
                  className="mt-1 accent-primary w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-text/90 font-medium select-none">{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={handleCheck}
          disabled={checked || !selectedOptionId}
          className={clsx(
            "bg-primary hover:bg-teal-600 text-white font-heading text-sm font-medium px-6 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "bg-teal-600": checked,
            }
          )}
        >
          {checked ? "Submitted" : "Check Answer"}
        </button>
        
        {feedbackMessage && (
          <div
            id="quiz-feedback"
            className={clsx("text-sm font-medium transition-opacity duration-300", {
              "text-green-600": isCorrect === true,
              "text-red-500": isCorrect === false,
              "text-text/50": isCorrect === null,
            })}
          >
            {feedbackMessage}
          </div>
        )}
      </div>
    </div>
  );
};
