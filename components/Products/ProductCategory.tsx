"use client";

import React, { useEffect, useState } from "react";
import { reverseSlug } from "@/lib/utils";
import { CardValues, ProductCategoryProps } from "@/lib/types";
import Card from "./Card";
import Filter from "./Filter";
import Goback from "../ui/Goback";
import Loader from "../ui/Loader";
import Breadcrumbs from "../ui/Breadcrumbs";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { LiaFilterSolid } from "react-icons/lia";
import MobileFilter from "./MobileFilter";

const ProductCategory: React.FC<ProductCategoryProps> = ({
  category,
  type,
}) => {
  const [allProducts, setAllProducts] = useState<CardValues[]>([]);
  const [products, setProducts] = useState<CardValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorOptions, setColorOptions] = useState<
    { _id: string; title: string; color: string }[]
  >([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);

  const [selectedType, setSelectedType] = useState<string>(type || "");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 20000,
  });

  const [isAscending, setIsAscending] = useState<boolean>(true);
  useEffect(() => {
    console.log("scrolling to top");
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let res;
        if (category === "all") {
          res = await fetch(`/api/products/read/get-all-products`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
        } else {
          res = await fetch(
            `/api/products/read/get-products-by-category/${category}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
        }
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: CardValues[] = await res.json();

        setAllProducts(data);
        setProducts(data);

        // extracting color options & sizes from the fetched products
        const allColorOptions = data.flatMap((product) => product.colorOptions);

        const uniqueColorOptions = Array.from(
          new Map(
            allColorOptions.map((option) => [
              option.color.toLowerCase(),
              option,
            ])
          ).values()
        );

        setColorOptions(uniqueColorOptions);

        const allSizes = data.flatMap((product) => product.availableSizes);
        const uniqueAvailableSizes = Array.from(new Set(allSizes));

        setAvailableSizes(uniqueAvailableSizes);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // function to filter products based on selectedType, selectedColor, selectedSize, and price range
  useEffect(() => {
    if (!allProducts) return;
    if (!Array.isArray(allProducts)) return;
    const filteredProducts = allProducts?.filter((product) => {
      // Filtering based on type
      const matchesType = selectedType
        ? product.type.includes(selectedType)
        : true;

      // filtering based on color
      const matchesColor = selectedColor
        ? product.colorOptions.some((color) => color.title === selectedColor)
        : true;

      // filtering based on size
      const matchesSize = selectedSize
        ? product.availableSizes.includes(selectedSize)
        : true;

      // filtering based on price range
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesType && matchesColor && matchesSize && matchesPrice;
    });

    const sortedProducts = filteredProducts.sort((a, b) =>
      isAscending ? a.price - b.price : b.price - a.price
    );

    setProducts(sortedProducts);
  }, [
    selectedType,
    selectedColor,
    selectedSize,
    priceRange,
    allProducts,
    isAscending,
  ]);

  if (loading) return <Loader />;

  return (
    <section className="w-full h-full overflow-hidden">
      <div className={`relative w-full mt-[60px] py-4 `}>
        <div className="flex flex-row max-h-[calc(100vh-60px)]">
          <Filter
            categorySlug={category}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorOptions={colorOptions}
            availableSizes={availableSizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            isAscending={isAscending}
            setIsAscending={setIsAscending}
          />
          <div className="w-full px-2 md:px-10 lg:px-14 h-[calc(100vh-60px)] overflow-auto">
            <div className="md:ml-2 px-2 md:px-0 space-y-2 animate-slide-down flex justify-between items-center">
              <div>
                <Breadcrumbs />
                <span className="text-xl lg:text-2xl font-bold">
                  {reverseSlug(category)}
                  {category === "all" ? " Categories" : " Category"}
                </span>
              </div>
              <div className="md:hidden">
                <Drawer>
                  <DrawerTrigger asChild>
                    <div className="flex items-center gap-1 active:translate-y-1 transition-transform duration-300">
                      <span>Filter</span>
                      <LiaFilterSolid size={18} />
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="md:hidden fixed top-0 right-0 bottom-0 w-full max-w-md h-full bg-white p-4 z-50 shadow-lg rounded-l-2xl">
                    <DrawerHeader>
                      {/* <DrawerTitle className="text-2xl md:text-3xl font-semibold">
                        Filter
                      </DrawerTitle> */}
                    </DrawerHeader>
                    <MobileFilter
                      categorySlug={category}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                      colorOptions={colorOptions}
                      availableSizes={availableSizes}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      isAscending={isAscending}
                      setIsAscending={setIsAscending}
                    />
                    {/* Existing Filter content */}
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-6 animate-slide-up">
                {products.map((card) => (
                  <Card key={card._id} card={card} category={category} />
                ))}
              </div>
            ) : (
              <div className="w-full h-[calc(100vh-120px)] text-center">
                <span className="mt-4 text-xl">No Products found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategory;