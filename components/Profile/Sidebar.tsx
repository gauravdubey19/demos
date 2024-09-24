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

const Sidebar: React.FC<SectionProps> = ({ section, sections }) => {
  // console.log(section);
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
      <aside className="hidden h-full w-fit max-w-[20%] flex-col border-r bg-[#F8F8F8] p-4 md:flex drop-shadow-lg overflow-hidden">
        {pathname.includes("/admin") ? (
          <Link
            href="/"
            className="flex-between gap-1 text-2xl lg:text-3xl font-semibold overflow-hidden"
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
          session?.user?.image &&
          session?.user?.name &&
          session?.user?.email && (
            <div className="flex-center gap-2 bg-[#ffb43327] text-sm text-primary text-justify p-2">
              <div className="w-[17%] h-10 rounded-full overflow-hidden">
                <Image
                  src={session?.user?.image || "/profile.png"}
                  alt="profile"
                  width={200}
                  height={200}
                  className="w-full h-full"
                />
              </div>
              <div className="w-[80%] space-y-1 overflow-hidden">
                <h4 title={session?.user?.name} className="font-medium">
                  {session?.user?.name}
                </h4>
                <p
                  title={session?.user?.email}
                  className="text-xs text-muted-foreground line-clamp-1"
                >
                  {session?.user?.email}
                </p>
              </div>
            </div>
          )
        )}
        <nav className="mt-6 flex flex-1 flex-col space-y-1">
          {sections.map((sec, index) => (
            <div key={index}>
              {!sec.subSections ? (
                <Link
                  // key={index}
                  href={sec.href}
                  className={`flex items-center gap-3 px-3 py-2 text-md font-medium transition-colors hover:text-primary ${
                    section === sec.id
                      ? "text-primary fill-primary underline underline-offset-8"
                      : ""
                  } ease-in-out duration-200`}
                >
                  <sec.icon size={20} />
                  <span>{sec.head}</span>
                </Link>
              ) : (
                <Accordion type="single" collapsible className="w-full px-3">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="flex gap-5">
                      <Link
                        href={sec.href}
                        className={`flex items-center gap-3 text-md font-medium transition-colors hover:text-primary ${
                          section === sec.id
                            ? "text-primary fill-primary underline underline-offset-8"
                            : ""
                        } ease-in-out duration-200`}
                      >
                        <sec.icon size={20} />
                        <span>{sec.head}</span>
                      </Link>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1">
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
                </Accordion>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
