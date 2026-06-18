import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Coffee, Utensils, AlertTriangle } from 'lucide-react';
import { LunchMenuItem } from '../../../types/lunch';

interface LunchMenuCardProps {
  item: LunchMenuItem;
}

export const LunchMenuCard: React.FC<LunchMenuCardProps> = ({ item }) => {
  const isPizzaFriday = item.day === 'Friday' && item.lunch.includes('Pizza');

  const cardStyles = isPizzaFriday
    ? 'border-2 border-primary bg-amber-50/20 relative overflow-hidden ring-4 ring-primary/10'
    : '';

  return (
    <Card className={`hoverable flex flex-col justify-between h-full ${cardStyles}`}>
      {/* Friday Pizza Highlight Header */}
      {isPizzaFriday && (
        <div className="absolute top-0 right-0 bg-primary text-text text-[9px] font-bold px-3 py-1 rounded-bl-2xl shadow-sm uppercase tracking-wider animate-pulse">
          Pizza Friday! 🍕
        </div>
      )}

      <div>
        <h3 className="font-heading font-bold text-xl text-text mb-4 border-b border-gray-100 pb-2">
          {item.day}
        </h3>

        {/* Breakfast */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5 text-gray-500 font-bold text-xs">
            <Coffee size={14} className="text-amber-500" />
            <span>BREAKFAST</span>
          </div>
          <p className="text-sm font-semibold text-text pl-6 leading-relaxed">{item.breakfast}</p>
        </div>

        {/* Lunch */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5 text-gray-500 font-bold text-xs">
            <Utensils size={14} className="text-green-500" />
            <span>LUNCH</span>
          </div>
          <p className="text-sm font-semibold text-text pl-6 leading-relaxed">{item.lunch}</p>
        </div>
      </div>

      {/* Allergens */}
      <div className="pt-4 border-t border-gray-100/50 mt-4">
        <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] mb-1.5">
          <AlertTriangle size={12} />
          <span>ALLERGEN CONCERNS</span>
        </div>
        <div className="flex flex-wrap gap-1 pl-4">
          {item.allergens.length > 0 ? (
            item.allergens.map((allergen, idx) => (
              <Badge key={idx} variant="red" className="text-[9px] py-0 px-2 font-bold">
                {allergen}
              </Badge>
            ))
          ) : (
            <span className="text-[10px] text-gray-400 font-semibold italic">None listed</span>
          )}
        </div>
      </div>
    </Card>
  );
};
export default LunchMenuCard;
