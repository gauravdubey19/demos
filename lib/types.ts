import { IconType } from "react-icons/lib";

// Product types
export interface ProductCategoryDetailParams {
  params: {
    category: string;
    slug: string;
  };
  searchParams?: { [type: string]: string };
}

export interface ProfileSectionParams {
  params: {
    section: string;
  };
}

export interface ProductSectionProps {
  category: string;
  categorySlug: string;
}
export interface ProductCategoryProps {
  category: string;
  type?: string;
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
  dots?: boolean;
  className?: string;
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
  type: string[];
  ratings: number;
  reviews: [];
  availableSizes: [string];
  colorOptions: {
    _id: string;
    title: string;
    color: string;
  }[];
}

export interface CardDetails {
  card: CardValues;
  category: string;
  loading?: boolean;
}

// Product Details types :
export interface ProductDetailValues {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  mainImage: string;
  price: number;
  oldPrice?: number;
  availableSizes: string[];
  colorOptions: {
    _id: string;
    title: string;
    color: string;
  }[];
  material: string;
  fabricType?: string;
  careInstructions?: string;
  origin: string;
  quantityInStock: number;
  brand: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  type: string;
  countryOfManufacture: string;
}

export interface ProductDetailProps {
  product: ProductDetailValues;
}

export interface DetailsProps {
  product: ProductDetailValues;
  categorySlug: string;
}

export interface ImageGalleryProps {
  images: string[];
  initialMainImage: string;
}
export interface ProductReviewsProps {
  slug: string;
}
export interface AdditionalInfoProps {
  product: {
    material: string;
    fabricType?: string;
    careInstructions?: string;
    origin: string;
    availableSizes: string[];
    colorOptions: {
      _id: string;
      title: string;
      color: string;
    }[];
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
  description: string;
  types: { _id: string; title: string; slug: string }[];
}

// Profile & Admin types
export interface ProfileAdminParams {
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

// | "personal-information"
// | "order-history"
// | "wishlist"
// | "payment-methods"
// | "account-settings"
// | "customer-support-&-help"
// |
export interface SectionValues {
  id: string;
  head: string;
  href: string;
  icon: IconType;
  sectionNode: () => React.JSX.Element;
  subSections?: {
    id: string;
    head: string;
    href: string;
    sectionNode: () => React.JSX.Element;
  }[];
}

export interface SectionProps {
  section: string;
  sections: SectionValues[];
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

// Cart

export interface CartItem {
  productId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  availableSizes: string[];
  selectedSize: string;
  colorOptions: {
    _id: string;
    title: string;
    color: string;
  }[];
  selectedColor: {
    title: string;
    color: string;
  };
  categorySlug: string;
}
