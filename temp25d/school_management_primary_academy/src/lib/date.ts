/**
 * Returns a time-of-day greeting (e.g. Good Morning, Good Afternoon, Good Evening)
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good Morning';
  } else if (hour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

/**
 * Formats a week range based on an offset from the current date.
 * Returns an object with the display label (e.g., "Oct 12 - 16") and start/end Dates.
 */
export function getWeekRange(offsetWeeks: number = 0): {
  label: string;
  start: Date;
  end: Date;
  days: { name: string; date: Date }[];
} {
  const current = new Date();
  // Adjust for the week offset
  current.setDate(current.getDate() + offsetWeeks * 7);

  // Get current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDay = current.getDay();
  // Calculate Monday of the current week (if Sunday, go back 6 days)
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  const monday = new Date(current);
  monday.setDate(current.getDate() + distanceToMonday);
  monday.setHours(0, 0, 0, 0);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  friday.setHours(23, 59, 59, 999);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const startMonth = months[monday.getMonth()];
  const endMonth = months[friday.getMonth()];
  
  const startDay = monday.getDate();
  const endDay = friday.getDate();

  let label = '';
  if (startMonth === endMonth) {
    label = `${startMonth} ${startDay} - ${endDay}`;
  } else {
    label = `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((dayName, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    return { name: dayName, date: d };
  });

  return {
    label,
    start: monday,
    end: friday,
    days,
  };
}
