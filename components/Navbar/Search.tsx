"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";

interface SearchedProduct {
  _id: string;
  title: string;
  description: string;
  slug: string;
  categories: { slug: string }[];
  images: string[];
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SearchedProduct[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim()) {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/products/read/search/${searchQuery}`
          );
          const data = await response.json();
          if (response.ok) {
            if (data.products && data.products.length > 0) {
              setSuggestions(data.products);
              setShowSuggestions(true);
            } else {
              setSuggestions([]);
              setShowSuggestions(false);
            }
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    if (isFirstRender.current) {
      fetchSuggestions();
      isFirstRender.current = false;
    } else {
      const delayFetch = setTimeout(fetchSuggestions, 2000);
      return () => clearTimeout(delayFetch);
    }
  }, [searchQuery]);

  return (
    <>
      <div className="flex-center relative">
        <div id="search" className="flex-center lg:bg-zinc-100 rounded-md px-2">
          <IoSearchOutline
            size={20}
            className="text-zinc-400 scale-150 lg:scale-100"
          />
          <input
            type="text"
            placeholder="Search for products, categories & more"
            className="hidden lg:block xl:w-96 bg-transparent border-none outline-none p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
        </div>

        {searchQuery.trim() !== "" && showSuggestions && (
          <ul className="absolute top-full left-0 mt-1 w-full bg-white shadow-md z-10 border rounded-md p-2 space-y-2">
            {loading ? (
              <li className="p-2 text-gray-500">Loading suggestions...</li>
            ) : suggestions.length > 0 ? (
              suggestions.map((product) => (
                <li
                  key={product._id}
                  className="hover:bg-gray-100 p-2 cursor-pointer animate-slide-down"
                  onClick={() => {
                    setSearchQuery(product.title);
                    setShowSuggestions(false);
                  }}
                >
                  <Link
                    href={`/products/${product.categories[0].slug}/${product.slug}`}
                  >
                    <div className="w-full h-fit flex items-center space-x-2">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{product.title}</p>
                        <p className="text-sm text-gray-400 line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : !loading ? (
              <li className="p-2 text-gray-500">
                No products found matching your query..
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
