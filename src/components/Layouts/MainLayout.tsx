// src/layouts/MainLayout.tsx

import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header /> {/* Globalna nawigacja */}
      <main>{children}</main> {/* Główna zawartość strony */}
      <Footer /> {/* Stopka */}
    </div>
  );
};

export default MainLayout;
