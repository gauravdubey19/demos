"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartProvider";
import { CardValues } from "@/lib/types";
import Loader from "../ui/Loader";
import Card from "../Products/Card";
import { toast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { favProducts } = useCart();
  const [products, setProducts] = useState<CardValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!favProducts.length) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          "/api/products/read/get-user-wishlist-products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: favProducts }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          toast({
            title: "Your wishlist product is not found or..",
            description:
              "Your wishlist is empty. Start adding products to see them here.",
            variant: "destructive",
          });
        } else {
          // ensuring that data is an array before setting it
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
        toast({
          title: "Something went wrong while fetching the wishlist.",
          description: "Please refresh the page..",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [favProducts]);

  return (
    <section className="w-full h-full overflow-hidden">
      <div className="mt-[60px] w-full min-h-[calc(100vh-60px)] p-4 md:px-6 lg:px-10 overflow-hidden">
        <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
          Your Wishlist
        </h2>

        {loading ? (
          <Loader />
        ) : favProducts.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg text-center">
              Your wishlist is empty. Start adding products to see them here.
            </p>
          </div>
        ) : Array.isArray(products) && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-6 animate-slide-up">
            {products.map((card) => (
              <Card
                key={card._id}
                card={card}
                category={card.categories[0].slug}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg text-center">
              Your wishlist is empty. Start adding products to see them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
