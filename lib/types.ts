export interface ProductProps {
  productName: string;
  href: string;
  carousel: CardProps[];
}

export interface CardProps {
  id: number;
  img: string;
  head: string;
  description: string;
  href: string;
}

export interface CarouselProps {
  children: React.ReactNode;
  infinite?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  arrows?: boolean;
}
