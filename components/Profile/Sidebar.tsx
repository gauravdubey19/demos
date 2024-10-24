"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SectionProps } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useGlobalContext } from "@/context/GlobalProvider";

const Sidebar: React.FC<SectionProps> = ({ section, sections }) => {
  // console.log(section);
  const { userData } = useGlobalContext();
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
      <aside className="hidden h-full w-fit md:w-[32%] lg:w-[25%] xl:w-[20%] select-none flex-col border-r bg-[#F8F8F8] p-4 md:flex drop-shadow-lg overflow-hidden">
        {pathname.includes("/admin") ? (
          <Link
            href="/"
            className="flex-between gap-1 text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden"
          >
            <Image
              src="/logo.png"
              alt="LoGo"
              width={400}
              height={400}
              className="w-14 h-14"
            />
            <span>CSK Admin</span>
          </Link>
        ) : (
          session &&
          userData?.profile &&
          userData?.firstName &&
          userData?.email && (
            <div className="flex-center gap-2 bg-[#ffb43327] text-sm text-primary text-justify p-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={userData?.profile || "/profile.png"}
                  alt="profile"
                  width={200}
                  height={200}
                  className="w-full h-full"
                />
              </div>
              <div className="w-[75%] space-y-1 overflow-hidden">
                <h4 title={userData?.firstName} className="font-medium">
                  {userData?.firstName}
                </h4>
                <p
                  title={userData?.email}
                  className="text-xs text-muted-foreground line-clamp-1"
                >
                  {userData?.email}
                </p>
              </div>
            </div>
          )
        )}
        <nav className="mt-6 flex flex-1 flex-col space-y-1">
          <Accordion
            type="single"
            collapsible
            defaultValue={
              section === "queries" || section === "faqs" ? "item-5" : "item-2"
            }
            className="w-full px-0"
          >
            {sections.map((sec, index) =>
              sec.sidebarHidden ? null : (
                <div key={index}>
                  {!sec.subSections ? (
                    <Link
                      // key={index}
                      href={sec.href}
                      className={`flex items-center gap-3 px-2 py-2 text-md font-medium transition-colors hover:text-primary ${
                        section === sec.id
                          ? "text-primary fill-primary underline underline-offset-8"
                          : ""
                      } ease-in-out duration-200`}
                    >
                      <sec.icon size={20} />
                      <span>{sec.head}</span>
                    </Link>
                  ) : (
                    <AccordionItem
                      data-state="open"
                      value={`item-${index + 1}`}
                      className="border-none"
                    >
                      <AccordionTrigger className="flex gap-5 py-2">
                        <Link
                          href={sec.href}
                          className={`flex items-center ml-2 gap-3 text-md font-medium transition-colors hover:text-primary ${
                            section === sec.id
                              ? "text-primary fill-primary underline underline-offset-8"
                              : ""
                          } ease-in-out duration-200`}
                        >
                          <sec.icon size={20} />
                          <span>{sec.head}</span>
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent className="w-fit ml-7 flex flex-col gap-1">
                        {sec.subSections.map((subSec, index) => (
                          <Link
                            key={index}
                            href={subSec.href}
                            className={`px-3 text-md font-medium transition-colors hover:text-primary ${
                              section === subSec.id
                                ? "text-primary fill-primary underline underline-offset-4"
                                : ""
                            } ease-in-out duration-200`}
                          >
                            {subSec.head}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </div>
              )
            )}
          </Accordion>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
