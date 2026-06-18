import { useState, useMemo } from 'react';
import { getWeekRange } from '../lib/date';

export function useWeekNavigation() {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekInfo = useMemo(() => {
    return getWeekRange(weekOffset);
  }, [weekOffset]);

  const nextWeek = () => setWeekOffset((prev) => prev + 1);
  const prevWeek = () => setWeekOffset((prev) => prev - 1);
  const resetWeek = () => setWeekOffset(0);

  return {
    weekOffset,
    weekInfo,
    nextWeek,
    prevWeek,
    resetWeek,
  };
}
export default useWeekNavigation;
