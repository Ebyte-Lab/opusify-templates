import React from 'react';
import { GraduationCap, Calendar, Utensils, MessageSquare } from 'lucide-react';
import { HeroWelcomeBanner } from '../components/features/dashboard/HeroWelcomeBanner';
import { StarBehaviorTracker } from '../components/features/dashboard/StarBehaviorTracker';
import { WeeklyScheduleGrid } from '../components/features/dashboard/WeeklyScheduleGrid';
import { QuickActionTile } from '../components/features/dashboard/QuickActionTile';
import { useActiveChild } from '../hooks/useActiveChild';
import { useMessages } from '../hooks/useMessages';
import { useFetchMock } from '../hooks/useFetchMock';

export const HomePage: React.FC = () => {
  const { activeChild } = useActiveChild();
  const { totalUnreadCount } = useMessages();

  // Simulated fetching for page data
  const { isLoading } = useFetchMock(activeChild, 400);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 animate-pulse">
        {/* Welcome Hero Skeleton */}
        <div className="h-48 bg-gray-200 rounded-[2rem]" />

        {/* Behavior & Schedule Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="h-96 bg-gray-200 rounded-[2rem]" />
          <div className="lg:col-span-2 h-96 bg-gray-200 rounded-[2rem]" />
        </div>

        {/* Quick actions skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="h-24 bg-gray-200 rounded-[2rem]" />
          <div className="h-24 bg-gray-200 rounded-[2rem]" />
          <div className="h-24 bg-gray-200 rounded-[2rem]" />
          <div className="h-24 bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Welcome Hero Banner */}
      <HeroWelcomeBanner activeChild={activeChild} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Behavior / Star Tracker */}
        <div className="flex flex-col">
          <StarBehaviorTracker />
        </div>

        {/* Weekly Schedule Grid */}
        <div className="lg:col-span-2 flex flex-col">
          <WeeklyScheduleGrid />
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <QuickActionTile
          color="purple"
          icon={<GraduationCap size={24} />}
          title="View Grades"
          subtitle="Term 1 Reports"
          to="/grades"
        />

        <QuickActionTile
          color="blue"
          icon={<Calendar size={24} />}
          title="Attendance"
          subtitle="98% Present"
          to="/attendance"
        />

        <QuickActionTile
          color="green"
          icon={<Utensils size={24} />}
          title="Lunch Menu"
          subtitle="Pizza Friday!"
          to="/lunch"
        />

        <QuickActionTile
          color="pink"
          icon={<MessageSquare size={24} />}
          title="Messages"
          subtitle={totalUnreadCount > 0 ? `${totalUnreadCount} Unread` : 'No unread'}
          to="/messages"
          badgeCount={totalUnreadCount}
        />
      </div>
    </div>
  );
};
export default HomePage;
