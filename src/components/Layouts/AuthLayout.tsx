import React, { useEffect } from 'react';
import Heading from '../Heading/Heading';
import Carousel from '../Carousel/Carousel';
import Footer from '../Footer/Footer';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const slides = [
  { img: '/src/assets/images/a.jpg', alt: 'Slajd 1' },
  { img: '/src/assets/images/b.jpg', alt: 'Slajd 2' },
  { img: '/src/assets/images/d.jpg', alt: 'Slajd 4' },
  { img: '/src/assets/images/e.jpg', alt: 'Slajd 5' },
  { img: '/src/assets/images/g.jpg', alt: 'Slajd 7' },
  { img: '/src/assets/images/l.jpg', alt: 'Slajd 12' },
  { img: '/src/assets/images/m.jpg', alt: 'Slajd 13' },
  { img: '/src/assets/images/n.jpg', alt: 'Slajd 14' },
  { img: '/src/assets/images/p.jpg', alt: 'Slajd 16' },
  { img: '/src/assets/images/s.jpg', alt: 'Slajd 19' },
  { img: '/src/assets/images/u.jpg', alt: 'Slajd 21' },
];


const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {

  useEffect(() => {
    // Inicjalizacja FlyonUI Carousel
    window.HSStaticMethods.autoInit(["carousel"])
  }, []);

  return (
    <div className='h-dvh flex flex-col justify-between'>
      <div className='p-8 w-full flex-1 flex justify-center'>
          <div className='flex flex-col md:flex-row h-5/6 max-w-7xl mx-auto my-auto'>
            <Carousel slides={slides} />
            <div className="flex flex-col p-8">
              <Heading className="text-center" type="h1" title="Najlepsze przepisy w zasięgu Twojej ręki!" />
                { children }
            </div>
        </div>
      </div>
      <Footer className='flex-none'/>
    </div>
  );
};

export default AuthLayout;
