"use client";

import { SectionValues } from "./types";
// profile
import MyProfile from "@/components/Profile/Sections/MyProfile";
import OrderHistory from "@/components/Profile/Sections/OrderHistory";
import ShippingAddresses from "@/components/Profile/Sections/ShippingAddresses";
import DeleteMyAccount from "@/components/Profile/Sections/DeleteMyAccount";
import AddAddresses from "@/components/Profile/Sections/AddAddresses";
// admin
import Dashboard from "@/components/Admin/Dashboard";
import AllProducts from "@/components/Admin/Products/AllProducts";
import Customers from "@/components/Admin/Customers/Customers";
import Orders from "@/components/Admin/Orders/Orders";
import MyAccount from "@/components/Admin/MyAccount";

import FaqContainer from "@/components/Admin/QuerysFAQs/FAQ/FaqContainer";
import Querry from "@/components/Admin/QuerysFAQs/Querries/Querry";
import EditAddress from "@/components/Profile/Sections/EditAddress";
import AddProduct from "@/components/Admin/Products/AddProduct";
import AllCategories from "@/components/Admin/Products/Category/AllCategories";
// icons
import {
  AiOutlinePieChart,
  AiTwotoneDelete,
  AiOutlineSetting,
} from "react-icons/ai";
import { PiCubeLight } from "react-icons/pi";
import { SlLayers } from "react-icons/sl";
import { LiaQuestionSolid } from "react-icons/lia";
import { IoVideocamOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { CiShoppingBasket } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import Collection from "@/components/Admin/Products/OutfitCollection/Collection";
import NewOutFit from "@/components/Admin/Products/AddOutfit/NewOutFit";
import TestimonialsAdmin from "@/components/Admin/Testimonials/TestimonialsAdmin";

export const profileSections: SectionValues[] = [
  {
    id: "my-profile",
    head: "My Profile",
    href: "/profile/my-profile",
    icon: RxPerson,
    sectionNode: MyProfile,
  },
  {
    id: "order-history",
    head: "Order History",
    href: "/profile/order-history",
    icon: CiShoppingBasket,
    sectionNode: OrderHistory,
  },
  {
    id: "shipping-addresses",
    head: "Shipping Addresses",
    href: "/profile/shipping-addresses",
    icon: GrMapLocation,
    sectionNode: ShippingAddresses,
  },
  {
    id: "edit-address",
    head: "Edit Address",
    href: "/profile/edit-address",
    icon: GrMapLocation,
    sectionNode: EditAddress,
    sidebarHidden: true,
  },
  {
    id: "add-a-new-address",
    head: "Add a New Address",
    href: "/profile/add-a-new-address",
    icon: GrMapLocation,
    sectionNode: AddAddresses,
    sidebarHidden: true,
  },
  // {
  //   id: "payment-methods",
  //   head: "Payment Methods",
  //   href: "/profile/payment-methods",
  //   icon: RiMoneyDollarCircleLine,
  //   sectionNode: PaymentMethods,
  // },
  {
    id: "delete-my-account",
    head: "Delete My Account",
    href: "/profile/delete-my-account",
    icon: AiTwotoneDelete,
    sectionNode: DeleteMyAccount,
  },
];

export const adminSections: SectionValues[] = [
  {
    id: "dashboard",
    head: "Dashboard",
    href: "/admin/dashboard",
    icon: AiOutlinePieChart,
    sectionNode: Dashboard,
  },
  {
    id: "all-products",
    head: "Products",
    href: "/admin/all-products",
    icon: PiCubeLight,
    sectionNode: AllProducts,
    subSections: [
      {
        id: "all-products",
        head: "All Products",
        href: "/admin/all-products",
        sectionNode: AllProducts,
      },
      {
        id: "add-products",
        head: "Add Products",
        href: "/admin/add-products",
        sectionNode: AddProduct,
      },
      {
        id: "all-outfit-collections",
        head: "All Outfit Collections",
        href: "/admin/all-outfit-collections",
        sectionNode: Collection,
      },
      {
        id: "add-outfit-collections",
        head: "Add Outfit Collections",
        href: "/admin/add-outfit-collections",
        sectionNode: NewOutFit,
      },
      {
        id: "all-categories",
        head: "All Categories",
        href: "/admin/all-categories",
        sectionNode: AllCategories,
      },
    ],
  },
  {
    id: "customers",
    head: "Customers",
    href: "/admin/customers",
    icon: RxPerson,
    sectionNode: Customers,
  },
  {
    id: "orders",
    head: "Orders",
    href: "/admin/orders",
    icon: SlLayers,
    sectionNode: Orders,
  },
  {
    id: "queries",
    head: "Query's & FAQs",
    href: "/admin/queries",
    icon: LiaQuestionSolid,
    sectionNode: OrderHistory,
    subSections: [
      {
        id: "queries",
        head: "Queries",
        href: "/admin/queries",
        sectionNode: Querry,
      },
      {
        id: "faqs",
        head: "FAQ’s",
        href: "/admin/faqs",
        sectionNode: FaqContainer,
      },
    ],
  },
  {
    id: "testimonials",
    head: "Testimonials",
    href: "/admin/testimonials",
    icon: IoVideocamOutline,
    sectionNode: TestimonialsAdmin,
  },
  {
    id: "my-account",
    head: "My Account",
    href: "/admin/my-account",
    icon: AiOutlineSetting,
    sectionNode: MyAccount,
  },
];
