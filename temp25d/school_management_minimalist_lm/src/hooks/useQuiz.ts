import { useState } from 'react';
import type { QuizQuestion } from '../types/lesson';

export const useQuiz = (quiz: QuizQuestion) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const checkAnswer = () => {
    if (!selectedOptionId) {
      setFeedbackMessage('Please select an answer.');
      setIsCorrect(null);
      setChecked(false);
      return;
    }

    const selectedOption = quiz.options.find(opt => opt.id === selectedOptionId);
    if (!selectedOption) return;

    setChecked(true);
    if (selectedOption.correct) {
      setIsCorrect(true);
      setFeedbackMessage(quiz.correctFeedback);
    } else {
      setIsCorrect(false);
      setFeedbackMessage(quiz.incorrectFeedback);
    }
  };

  const resetQuiz = () => {
    setSelectedOptionId(null);
    setIsCorrect(null);
    setChecked(false);
    setFeedbackMessage('');
  };

  return {
    selectedOptionId,
    setSelectedOptionId,
    isCorrect,
    checked,
    feedbackMessage,
    checkAnswer,
    resetQuiz
  };
};
