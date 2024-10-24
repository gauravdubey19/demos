"use client";

import { SectionValues } from "./types";
// profile
import MyProfile from "@/components/Profile/Sections/MyProfile";
import OrderHistory from "@/components/Profile/Sections/OrderHistory";
import ShippingAddresses from "@/components/Profile/Sections/ShippingAddresses";
import DeleteMyAccount from "@/components/Profile/Sections/DeleteMyAccount";
// admin
import Dashboard from "@/components/Admin/Dashboard";
import AllProducts from "@/components/Admin/Products/AllProducts";
import Customers from "@/components/Admin/Customers/Customers";
import Orders from "@/components/Admin/Orders/Orders";
import MyAccount from "@/components/Admin/MyAccount";
import FaqContainer from "@/components/Admin/QuerysFAQs/FAQ/FaqContainer";
import Querry from "@/components/Admin/QuerysFAQs/Querries/Querry";
import EditAddress from "@/components/Profile/Sections/EditAddress";
import NewAddProduct from "@/components/Admin/Products/NewAddProduct";
import AllCategories from "@/components/Admin/Products/Category/AllCategories";
import AllOufitCollection from "@/components/Admin/Products/Outfit/OutfitCollection/AllOutfit";
import NewOutfit from "@/components/Admin/Products/Outfit/AddOutfit/NewOutFit";
import TestimonialsAdmin from "@/components/Admin/Testimonials/TestimonialsAdmin";
import Helpdesk from "@/components/Profile/Sections/Helpdesk";
import MyTickets from "@/components/Profile/Sections/MyTickets";
// icons
import {
  AiOutlinePieChart,
  AiTwotoneDelete,
  AiOutlineSetting,
} from "react-icons/ai";
import { PiCubeLight } from "react-icons/pi";
import { SlLayers } from "react-icons/sl";
import { LiaQuestionSolid } from "react-icons/lia";
import { IoTicketOutline, IoVideocamOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { CiShoppingBasket } from "react-icons/ci";
import { RiCouponLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { AiOutlineCustomerService } from "react-icons/ai";
import AddAddress from "@/components/Profile/Sections/AddAddresses";
import HelpDesk from "@/components/Admin/Helpdesk/helpdesk";
import AddProductsInBulk from "@/components/Admin/Products/AddProductsInBulk";
import GenerateCoupon from "@/components/Profile/Sections/GenerateCoupon";
import MyCoupons from "@/components/Profile/Sections/MyCoupons";
import { IoIosSync } from "react-icons/io";

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
    id: "my-coupons",
    head: "My Coupons",
    href: "/profile/my-coupons",
    icon: RiCouponLine,
    sectionNode: MyCoupons,
  },
  {
    id: "generate-coupon",
    head: "Generate Coupon (For testing)",
    href: "/profile/generate-coupon",
    icon: IoIosSync,
    sectionNode: GenerateCoupon,
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
    sectionNode: AddAddress,
    sidebarHidden: true,
  },
  {
    id: "helpdesk",
    head: "Helpdesk",
    href: "/profile/helpdesk",
    icon: AiOutlineCustomerService,
    sectionNode: Helpdesk,
  },
  {
    id: "my-tickets",
    head: "My tickets",
    href: "/profile/my-tickets",
    icon: IoTicketOutline,
    sectionNode: MyTickets,
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
        id: "add-product",
        head: "Add Product",
        href: "/admin/add-product",
        sectionNode: NewAddProduct, //AddProduct,
      },
      {
        id: "add-bulk-products",
        head: "Add Bulk Products",
        href: "/admin/add-bulk-products",
        sectionNode: AddProductsInBulk,
      },
      {
        id: "all-outfit-collections",
        head: "All Outfit Collections",
        href: "/admin/all-outfit-collections",
        sectionNode: AllOufitCollection,
      },
      {
        id: "add-outfit-collections",
        head: "Add Outfit Collections",
        href: "/admin/add-outfit-collections",
        sectionNode: NewOutfit,
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
    id: "helpdesk",
    head: "Helpdesk",
    href: "/admin/helpdesk",
    icon: AiOutlineCustomerService,
    sectionNode: HelpDesk,
  },
  {
    id: "my-account",
    head: "My Account",
    href: "/admin/my-account",
    icon: AiOutlineSetting,
    sectionNode: MyAccount,
  },
];
