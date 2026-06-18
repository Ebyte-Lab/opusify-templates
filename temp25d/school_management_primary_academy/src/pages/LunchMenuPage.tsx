import React from 'react';
import { LunchMenuCard } from '../components/features/lunch/LunchMenuCard';
import { mockLunchMenu } from '../data/mockLunchMenu';
import { useFetchMock } from '../hooks/useFetchMock';
import { Utensils, Apple } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const LunchMenuPage: React.FC = () => {
  // Simulated fetch of lunch menu data
  const { data: menu, isLoading } = useFetchMock(mockLunchMenu, 400);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="h-72 bg-gray-200 rounded-[2rem]" />
          <div className="h-72 bg-gray-200 rounded-[2rem]" />
          <div className="h-72 bg-gray-200 rounded-[2rem]" />
          <div className="h-72 bg-gray-200 rounded-[2rem]" />
          <div className="h-72 bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center">
          <Utensils size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-heading text-3xl text-text leading-tight">Weekly Cafeteria Menu</h1>
          <p className="text-sm font-semibold text-gray-400">
            Healthy meals, allergen specifications, and nutritional options
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      {menu && menu.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {menu.map((item) => (
            <LunchMenuCard key={item.day} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 font-semibold">Menu data is not available at this moment.</p>
        </div>
      )}

      {/* Allergen Guidelines Footer Panel */}
      <Card className="flex items-start gap-4 border-2 border-gray-100 bg-gray-50/50 p-6">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0 border border-gray-100">
          <Apple size={24} />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-text mb-1">Academy Nutrition Information</h3>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            All meals served at SunnySide Academy are nut-free and prepared under strict guidelines. Gluten-free, vegetarian, or dairy-free alternative meals are available daily upon request at the cafeteria counters. If your child has specific medical allergies, please submit an immunization and diet notification form to the nurse's office.
          </p>
        </div>
      </Card>
    </div>
  );
};
export default LunchMenuPage;
