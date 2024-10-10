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
  image_link: string;
  title: string;
  slug: string;
  price: number;
  oldPrice: number;
  quantityInStock: number;
  categories: CategoryCollectionValues[];
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
          headers: { "Content-Type": "application/json" ,
          "Cache-Control": "no-store", // Add Cache-Control header
          },
        });

        if (!res.ok) {
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
  }, []);

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
    <section className="w-full h-full overflow-hidden select-none">
      <header className="w-full h-fit space-y-2 p-4 md:py-6">
        <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
          All Products
        </h2>
        <div className="w-full h-fit flex-between gap-2">
          <h2 className="capitalize text-md md:text-lg lg:text-xl">
            Total Products: <ReactCountUp amt={filteredProducts.length} />
          </h2>
          <div className="w-fit h-fit flex-center gap-2 md:gap-4">
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
                      src={product.image_link}
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
                      amt={product.price}
                      decimals={true}
                    />
                  </Link>
                </td>
                <td className="px-4 py-2 text-green-500">
                  <Link
                    href={`/products/${product.categories[0].slug}/${product.slug}`}
                  >
                    {product.oldPrice ? (
                      <ReactCountUp
                        amt={calculateDiscount(product.price, product.oldPrice)}
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
                    {product.quantityInStock}
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

// const products = [
//   {
//     _id: "1",
//     image_link: "/images/product1.jpg",
//     title: "Floral Summer Dress",
//     slug: "Floral Summer Dress",
//     price: 1999,
//     oldPrice: 1999,
//     quantityInStock: 1999,
//     // category: "Dresses",
//     // type: "Women",
//   },
//   {
//     _id: "2",
//     image_link: "/images/product2.jpg",
//     title: "Classic Denim Jacket",
//     slug: "Classic Denim Jacket",
//     price: 2499,
//     oldPrice: 2499,
//     quantityInStock: 2499,
//     // category: "Jackets",
//     // type: "Unisex",
//   },
//   {
//     _id: "3",
//     image_link: "/images/product3.jpg",
//     title: "Cotton Striped T-Shirt",
//     slug: "Cotton Striped T-Shirt",
//     price: 999,
//     oldPrice: 999,
//     quantityInStock: 999,
//     // category: "T-Shirts",
//     // type: "Men",
//   },
//   {
//     _id: "4",
//     image_link: "/images/product4.jpg",
//     title: "Woolen Knit Scarf",
//     slug: "Woolen Knit Scarf",
//     price: 799,
//     oldPrice: 799,
//     quantityInStock: 799,
//     // category: "Accessories",
//     // type: "Unisex",
//   },
//   {
//     _id: "5",
//     image_link: "/images/product5.jpg",
//     title: "Silk Evening Gown",
//     slug: "Silk Evening Gown",
//     price: 3499,
//     oldPrice: 3499,
//     quantityInStock: 3499,
//     // category: "Dresses",
//     // type: "Women",
//   },
//   {
//     _id: "6",
//     image_link: "/images/product6.jpg",
//     title: "Plaid Cotton Shirt",
//     slug: "Plaid Cotton Shirt",
//     price: 1499,
//     oldPrice: 1499,
//     quantityInStock: 1499,
//     // category: "Shirts",
//     // type: "Men",
//   },
//   {
//     _id: "7",
//     image_link: "/images/product7.jpg",
//     title: "Leather Biker Jacket",
//     slug: "Leather Biker Jacket",
//     price: 4999,
//     oldPrice: 4999,
//     quantityInStock: 4999,
//     // category: "Jackets",
//     // type: "Men",
//   },
//   {
//     _id: "8",
//     image_link: "/images/product8.jpg",
//     title: "Casual Linen Pants",
//     slug: "Casual Linen Pants",
//     price: 1799,
//     oldPrice: 1799,
//     quantityInStock: 1799,
//     // category: "Pants",
//     // type: "Women",
//   },
//   {
//     _id: "9",
//     image_link: "/images/product9.jpg",
//     title: "Cashmere Wool Sweater",
//     slug: "Cashmere Wool Sweater",
//     price: 2999,
//     oldPrice: 2999,
//     quantityInStock: 2999,
//     // category: "Sweaters",
//     // type: "Women",
//   },
//   {
//     _id: "10",
//     image_link: "/images/product10.jpg",
//     title: "High-Waisted Jeans",
//     slug: "High-Waisted Jeans",
//     price: 2199,
//     oldPrice: 2199,
//     quantityInStock: 2199,
//     // category: "Jeans",
//     // type: "Women",
//   },
//   {
//     _id: "11",
//     image_link: "/images/product11.jpg",
//     title: "Faux Fur Winter Coat",
//     slug: "Faux Fur Winter Coat",
//     price: 3799,
//     oldPrice: 3799,
//     quantityInStock: 3799,
//     // category: "Coats",
//     // type: "Women",
//   },
//   {
//     _id: "12",
//     image_link: "/images/product12.jpg",
//     title: "Graphic Print Hoodie",
//     slug: "Graphic Print Hoodie",
//     price: 1899,
//     oldPrice: 1899,
//     quantityInStock: 1899,
//     // category: "Hoodies",
//     // type: "Men",
//   },
//   {
//     _id: "13",
//     image_link: "/images/product13.jpg",
//     title: "Slim Fit Chinos",
//     slug: "Slim Fit Chinos",
//     price: 1599,
//     oldPrice: 1599,
//     quantityInStock: 1599,
//     // category: "Pants",
//     // type: "Men",
//   },
//   {
//     _id: "14",
//     image_link: "/images/product14.jpg",
//     title: "Sporty Nylon Windbreaker",
//     slug: "Sporty Nylon Windbreaker",
//     price: 2299,
//     oldPrice: 2299,
//     quantityInStock: 2299,
//     // category: "Jackets",
//     // type: "Unisex",
//   },
//   {
//     _id: "15",
//     image_link: "/images/product15.jpg",
//     title: "Linen Blouse",
//     slug: "Linen Blouse",
//     price: 1299,
//     oldPrice: 1299,
//     quantityInStock: 1299,
//     // category: "Blouses",
//     // type: "Women",
//   },
//   {
//     _id: "16",
//     image_link: "/images/product16.jpg",
//     title: "Polka Dot Skirt",
//     slug: "Polka Dot Skirt",
//     price: 1399,
//     oldPrice: 1399,
//     quantityInStock: 1399,
//     // category: "Skirts",
//     // type: "Women",
//   },
//   {
//     _id: "17",
//     image_link: "/images/product17.jpg",
//     title: "Vintage Denim Shorts",
//     slug: "Vintage Denim Shorts",
//     price: 1199,
//     oldPrice: 1199,
//     quantityInStock: 1199,
//     // category: "Shorts",
//     // type: "Women",
//   },
//   {
//     _id: "18",
//     image_link: "/images/product18.jpg",
//     title: "Cargo Pants",
//     slug: "Cargo Pants",
//     price: 1699,
//     oldPrice: 1699,
//     quantityInStock: 1699,
//     // category: "Pants",
//     // type: "Men",
//   },
//   {
//     _id: "19",
//     image_link: "/images/product19.jpg",
//     title: "Embroidered Kurta",
//     slug: "Embroidered Kurta",
//     price: 2199,
//     oldPrice: 2199,
//     quantityInStock: 2199,
//     // category: "Kurtas",
//     // type: "Men",
//   },
//   {
//     _id: "20",
//     image_link: "/images/product20.jpg",
//     title: "Wool Blend Overcoat",
//     slug: "Wool Blend Overcoat",
//     price: 3999,
//     oldPrice: 3999,
//     quantityInStock: 3999,
//     // category: "Coats",
//     // type: "Men",
//   },
// ];
