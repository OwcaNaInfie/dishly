
export interface CarouselSlideProps {
  img: string;
	alt?: string;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ img, alt }) => {

	return (
		<div className="carousel-slide">
			<div className="flex h-full justify-center">
				<img src={img} className="size-full object-cover" alt={alt} />
			</div>
		</div>
	)
}
	
export default CarouselSlide;