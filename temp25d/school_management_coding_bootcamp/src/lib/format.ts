export function formatXp(xp: number): string {
  return xp.toLocaleString() + ' XP';
}

export function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) {
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  } else if (diffDays === 0) {
    const hours = Math.round(diffTime / (1000 * 60 * 60));
    if (hours > 0) {
      return `Due in ${hours} hours`;
    }
    return 'Due today';
  } else {
    const absDays = Math.abs(diffDays);
    if (absDays === 1) return 'Due 1 day ago';
    return `Due ${absDays} days ago`;
  }
}
