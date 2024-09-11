// Product types
export interface ProductCategoryDetailParams {
  params: {
    category: string;
    slug: string;
  };
}

export interface ProfileSectionParams {
  params: {
    section: string;
  };
}

export interface ProductSectionProps {
  category: string;
  categorySlug: string;
  carousel: CardValues[];
}
export interface ProductCategoryProps {
  category: string;
}
export interface LinkValues {
  id: number;
  head: string;
  href: string;
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

// Product Card types :
export interface CardValues {
  _id: string;
  mainImage: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  oldPrice: number;
  discount: number;
  ratings: number;
  reviews: [];
}

export interface CardDetails {
  card: CardValues;
  category: string;
}

// Product Details types :
export interface ProductDetailValues {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  mainImage: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  ratings: number;
  reviews: [];
  colors: string[];
  material: string;
  fabricType: string;
  careInstructions: string;
  origin: string;
  availableSizes: string[];
  colorOptions: string[];
  countryOfManufacture: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}
export interface ProductDetailProps {
  product: ProductDetailValues;
}

export interface DetailsProps {
  product: ProductDetailValues;
}

export interface ImageGalleryProps {
  images: string[];
  initialMainImage: string;
}

export interface AdditionalInfoProps {
  product: {
    material: string;
    fabricType: string;
    careInstructions: string;
    origin: string;
    availableSizes: string[];
    colorOptions: string[];
    countryOfManufacture: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}
export interface CategoryValues {
  _id: string;
  title: string;
  slug: string;
  image: string;
}

// Profile types
export interface ProfileParams {
  params: {
    section: string;
  };
  children?: React.ReactNode;
}

export interface InputFieldProps {
  id: string;
  label: string;
  defaultValue?: string;
  type?: string;
  isDisabled?: boolean;
  capitalize?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  formValidation?: (value: string) => string;
}

export interface SectionValues {
  id:
    | "personal-information"
    | "order-history"
    | "wishlist"
    | "payment-methods"
    | "account-settings"
    | "customer-support-&-help"
    | string;
  head: string;
  icon: React.ReactNode;
}

export interface SectionProps {
  section: string;
}

// Footer
export interface FooterLink {
  label: string;
  href: string;
  icon?: React.ElementType;
  color?: string;
}

export interface FooterSection {
  title?: string;
  links?: FooterLink[];
  isNewsletter?: boolean;
  isSocialLinks?: boolean;
  isCopyRight?: boolean;
}

export interface FormStatus {
  status?: string;
  message?: string;
}
