import React from 'react';
import { Link } from 'react-router-dom';
import type { QuizQuestion } from '../../types/lesson';
import { useCourse } from '../../context/CourseContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { HelpCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface QuizCardProps {
  quiz: QuizQuestion;
  lessonTitle: string;
  lessonSlug: string;
  moduleLabel: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, lessonTitle, lessonSlug, moduleLabel }) => {
  const { quizAttempts } = useCourse();
  const attempt = quizAttempts[quiz.id];

  return (
    <div className="border border-secondary rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant="secondary">{moduleLabel}</Badge>
          {attempt ? (
            attempt.score === 100 ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600 font-heading">
                <CheckCircle size={14} /> Passed
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 font-heading">
                <AlertTriangle size={14} /> Try Again
              </span>
            )
          ) : (
            <span className="text-xs text-text/40 font-heading font-medium">Unattempted</span>
          )}
        </div>

        <h3 className="font-heading font-semibold text-lg text-[#0f172a] mb-2 leading-snug">
          Quiz: {lessonTitle}
        </h3>
        <p className="text-sm text-text/60 font-body mb-6">
          Test your knowledge on the key concepts presented in this lesson.
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-secondary/55">
        <span className="text-xs text-text/40 font-heading font-medium flex items-center gap-1.5">
          <HelpCircle size={13} /> {quiz.options.length} Options
        </span>
        
        <Link to={`/quizzes/${lessonSlug}`}>
          <Button variant={attempt ? "outline" : "primary"} size="sm">
            {attempt ? "Retake Quiz" : "Take Quiz"}
          </Button>
        </Link>
      </div>
    </div>
  );
};
