"use client";

import { usePathname } from "next/navigation";
import Link from "next/link"; // Import Link from next/link
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { capitalizeString } from "@/lib/utils";

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/" className="hover-underline-lr hover:text-primary">
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* dynamic breadcrumb items */}
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return (
            <BreadcrumbItem key={index}>
              {index < pathSegments.length - 1 ? (
                <Link
                  href={href}
                  className="hover-underline-lr hover:text-primary"
                >
                  {capitalizeString(segment.replace(/-/g, " "))}{" "}
                </Link>
              ) : (
                <BreadcrumbPage className="text-primary">
                  {capitalizeString(segment.replace(/-/g, " "))}
                </BreadcrumbPage>
              )}
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
