import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lessonsData } from '../data/lessons';
import { LessonHero } from '../components/lesson/LessonHero';
import { LessonVideoPlayer } from '../components/lesson/LessonVideoPlayer';
import { LessonArticle } from '../components/lesson/LessonArticle';
import { LessonFooterNav } from '../components/lesson/LessonFooterNav';
import { useCourse } from '../context/CourseContext';

export const LessonPage: React.FC = () => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const { setPipDismissed, setPipActive } = useCourse();

  // Find active lesson (defaulting to the first one if empty)
  const activeSlug = lessonSlug || 'color-theory';
  const lesson = lessonsData.find(l => l.slug === activeSlug);

  useEffect(() => {
    // Reset Picture in Picture state when navigating to another lesson
    setPipDismissed(false);
    setPipActive(false);
    
    // Scroll viewport to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [lessonSlug, setPipDismissed, setPipActive]);

  if (!lesson) {
    return (
      <div className="w-full max-w-[680px] mx-auto px-6 pt-32 pb-24 text-center font-body">
        <h1 className="font-heading text-3xl font-bold mb-4 text-[#0f172a]">Lesson Not Found</h1>
        <p className="mb-6 text-text/70">The lesson you are looking for does not exist or has been moved.</p>
        <Link to="/syllabus" className="text-primary hover:underline font-semibold font-heading">
          Return to Syllabus
        </Link>
      </div>
    );
  }

  const prevLesson = lessonsData.find(l => l.slug === lesson.prevLessonSlug);
  const nextLesson = lessonsData.find(l => l.slug === lesson.nextLessonSlug);

  return (
    <div className="w-full max-w-[680px] mx-auto px-6 pt-32 pb-24 font-body text-text relative">
      <LessonHero lesson={lesson} />
      
      {lesson.hasVideo && (
        <LessonVideoPlayer thumbnailUrl={lesson.videoThumbnailUrl} />
      )}
      
      <LessonArticle body={lesson.body} />
      
      <LessonFooterNav
        lessonSlug={lesson.slug}
        prevLessonSlug={lesson.prevLessonSlug}
        nextLessonSlug={lesson.nextLessonSlug}
        prevLessonTitle={prevLesson?.title}
        nextLessonTitle={nextLesson?.title}
      />
    </div>
  );
};
