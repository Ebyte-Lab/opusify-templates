import React, { createContext, useContext, useState } from 'react';
import { Child } from '../../types/child';
import { mockChildren } from '../../data/mockChildren';

interface ChildContextType {
  activeChild: Child;
  children: Child[];
  setActiveChild: (id: string) => void;
  incrementStars: (childId: string) => void;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [childrenList, setChildrenList] = useState<Child[]>(mockChildren);
  const [activeId, setActiveId] = useState<string>(mockChildren[0].id);

  const activeChild = childrenList.find((c) => c.id === activeId) || childrenList[0];

  const setActiveChild = (id: string) => {
    setActiveId(id);
  };

  const incrementStars = (childId: string) => {
    setChildrenList((prev) =>
      prev.map((c) => {
        if (c.id === childId) {
          if (c.earnedStars < c.weeklyStarGoal) {
            return { ...c, earnedStars: c.earnedStars + 1 };
          }
        }
        return c;
      })
    );
  };

  return (
    <ChildContext.Provider value={{ activeChild, children: childrenList, setActiveChild, incrementStars }}>
      {children}
    </ChildContext.Provider>
  );
};

export const useActiveChild = () => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useActiveChild must be used within a ChildProvider');
  }
  return context;
};
