"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Carousel from "../ui/Carousel";
import Card from "./Card";
import { CardValues, ProductSectionProps } from "@/lib/types";
import { IoIosArrowForward } from "react-icons/io";
import { cardList } from "@/lib/data";

const SuperProductCategory: React.FC<ProductSectionProps> = ({
    category,
    categorySlug,
}) => {
    const [products, setProducts] = useState<CardValues[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    `/api/products/read/get-products-by-category/${categorySlug}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch product");
                }

                const data = await res.json();
                // Assume data is of type CardValues[]
                setProducts(data as CardValues[]);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };

        if (loading) fetchProducts(); // Fetch if loading is true
    }, [categorySlug, loading]);

    return (
        <section className="w-full h-fit bg-white flex justify-center flex-col pt-3 px-2 md:px-6 lg:px-8 overflow-hidden">
            <div className="flex justify-between">
                <div className="text-md md:text-lg lg:text-2xl font-bold">
                    {category}
                </div>
                <Link
                    href={`/products/${categorySlug}`}
                    className="group w-fit flex-center md:gap-1 lg:gap-2 py-1 px-3 md:p-1.5 md:px-4 md:py-2 rounded-2xl cursor-pointer bg-primary active:scale-95 ease-in-out duration-300 text-white"
                >
                    <span className="text-sm md:text-base font-medium translate-x-0.5">
                        View More
                    </span>
                    <IoIosArrowForward
                        size={20}
                        className="font-extralight group-hover:translate-x-0.5 group-active:translate-x-1.5 ease-in-out duration-300"
                    />
                </Link>
            </div>
            <Carousel>
                {loading ? (
                    cardList.map((card, index) => (
                        <Card
                            key={index} // Use index for placeholder cards
                            card={card}
                            category={categorySlug}
                            loading={loading}
                        />
                    ))
                ) : (
                    products.map((card) => (
                        <Card
                            key={card._id} // Use card._id for actual products
                            card={card}
                            category={categorySlug}
                            loading={loading}
                        />
                    ))
                )}
            </Carousel>
        </section>
    );
};

export default SuperProductCategory;