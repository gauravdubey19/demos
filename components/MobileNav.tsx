"use client";

import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { links } from "@/lib/data";
import { DialogTitle } from "@radix-ui/react-dialog";

const MobileNav = () => {
  const [active, setActive] = useState<string>(links[0].head);
  const [isOpen, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!isOpen);
  };

  const handleLinkClick = (head: string) => {
    setActive(head);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div onClick={handleMenuClick} className="">
            <Hamburger toggled={isOpen} toggle={setOpen} direction="right" />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          closeIcon={false}
          className="top-[4.5rem] backdrop-blur-lg bg-transparent z-50 border-none p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <DialogTitle></DialogTitle>
          <div className="h-fit flex flex-col gap-6 pt-5 overflow-hidden">
            {links.map((link, index) => (
              <div
                key={index}
                className="cursor-pointer z-50"
                onClick={() => handleLinkClick(link.head)}
              >
                <Link
                  href={link.href}
                  className={`w-full capitalize text-3xl font-semibold ${
                    active === link.head
                      ? "text-primary font-semibold"
                      : " active:translate-y-0.5"
                  }`}
                >
                  {link.head}
                </Link>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
