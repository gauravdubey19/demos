export interface ProductCategoryDetailParams {
  params: {
    category: string;
    id: number;
  };
}

export interface ProductSectionProps {
  category: string;
  href: string;
  carousel: CardProps[];
}
export interface ProductCategoryProps {
  category: string;
  products: CardProps[];
}

export interface CardProps {
  id: number;
  img: string;
  head: string;
  description: string;
  href: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rate?: number;
  review?: number;
}

export interface CarouselProps {
  children: React.ReactNode;
  infinite?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
  slidesToShow?: number;
  arrows?: boolean;
}
