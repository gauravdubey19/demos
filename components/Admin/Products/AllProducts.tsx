"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import ReactCountUp from "@/components/ui/ReactCountUp";
import { calculateDiscount } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsPlus, BsTrash } from "react-icons/bs";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { DeletePopUp } from "./Category/CategoryDetail";
import Link from "next/link";
import { CategoryCollectionValues } from "@/lib/types";
import { useRouter } from "next/navigation";

interface ProductCollectionValues {
  _id: string;
  images_collection: [{ image_link: string }];
  title: string;
  slug: string;
  price: number;
  sale_price: number;
  categories: CategoryCollectionValues[];
  sell_on_google_quantity: number;
}

const AllProducts = () => {
  const router = useRouter();
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [productCollection, setProductCollection] = useState<
    ProductCollectionValues[]
  >([]);

  useEffect(() => {
    const fetchProductCollection = async () => {
      try {
        const res = await fetch(`/api/products/read/get-all-products`, {
          method: "GET",
          cache: "no-store",
          next: {
            revalidate: 0,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          router.refresh();
          return;
          // throw new Error("Failed to fetch product collection");
        }

        const data = await res.json();
        setProductCollection(data as ProductCollectionValues[]);
      } catch (error) {
        console.error("Error fetching product collection:", error);
      }
    };

    fetchProductCollection();
  }, [router]);

  if (productCollection?.length === 0) return <Loader />;

  const compareIds = (id1: string | number, id2: string | number): number => {
    if (typeof id1 === "string" && typeof id2 === "string") {
      return id1.localeCompare(id2);
    } else {
      return Number(id1) - Number(id2);
    }
  };

  const filteredProducts: ProductCollectionValues[] = productCollection
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (isAscending) {
        return compareIds(a._id, b._id);
      } else {
        return compareIds(b._id, a._id);
      }
    });

  return (
    <section className="w-full h-full select-none overflow-hidden">
      <header className="w-full h-fit space-y-2 p-4 md:py-6">
        <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
          All Products
        </h2>
        <div className="w-full h-fit flex lg:items-center justify-between flex-col lg:flex-row gap-2">
          <h2 className="capitalize text-md md:text-lg lg:text-xl">
            Total Products: <ReactCountUp amt={filteredProducts.length} />
          </h2>
          <div className="w-fit h-fit flex justify-end flex-col lg:flex-row gap-2 md:gap-4">
            <div className="w-fit flex-center gap-1 cursor-pointer border border-primary py-1 px-2">
              <IoSearchOutline size={20} className="text-primary" />
              <input
                type="text"
                placeholder="Search by Product name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="md:w-60 placeholder:text-primary bg-none border-none outline-none"
              />
            </div>
            <Button
              onClick={() => router.push("/admin/all-products/add-product")}
              className="w-full h-full text-white rounded-none"
            >
              <BsPlus size={20} className="ml-1" /> Create New Product
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
        <ProductTable filteredProducts={filteredProducts} />
      </div>
    </section>
  );
};

const ProductTable: React.FC<{
  filteredProducts: ProductCollectionValues[];
}> = ({ filteredProducts }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    title: string;
  }>({ id: "", title: "" });

  const handlePopupClick = (productId: string, productTitle: string) => {
    setSelectedProduct({ id: productId, title: productTitle });
    setIsOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedProduct({ id: "", title: "" });
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative w-full h-full border border-gray-300 rounded-2xl overflow-auto">
        <table className="w-full bg-white rounded-2xl">
          <thead className="sticky top-0 bg-[#EAEAEA] shadow-sm z-10">
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Discount</th>
              <th className="px-4 py-2 text-left">Quantity In Stock</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={index}
                className="h-fit group border-b cursor-pointer hover:bg-[#ffb43335] ease-in-out duration-300"
              >
                <td className="px-4 py-2">
                  <Link
                    href={`/products/${product.categories[0].slug}/${product.slug}`}
                  >
                    <Image
                      src={product.images_collection[0].image_link}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="w-12 h-12 object-contain rounded"
                    />
                  </Link>
                </td>
                <td className="w-fit px-4 py-2 text-primary group-hover:underline underline-offset-4">
                  <Link
                    href={`/products/${product.categories[0].slug}/${product.slug}`}
                  >
                    {product.title.length > 15
                      ? `${product.title.substring(0, 20)}...`
                      : product.title}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/products/${product.categories[0].slug}/${product.slug}`}
                  >
                    <ReactCountUp
                      prefix="₹"
                      amt={
                        product.sale_price ? product.sale_price : product.price
                      }
                      decimals={true}
                    />
                  </Link>
                </td>
                <td className="px-4 py-2 text-green-500">
                  <Link
                    href={`/products/${product.categories[0].slug}/${product.slug}`}
                  >
                    {product.sale_price ? (
                      <ReactCountUp
                        amt={calculateDiscount(
                          product.sale_price,
                          product.price
                        )}
                      >
                        % off
                      </ReactCountUp>
                    ) : (
                      <div className="w-[50%] h-fit text-center text-xl">-</div>
                    )}
                  </Link>
                </td>
                <td className="px-4 md:px-20 py-2">
                  <Link
                    href={`/products/${product.categories[0].slug}/${product.slug}`}
                  >
                    {product.sell_on_google_quantity}
                  </Link>
                </td>
                <td className="w-fit h-full px-4 py-2 flex-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      router.push(
                        `/admin/all-products/edit-product/${product.slug}`
                      )
                    }
                    className="p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                  >
                    <BsPencilSquare size={16} />
                  </button>
                  <button
                    onClick={() => handlePopupClick(product._id, product.title)}
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
          action="delete-product"
          id={selectedProduct.id}
          title={selectedProduct.title}
          isDeleteOpen={isOpen}
          handleDeleteClose={handlePopupClose}
        />
      )}
    </>
  );
};

export default AllProducts;
