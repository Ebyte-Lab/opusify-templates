import React from 'react';
import { lessonsData } from '../data/lessons';
import { QuizCard } from '../components/quiz/QuizCard';

export const QuizzesPage: React.FC = () => {
  // Extract all quizzes from lessons
  const quizzes = lessonsData
    .map(lesson => {
      const quizBlock = lesson.body.find(b => b.type === 'quiz');
      if (quizBlock && quizBlock.type === 'quiz') {
        return {
          quiz: quizBlock.quiz,
          lessonTitle: lesson.title,
          lessonSlug: lesson.slug,
          moduleLabel: lesson.moduleLabel,
        };
      }
      return null;
    })
    .filter((q): q is Exclude<typeof q, null> => q !== null);

  return (
    <div className="w-full max-w-[680px] mx-auto px-6 pt-32 pb-24 font-body text-text">
      {/* Page Header */}
      <div className="mb-10 focus-hide transition-opacity duration-500">
        <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-primary mb-4 font-semibold">
          <span>Assessments</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6 text-[#0f172a] tracking-tight leading-tight">
          Knowledge Checks
        </h1>
        <p className="text-lg text-text/75 leading-relaxed">
          Test your comprehension of the core learning materials. Each module contains a knowledge check designed to validate your understanding.
        </p>
      </div>

      {/* Quizzes List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {quizzes.map(item => (
          <QuizCard
            key={item.quiz.id}
            quiz={item.quiz}
            lessonTitle={item.lessonTitle}
            lessonSlug={item.lessonSlug}
            moduleLabel={item.moduleLabel}
          />
        ))}
      </div>
    </div>
  );
};
