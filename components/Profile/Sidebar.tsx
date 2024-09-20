import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { SectionProps } from "@/lib/types";
import { profileSections } from "@/lib/data";

const Sidebar: React.FC<SectionProps> = ({ section }) => {
  // console.log(section);
  const { data: session } = useSession();
  return (
    <>
      <aside className="hidden h-full w-fit flex-col border-r bg-background p-4 md:flex drop-shadow-lg overflow-hidden">
        <div className="flex items-center space-x-4 bg-[#ffb43327] text-sm text-primary text-justify p-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={session?.user?.image || "/profile.png"}
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
          {profileSections.map((sec, index) => (
            <Link
              href={`/profile/${sec.id}`}
              key={index || sec.id}
              className={`flex items-center gap-3 px-3 py-2 text-md font-medium transition-colors hover:text-primary ${
                section === sec.id
                  ? "text-primary fill-primary underline underline-offset-8"
                  : ""
              } ease-in-out duration-200`}
              // onClick={() => setSection(sec.id)}
            >
              <sec.icon size={20} />
              <span>{sec.head}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
