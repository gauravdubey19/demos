"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OutfitData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import CollectionCard from "./CollectionCard";
import ReactCountUp from "@/components/ui/ReactCountUp";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

const AllOufitCollection = () => {
  const router = useRouter();
  const [outfits, setOutfits] = useState<OutfitData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    try {
      const res = await fetch("/api/products/read/get-outfit-collection", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch outfit collection");
      }

      const data = await res.json();
      setOutfits(data.outfits as OutfitData[]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching outfit collection:", error);
      setLoading(false);
    }
  };

  const deleteOutfit = async (id: string) => {
    try {
      const res = await fetch(`/api/products/delete/detete-outfit-collection-by-id?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete outfit");
      }

      // Update the state to remove the deleted outfit
      setOutfits(outfits.filter(outfit => outfit._id !== id));
    } catch (error) {
      console.error("Error deleting outfit:", error);
    }
  };

  if (loading) return <Loader />;
  if (outfits.length === 0) return <div>No Outfit Collection found!</div>;

  const compareIds = (id1: string | number, id2: string | number): number => {
    if (typeof id1 === "string" && typeof id2 === "string") {
      return id1.localeCompare(id2);
    } else {
      return Number(id1) - Number(id2);
    }
  };

  const filteredOutfits: OutfitData[] = outfits
    .filter((outfit) =>
      outfit.outfitTitle.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (isAscending) {
        return compareIds(a._id, b._id);
      } else {
        return compareIds(b._id, a._id);
      }
    });

  return (
    <>
      <section className="w-full h-full overflow-hidden select-none">
        <header className="w-full h-fit space-y-2 p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            All Outfit Collections
          </h2>
          <div className="w-full h-fit flex lg:items-center justify-between flex-col lg:flex-row gap-2">
            <h2 className="capitalize text-md md:text-lg lg:text-xl">
              Total Outfits: <ReactCountUp amt={filteredOutfits.length} />
            </h2>
            <div className="w-fit h-fit flex justify-end flex-col lg:flex-row gap-2 md:gap-4">
              <div className="w-fit flex-center gap-1 cursor-pointer border border-primary py-1 px-2">
                <IoSearchOutline size={20} className="text-primary" />
                <input
                  type="text"
                  placeholder="Search by outfit title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="md:w-60 placeholder:text-primary bg-none border-none outline-none"
                />
              </div>
              <Button
                onClick={() => router.push("/admin/add-outfit-collections")}
                className="w-full h-full text-white rounded-none"
              >
                <BsPlus size={20} className="ml-1" /> Create New Outfit
                Collection
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
        <div className="w-full h-[75vh] lg:h-[calc(100vh-130px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 overflow-y-auto">
          {filteredOutfits.map((outfit) => (
            <CollectionCard key={outfit._id} outfit={outfit} onDelete={deleteOutfit} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AllOufitCollection;