import { useState, useCallback } from 'react';
import type { ActivityEntry, DealStage } from '../types';

export const useActivityFeed = (initialEntries: ActivityEntry[] = []) => {
  const [activities, setActivities] = useState<ActivityEntry[]>(initialEntries);

  const logStageChange = useCallback((dealTitle: string, stage: DealStage) => {
    let iconColor = 'bg-blue-100 text-blue-500';

    if (stage === 'proposal') {
      iconColor = 'bg-amber-100 text-amber-500';
    } else if (stage === 'negotiation') {
      iconColor = 'bg-purple-100 text-purple-500';
    } else if (stage === 'won') {
      iconColor = 'bg-green-100 text-green-500';
    }

    const newEntry: ActivityEntry = {
      id: `act-${Date.now()}`,
      type: 'moved',
      dealTitle,
      stage,
      author: 'Sarah Jenkins',
      time: 'Just now',
      iconColor
    };

    setActivities(prev => [newEntry, ...prev]);
  }, []);

  const logNote = useCallback((dealTitle: string, note: string) => {
    const newEntry: ActivityEntry = {
      id: `act-${Date.now()}`,
      type: 'note',
      dealTitle,
      note,
      author: 'Sarah Jenkins',
      time: 'Just now',
      iconColor: 'bg-pink-100 text-pink-500'
    };

    setActivities(prev => [newEntry, ...prev]);
  }, []);

  const logCreate = useCallback((dealTitle: string, stage: DealStage) => {
    let iconColor = 'bg-blue-100 text-blue-500';

    if (stage === 'proposal') {
      iconColor = 'bg-amber-100 text-amber-500';
    } else if (stage === 'negotiation') {
      iconColor = 'bg-purple-100 text-purple-500';
    } else if (stage === 'won') {
      iconColor = 'bg-green-100 text-green-500';
    }

    const newEntry: ActivityEntry = {
      id: `act-${Date.now()}`,
      type: 'created',
      dealTitle,
      stage,
      author: 'Sarah Jenkins',
      time: 'Just now',
      iconColor
    };

    setActivities(prev => [newEntry, ...prev]);
  }, []);

  return {
    activities,
    logStageChange,
    logNote,
    logCreate
  };
};
