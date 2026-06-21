import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

export const WelcomeBanner: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleResume = () => {
    addToast('Resuming your last active module: Change Management', 'success');
    navigate('/courses');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-text mb-2">Welcome back, Michael.</h1>
        <p className="text-text/70 text-sm max-w-2xl">
          You have 2 modules pending for the 'Strategic Finance' curriculum. Your next live session begins in 3 days.
        </p>
      </div>
      <button
        onClick={handleResume}
        className="bg-primary hover:bg-[#0A365C] text-white px-5 py-2.5 rounded-sm text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Resume Curriculum
        <ArrowRight size={16} />
      </button>
    </div>
  );
};
