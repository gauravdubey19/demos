export interface ProductCategoryDetailParams {
  params: {
    category: string;
    id: number;
  };
}
export interface ProfileParams {
  params: {
    section: string;
  };
  children?: React.ReactNode;
}
export interface ProfileSectionParams {
  params: {
    section: string;
  };
}

export interface ProductSectionProps {
  category: string;
  href: string;
  carousel: CardValues[];
}
export interface ProductCategoryProps {
  category: string;
  products: CardValues[];
}
export interface LinkValues {
  id: number;
  head: string;
  href: string;
}
export interface CardValues {
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
