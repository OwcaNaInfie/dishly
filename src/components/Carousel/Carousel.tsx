import CarouselSlide, { CarouselSlideProps } from "./CarouselSlide";

interface CarouselProps {
  slides: CarouselSlideProps[]; // Lista slajdów do wyświetlenia
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {

  return (
    <div
      id="indicators"
      data-carousel='{ "loadingClasses": "opacity-0", "dotsItemClasses": "carousel-dot", "isAutoPlay": true, "speed": 5000 }'
      className="relative w-2/3 md:w-1/2 max-w-lg mx-auto"
    >
      <div className="carousel h-full">
        <div className="carousel-body h-full opacity-0">
          
        {slides.map((slide, index) => (
          <CarouselSlide 
            key={index} 
            img={slide.img} 
            alt={slide.alt}
          />
        ))}
        </div>
      </div>
      <div className="carousel-pagination absolute bottom-3 end-0 start-0 flex justify-center gap-3"></div>
    </div>
  )
}

export default Carousel;