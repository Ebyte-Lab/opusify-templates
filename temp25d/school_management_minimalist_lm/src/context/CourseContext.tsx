/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { syllabusData } from '../data/syllabus';

export interface QuizAttempt {
  quizSlug: string;
  score: number;
  completed: boolean;
}

export interface UserPreferences {
  focusMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface CourseContextType {
  completedLessons: Record<string, boolean>;
  quizAttempts: Record<string, QuizAttempt>;
  preferences: UserPreferences;
  readingProgress: number;
  pipActive: boolean;
  pipDismissed: boolean;
  setReadingProgress: (val: number) => void;
  setPipActive: (val: boolean) => void;
  setPipDismissed: (val: boolean) => void;
  toggleLessonComplete: (slug: string) => void;
  submitQuizAttempt: (quizSlug: string, score: number) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  resetProgress: () => void;
  getModuleProgress: (moduleId: string) => number;
  getOverallProgress: () => number;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('lumina_completed_lessons');
    return saved ? JSON.parse(saved) : {};
  });

  const [quizAttempts, setQuizAttempts] = useState<Record<string, QuizAttempt>>(() => {
    const saved = localStorage.getItem('lumina_quiz_attempts');
    return saved ? JSON.parse(saved) : {};
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('lumina_preferences');
    return saved ? JSON.parse(saved) : {
      focusMode: false,
      emailNotifications: true,
      pushNotifications: false,
    };
  });

  const [readingProgress, setReadingProgress] = useState(0);
  const [pipActive, setPipActive] = useState(false);
  const [pipDismissed, setPipDismissed] = useState(false);

  useEffect(() => {
    localStorage.setItem('lumina_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('lumina_quiz_attempts', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem('lumina_preferences', JSON.stringify(preferences));
    // Mirror focus mode class on document body
    if (preferences.focusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  }, [preferences]);

  const toggleLessonComplete = (slug: string) => {
    setCompletedLessons(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const submitQuizAttempt = (quizSlug: string, score: number) => {
    setQuizAttempts(prev => ({
      ...prev,
      [quizSlug]: {
        quizSlug,
        score,
        completed: true
      }
    }));
  };

  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPrefs
    }));
  };

  const resetProgress = () => {
    setCompletedLessons({});
    setQuizAttempts({});
    setPreferences({
      focusMode: false,
      emailNotifications: true,
      pushNotifications: false,
    });
    setReadingProgress(0);
    setPipActive(false);
    setPipDismissed(false);
  };

  const getModuleProgress = (moduleId: string): number => {
    const module = syllabusData.find(m => m.id === moduleId);
    if (!module || module.lessons.length === 0) return 0;
    const completedCount = module.lessons.filter(l => completedLessons[l.slug]).length;
    return Math.round((completedCount / module.lessons.length) * 100);
  };

  const getOverallProgress = (): number => {
    const totalLessons = syllabusData.reduce((acc, m) => acc + m.lessons.length, 0);
    if (totalLessons === 0) return 0;
    const completedCount = Object.values(completedLessons).filter(Boolean).length;
    return Math.round((completedCount / totalLessons) * 100);
  };

  return (
    <CourseContext.Provider value={{
      completedLessons,
      quizAttempts,
      preferences,
      readingProgress,
      pipActive,
      pipDismissed,
      setReadingProgress,
      setPipActive,
      setPipDismissed,
      toggleLessonComplete,
      submitQuizAttempt,
      updatePreferences,
      resetProgress,
      getModuleProgress,
      getOverallProgress
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
