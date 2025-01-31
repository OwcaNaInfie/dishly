import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    useEffect(() => {
      // Inicjalizacja FlyonUI Carousel
      window.HSStaticMethods.autoInit(["dropdown"])
    }, []);
  return (
    <div className='h-dvh flex flex-col'>
      <Header className='flex-none' /> {/* Globalna nawigacja */}
      <main className='p-8 w-full flex-1 flex justify-center max-w-7xl mx-auto '>{children}</main> {/* Główna zawartość strony */}
      <Footer className='flex-none' /> {/* Stopka */}
    </div>
  );
};

export default MainLayout;
