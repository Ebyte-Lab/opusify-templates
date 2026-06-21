import React from 'react';
import type { ContentBlock } from '../../types/lesson';
import { InlineQuizBlock } from './InlineQuizBlock';

interface LessonArticleProps {
  body: ContentBlock[];
}

export const LessonArticle: React.FC<LessonArticleProps> = ({ body }) => {
  return (
    <article className="prose prose-slate prose-lg max-w-none text-text font-body">
      {body.map((block, index) => {
        switch (block.type) {
          case 'lead':
            return (
              <p
                key={index}
                className="text-xl leading-relaxed text-text/90 mb-8 first-letter:text-5xl first-letter:font-heading first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:mt-1 first-letter:leading-[0.8]"
              >
                {block.text}
              </p>
            );
          case 'paragraph':
            return (
              <p key={index} className="mb-6 text-lg text-text/80 leading-relaxed">
                {block.text}
              </p>
            );
          case 'heading':
            return (
              <h2 key={index} className="font-heading text-2xl font-semibold mt-12 mb-6 text-[#0f172a]">
                {block.text}
              </h2>
            );
          case 'quote':
            return (
              <blockquote key={index} className="border-l-4 border-primary pl-6 italic text-text/70 my-10 font-heading text-xl leading-relaxed">
                "{block.text}"
                <span className="text-sm font-normal not-italic text-text/50 mt-2 block">
                  — {block.author}
                </span>
              </blockquote>
            );
          case 'quiz':
            return <InlineQuizBlock key={index} quiz={block.quiz} />;
          default:
            return null;
        }
      })}
    </article>
  );
};
