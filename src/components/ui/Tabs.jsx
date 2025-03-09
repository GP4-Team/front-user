// src/components/ui/Tabs.jsx
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext({});

export const Tabs = ({ children, defaultValue, value, onValueChange, className = "" }) => {
  const [selectedTab, setSelectedTab] = useState(value || defaultValue);
  
  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    if (onValueChange) onValueChange(newValue);
  };
  
  return (
    <TabsContext.Provider value={{ value: value || selectedTab, onChange: handleTabChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className = "" }) => {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ children, value, className = "" }) => {
  const { value: selectedValue, onChange } = useContext(TabsContext);
  const isActive = selectedValue === value;
  
  return (
    <button
      className={`${className} ${isActive ? 'font-medium' : ''}`}
      onClick={() => onChange(value)}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, className = "" }) => {
  const { value: selectedValue } = useContext(TabsContext);
  
  if (selectedValue !== value) return null;
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};