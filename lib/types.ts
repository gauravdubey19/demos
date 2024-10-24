import { Review } from "@/context/GlobalProvider";
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

export interface ColorObject{
  color: string;
  color_name: string;
  image_link: string;
  images: string[];
  quantity: Array<{
    size: string;
    quantity: number;
  }>;
}
export interface ColorCartObject{
  color: string;
  color_name: string;
  image_link: string;
  quantity: Array<{
    size: string;
    quantity: number;
  }>;
}
// Product Card types :
export interface CardValues {
  _id: string;
  title: string;
  images_collection: Array<{
    color: string;
    color_name: string;
    image_link: string;
    images: string[];
    quantity: Array<{
      size: string;
      quantity: number;
    }>;
  }>;
  description: string;
  slug: string;
  sell_on_google_quantity: number;
  price: number;
  salePrice: number;
  type: string[];
  reviewsNumber?: number;
  ratings?: number;
  reviews: [];
  categories: {
    _id: string;
    title: string;
    slug: string;
  }[];
}

// export interface CardValues {
//   _id: string;
//   title: string;
//   slug: string;
//   description: string;
//   price: number;
//   oldPrice?: number;
//   quantityInStock: number;
//   images?: string[];
//   colorOptions: Array<{ color: string; title: string; _id?: string }>;
//   reviewsNumber?: number;
//   ratings?: number;
//   images_collection: Array<{
//     color: string;
//     color_name: string;
//     image_link: string;
//     quantity: Array<{
//       size: string;
//       quantity: number;
//     }>;
//   }>;
// }

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
  price: number;
  salePrice?: number;
  sell_on_google_quantity: number;
  images_collection: Array<{
    color: string;
    color_name: string;
    image_link: string;
    images: string[];
    quantity: Array<{
      size: string;
      quantity: number;
    }>;
  }>;
  categories: {
    _id: string;
    title: string;
    slug: string;
  }[];
  types: {
    _id: string;
    title: string;
    slug: string;
  }[];
  material: string;
  fabricType?: string;
  careInstructions?: string;
  origin: string;
  brand: string;
  faqs: {
    _id: string;
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
  avgRating: number;
  reviewsLength: number;
  size: string;
  color: string;
  setColor: (color: string) => void;
  setSize: (size: string) => void;
  colorTitle: string;
   setColorTitle: (colorTitle: string) => void;
   isValuesSelected: { size: boolean; color: boolean; colorTitle: boolean; };
    setIsValuesSelected: (isValuesSelected: any) => void;
}

export interface ImageGalleryProps {
  images: string[];
  initialImageLink: string;
}
export interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  loading: boolean;
}
export interface AdditionalInfoProps {
  product: {
    material?: string;
    fabricType?: string;
    careInstructions?: string;
    origin?: string;
    availableSizes?: string[];
    colorOptions?: {
      _id: string;
      title: string;
      color: string;
    }[];
    countryOfManufacture?: string;
    faqs?: {
      question: string;
      answer: string;
    }[];
  };
}

// Add-Product type
export interface AddProductValues {
  title: string;
  description: string;
  images: string[];
  image_link: string;
  price: number;
  oldPrice?: number;
  availableSizes: string[];
  colorOptions: {
    title: string;
    color: string;
  }[];
  categories: {
    title: string;
    slug: string;
  }[];
  types: {
    title: string;
    slug: string;
  }[];
  material: string;
  fabricType?: string;
  careInstructions?: string;
  origin: string;
  quantityInStock: number;
  brand?: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  countryOfManufacture: string;
}

export interface CategoryValues {
  subCategories: CategoryValues[];
  // subCategories: any;
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
  required?: boolean;
}

// | "personal-information"
// | "order-history"
// | "wishlist"
// | "payment-methods"
// | "account-settings"
// | "customer-support-&-help"
// |
// export interface SectionValues {
//   id: string;
//   head: string;
//   href: string;
//   icon: IconType;
//   sidebarHidden?: boolean;
//   sectionNode: () => React.JSX.Element;
//   subSections?: {
//     id: string;
//     head: string;
//     href: string;
//     sectionNode: () => React.JSX.Element;
//   }[];
// }

export interface SectionValues {
  id: string;
  head: string;
  href: string;
  icon: IconType;
  sidebarHidden?: boolean;
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
  discount: number;
  productId:{
    _id: string;
    images_collection: Array<{
      color: string;
      color_name: string;
      image_link: string;
      quantity: Array<{
        size: string;
        quantity: number;
      }>;
    }>;
  };
  title: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize: string;
  selectedColor: {
    title: string;
    color: string;
  };
  // quantityInStock: number;
  categorySlug: string;
  // above are needed for order schema
  description: string;
}
// category
export interface CategoryCollectionValues {
  _id: string;
  image: string;
  title: string;
  slug: string;
  description: string;
  types: Type[];
  createdAt: string;
}

export interface CategoryReq {
  image: string;
  title: string;
  slug: string;
  description: string;
  types: Type[];
}

export interface Type {
  title: string;
  slug: string;
}

// outfit
export interface ProductCollection {
  productId: string;
  title: string;
  slug: string;
  price: number;
  image: string;
}

export interface OutfitData {
  _id: string;
  outfitTitle: string;
  outfitSlug: string;
  outfitImage: string;
  productCollection: ProductCollection[];
}
