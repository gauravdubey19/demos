"use client";
import { ProductCategoryDetailParams } from "@/lib/types";
import Slider from "@/components/HomePage/Slider";
import CategorySection from "@/components/HomePage/CategorySection/CategorySection";
import SuperProductCategory from "@/components/Products/SuperProductCategory";
import { useEffect, useState } from "react";

interface Category {
    _id: string;
    title: string;
    slug: string;
}

// Import or define the SlidesData type here
import { slides } from "@/lib/sampleSliderData";  // Adjust the import path as needed

type ValidSliderCategory = keyof typeof slides;

const isValidSliderCategory = (category: string): category is ValidSliderCategory => {
    return ["all", "traditional", "partywear", "formal"].includes(category);
};

export default function ProductCategoryPage({
    params,
}: ProductCategoryDetailParams) {
    const [superCategories, setSuperCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuperCategories = async () => {
            try {
                const res = await fetch(`/api/superCategories/${params.category}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch super categories");
                }

                const data = await res.json();
                setSuperCategories(data.superCategory.categories || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSuperCategories();
    }, [params.category]);

    const sliderCategory: ValidSliderCategory = isValidSliderCategory(params.category)
        ? params.category
        : "all";  // Default to "all" if the category is not valid

    return (
        <div>
            <Slider category={sliderCategory} />
            <CategorySection />
            <div className="">
                {superCategories.map((category: Category) => (
                    <SuperProductCategory
                        key={category._id}
                        category={category.title}
                        categorySlug={category.slug}
                    />
                ))}
            </div>
        </div>
    );
}