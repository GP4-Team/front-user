import React from 'react';
import Navbar from '../navigation/Navbar';
import SimpleFooter from './SimpleFooter';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <SimpleFooter />
    </div>
  );
};

export default MainLayout;
