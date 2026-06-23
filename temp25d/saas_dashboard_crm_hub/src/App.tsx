import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { initialDeals } from './data/deals';
import { useKanban } from './hooks/useKanban';
import { useActivityFeed } from './hooks/useActivityFeed';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileHeader } from './components/layout/MobileHeader';
import { NewDealModal } from './components/kanban/NewDealModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ContactsPage } from './pages/ContactsPage';
import { DealsPage } from './pages/DealsPage';
import { TasksPage } from './pages/TasksPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import type { DealStage, ActivityEntry } from './types';

const initialActivities: ActivityEntry[] = [
  {
    id: 'act-1',
    type: 'moved',
    dealTitle: 'Municipal Data Portal',
    stage: 'won',
    author: 'Sarah Jenkins',
    time: '35m ago',
    iconColor: 'bg-green-100 text-green-500'
  },
  {
    id: 'act-2',
    type: 'note',
    dealTitle: 'Cloud Infrastructure Audit',
    note: 'Client requested revision of pricing structures. Scheduled sync call for Friday.',
    author: 'Sarah Jenkins',
    time: '2h ago',
    iconColor: 'bg-pink-100 text-pink-500'
  },
  {
    id: 'act-3',
    type: 'moved',
    dealTitle: 'Brokerage Integration Gateway',
    stage: 'negotiation',
    author: 'Sarah Jenkins',
    time: '5h ago',
    iconColor: 'bg-purple-100 text-purple-500'
  }
];

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);

  // Activity Feed State Manager
  const { activities, logStageChange, logNote, logCreate } = useActivityFeed(initialActivities);

  // Kanban Pipeline State Manager
  const {
    columns,
    dragCard,
    allowDrop,
    dropCard,
    addDeal,
    columnCounts,
    moveCardDirectly
  } = useKanban(initialDeals, (deal, newStage) => {
    logStageChange(deal.title, newStage);
  });

  // Flat deals list derived from columns
  const allDeals = useMemo(() => {
    return [
      ...columns.contacted,
      ...columns.proposal,
      ...columns.negotiation,
      ...columns.won
    ];
  }, [columns]);

  const handleCreateDealSubmit = (dealData: { title: string; company: string; value: number; stage: DealStage }) => {
    // Generate a default badge color for style representation
    const colors = ['bg-blue-50 text-blue-600', 'bg-pink-50 text-pink-600', 'bg-amber-50 text-amber-600', 'bg-purple-50 text-purple-600'];
    const badgeColor = colors[Math.floor(Math.random() * colors.length)];

    const newDeal = addDeal({
      ...dealData,
      badgeColor
    });

    logCreate(newDeal.title, newDeal.stage);
  };

  const handlePostNote = (dealTitle: string, noteContent: string) => {
    logNote(dealTitle, noteContent);
  };

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-bg text-text">
        {/* Sidebar Drawer */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Content Viewport Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile hamburger header */}
          <MobileHeader onMenuToggle={() => setIsMobileMenuOpen(prev => !prev)} />

          {/* Desktop Search & Action header */}
          <TopBar onAddDealClick={() => setIsNewDealModalOpen(true)} />

          {/* Page Routing viewport */}
          <main className="flex-grow overflow-y-auto p-6 md:p-8">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    deals={allDeals}
                    columns={columns}
                    columnCounts={columnCounts}
                    dragCard={dragCard}
                    allowDrop={allowDrop}
                    dropCard={dropCard}
                    moveCardDirectly={moveCardDirectly}
                    activities={activities}
                    onPostNote={handlePostNote}
                  />
                }
              />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route
                path="/deals"
                element={<DealsPage deals={allDeals} />}
              />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route
                path="/analytics"
                element={<AnalyticsPage deals={allDeals} />}
              />
            </Routes>
          </main>
        </div>

        {/* Create Deal Modal Form */}
        <NewDealModal
          isOpen={isNewDealModalOpen}
          onClose={() => setIsNewDealModalOpen(false)}
          onSubmit={handleCreateDealSubmit}
        />
      </div>
    </HashRouter>
  );
};

export default App;
