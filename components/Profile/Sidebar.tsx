import Image from "next/image";
import React from "react";
import { RxPerson } from "react-icons/rx";
import { CiShoppingBasket } from "react-icons/ci";
import { LuFileHeart } from "react-icons/lu";
import { RiMoneyDollarCircleLine, RiUserSettingsLine } from "react-icons/ri";
import { PiWarningCircleThin } from "react-icons/pi";
import Link from "next/link";
import { SectionProps, SectionValues } from "@/lib/types";

const Sidebar: React.FC<SectionProps> = ({ section }) => {
  // console.log(section);

  return (
    <>
      <aside className="hidden h-full w-fit flex-col border-r bg-background p-4 md:flex drop-shadow-lg overflow-hidden">
        <div className="flex items-center space-x-4 bg-[#ffb43327] text-sm text-primary text-justify p-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/assets/card.jpeg"
              alt="profile"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">G D</h4>
            <p className="text-sm text-muted-foreground line-clamp-1">
              gd@example.com
            </p>
          </div>
        </div>
        <nav className="mt-6 flex flex-1 flex-col space-y-1">
          {sections.map((sec) => (
            <Link
              href={`/profile/${sec.id}`}
              key={sec.id}
              className={`flex items-center gap-3 px-3 py-2 text-md font-medium transition-colors hover:text-primary ${
                section === sec.id
                  ? "text-primary fill-primary underline underline-offset-8"
                  : ""
              } ease-in-out duration-200`}
              // onClick={() => setSection(sec.id)}
            >
              {sec.icon}
              <span>{sec.head}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

const sections: SectionValues[] = [
  {
    id: "personal-information",
    head: "Personal Information",
    icon: <RxPerson size={20} />,
  },
  {
    id: "order-history",
    head: "Order History",
    icon: <CiShoppingBasket size={20} />,
  },
  { id: "wishlist", head: "Wishlist", icon: <LuFileHeart size={20} /> },
  {
    id: "payment-methods",
    head: "Payment Methods",
    icon: <RiMoneyDollarCircleLine size={20} />,
  },
  {
    id: "account-settings",
    head: "Account Settings",
    icon: <RiUserSettingsLine size={20} />,
  },
  {
    id: "customer-support-&-help",
    head: "Customer Support & Help",
    icon: <PiWarningCircleThin size={20} />,
  },
];
