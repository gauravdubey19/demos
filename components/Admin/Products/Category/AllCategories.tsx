"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import ReactCountUp from "@/components/ui/ReactCountUp";
import { BsPencilSquare, BsPlus, BsTrash } from "react-icons/bs";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { CategoryCollectionValues } from "@/lib/types";
import { DeletePopUp } from "./CategoryDetail";

const AllCategories = () => {
  const router = useRouter();
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [categoriesCollection, setCategoriesCollection] = useState<
    CategoryCollectionValues[]
  >([]);

  useEffect(() => {
    const fetchCategoriesCollection = async () => {
      try {
        const res = await fetch(`/api/products/read/get-categories`, {
          method: "GET",
          "cache": "no-store", // Add Cache-Control header
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Add Cache-Control header
          },
        });

        if (!res.ok) {
          // throw new Error("Failed to fetch user collection");
          return;
        }

        const data = await res.json();
        setCategoriesCollection(data.categories as CategoryCollectionValues[]);
      } catch (error) {
        console.error("Error fetching user collections:", error);
      }
    };

    fetchCategoriesCollection();
  }, []);

  if (categoriesCollection.length === 0) return <Loader />;

  const compareIds = (id1: string | number, id2: string | number): number => {
    if (typeof id1 === "string" && typeof id2 === "string") {
      return id1.localeCompare(id2);
    } else {
      return Number(id1) - Number(id2);
    }
  };

  const filteredCategories: CategoryCollectionValues[] = categoriesCollection
    .filter((category) =>
      category.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (isAscending) {
        return compareIds(a._id, b._id);
      } else {
        return compareIds(b._id, a._id);
      }
    });

  return (
    <section className="w-full h-full overflow-hidden select-none">
      <header className="w-full h-fit space-y-2 p-4 md:py-6">
        <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
          All Categories
        </h2>
        <div className="w-full h-fit flex lg:items-center justify-between flex-col lg:flex-row gap-2">
          <h2 className="capitalize text-md md:text-lg lg:text-xl">
            Total Categories: <ReactCountUp amt={filteredCategories.length} />
          </h2>
          <div className="w-fit h-fit flex justify-end flex-col lg:flex-row gap-2 md:gap-4">
            <div className="w-fit flex-center gap-1 cursor-pointer border border-primary py-1 px-2">
              <IoSearchOutline size={20} className="text-primary" />
              <input
                type="text"
                placeholder="Search by Category name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="md:w-60 placeholder:text-primary bg-none border-none outline-none"
              />
            </div>
            <Button
              onClick={() => router.push("/admin/all-categories/add-category")}
              className="w-full h-full text-white rounded-none"
            >
              <BsPlus size={20} className="ml-1" /> Create New Category
            </Button>
            <div
              onClick={() => setIsAscending(!isAscending)}
              className="w-fit h-full flex-center gap-1 cursor-pointer bg-white border border-primary py-1.5 px-2"
            >
              {isAscending ? (
                <FaArrowDownShortWide size={20} className="text-primary" />
              ) : (
                <FaArrowUpShortWide size={20} className="text-primary" />
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="w-full h-[75vh] lg:h-[calc(100vh-130px)] space-y-2 p-4 overflow-hidden">
        <CategoryTable filteredCategories={filteredCategories} />
      </div>
    </section>
  );
};

const CategoryTable: React.FC<{
  filteredCategories: CategoryCollectionValues[];
}> = ({ filteredCategories }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState<string>("");

  const handlePopupClick = (categoryId: string, title: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryTitle(title);
    setIsOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedCategoryId("");
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative w-full h-full border border-gray-300 rounded-2xl overflow-auto">
        <table className="w-full bg-white rounded-2xl">
          <thead className="sticky top-0 bg-[#EAEAEA] shadow-sm z-10">
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Category Name</th>
              <th className="px-4 py-2 text-left">Number of types</th>
              {/* <th className="px-4 py-2 text-left">Number of Products</th> */}
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr
                key={index}
                className="h-fit group border-b cursor-pointer hover:bg-[#ffb43335] ease-in-out duration-300"
              >
                <td className="px-4 py-2">
                  <Link href={`/admin/all-categories/category/${category._id}`}>
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={200}
                      height={200}
                      className="w-12 h-12 object-contain rounded"
                    />
                  </Link>
                </td>
                <td className="w-fit px-4 py-2 text-primary group-hover:underline underline-offset-4">
                  <Link href={`/admin/all-categories/category/${category._id}`}>
                    {category.title.length > 15
                      ? `${category.title.substring(0, 20)}...`
                      : category.title}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link href={`/admin/all-categories/category/${category._id}`}>
                    <ReactCountUp amt={category.types.length} />
                  </Link>
                </td>
                <td className="w-fit h-full px-4 py-2 flex-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      router.push(
                        `/admin/all-categories/category/${category._id}`
                      )
                    }
                    className="p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                  >
                    <BsPencilSquare size={16} />
                  </button>
                  <button
                    onClick={() =>
                      handlePopupClick(category._id, category.title)
                    }
                    className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
                  >
                    <BsTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <DeletePopUp
          action="delete-category"
          id={selectedCategoryId}
          title={selectedCategoryTitle}
          isDeleteOpen={isOpen}
          handleDeleteClose={handlePopupClose}
        />
      )}
    </>
  );
};

export default AllCategories;
