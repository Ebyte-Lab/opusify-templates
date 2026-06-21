import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { lessonsData } from '../data/lessons';
import { InlineQuizBlock } from '../components/lesson/InlineQuizBlock';
import { ArrowLeft } from 'lucide-react';

export const QuizDetailPage: React.FC = () => {
  const { quizSlug } = useParams<{ quizSlug: string }>();

  // Find corresponding lesson and extract quiz
  const lesson = lessonsData.find(l => l.slug === quizSlug);
  const quizBlock = lesson?.body.find(b => b.type === 'quiz');
  const quiz = quizBlock?.type === 'quiz' ? quizBlock.quiz : null;

  if (!lesson || !quiz) {
    return (
      <div className="w-full max-w-[680px] mx-auto px-6 pt-32 pb-24 text-center font-body">
        <h1 className="font-heading text-3xl font-bold mb-4 text-[#0f172a]">Quiz Not Found</h1>
        <p className="mb-6 text-text/70">The quiz you are looking for does not exist or has been moved.</p>
        <Link to="/quizzes" className="text-primary hover:underline font-semibold font-heading">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[680px] mx-auto px-6 pt-32 pb-24 font-body text-text">
      {/* Back to Quizzes */}
      <div className="mb-8">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-widest text-text/40 hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Quizzes</span>
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-primary mb-4 font-semibold">
          <span>{lesson.moduleLabel} &middot; {lesson.topicLabel}</span>
        </div>
        <h1 className="font-heading text-4xl font-bold mb-4 text-[#0f172a] tracking-tight leading-tight">
          Quiz: {lesson.title}
        </h1>
        <p className="text-sm text-text/60 font-body">
          Select the correct answer to check your understanding. You must score 100% to pass.
        </p>
      </div>

      {/* Reusable Inline Quiz Widget */}
      <InlineQuizBlock quiz={quiz} />
    </div>
  );
};
