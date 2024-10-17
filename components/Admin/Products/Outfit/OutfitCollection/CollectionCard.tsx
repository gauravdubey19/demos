"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OutfitData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactCountUp from "@/components/ui/ReactCountUp";
import { useRouter } from "next/navigation";

interface CollectionCardProps {
  outfit: OutfitData;
  onDelete: (id: string) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ outfit, onDelete }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const handleDelete = () => {
    onDelete(outfit._id);
    setIsPopupOpen(false);
  };

  return (
    <>
      <div
        id="collection-card"
        className="relative h-max border rounded-lg border-gray-300 flex-between flex-col scale-95 hover:scale-100 ease-in-out duration-300"
      >
        <div className="w-full bg-gray-50 space-y-2 p-2 rounded-lg shadow-md">
          <div className="grid grid-cols-3 gap-1">
            {/* grid 1 */}
            <div className="grid grid-rows-2 gap-1">
              {outfit?.productCollection.slice(0, 2).map((product) => (
                <div
                  key={product?.productId}
                  title={product?.title}
                  className="flex items-center justify-center bg-gray-200 p-1 h-[100px] rounded-lg"
                >
                  <Image
                    src={product?.image}
                    alt="Vest"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
            {/* grid 2 */}
            <div className="relative flex-center flex-col gap-1 bg-gray-200 p-1 h-[208px] rounded-md overflow-hidden">
              <Image
                src={outfit?.outfitImage}
                alt="Magician Coat"
                width={200}
                height={200}
                className="w-full h-[90%] object-contain"
              />
              <h1 className="text-[10px] font-light">{outfit?.outfitTitle}</h1>
            </div>
            {/* grid 3 */}
            <div className="grid grid-rows-2 gap-1">
              {outfit?.productCollection.slice(2, 4).map((product) => (
                <div
                  key={product?.productId}
                  title={product?.title}
                  className="flex items-center justify-center bg-gray-200 p-1 h-[100px] rounded-lg"
                >
                  <Image
                    src={product?.image}
                    alt="Vest"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={openPopup}
            size="sm"
            variant="ghost"
            className="w-full text-primary"
          >
            View Details
          </Button>
        </div>
      </div>
      {isPopupOpen && (
        <OufitCollectionPopup
          outfit={outfit}
          isPopupOpen={isPopupOpen}
          handlePopupClose={() => setIsPopupOpen(!isPopupOpen)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default CollectionCard;

const OufitCollectionPopup: React.FC<{
  outfit: OutfitData;
  isPopupOpen: boolean;
  handlePopupClose: () => void;
  onDelete: () => void;
}> = ({ outfit, isPopupOpen, handlePopupClose, onDelete }) => {

  const router = useRouter()

  return (
    <Dialog open={isPopupOpen} onOpenChange={handlePopupClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>{outfit?.outfitTitle}</DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          {/* Oufit Image Image */}
          <div className="w-full h-full flex-center bg-gray-100">
            <Image
              src={outfit?.outfitImage}
              alt="Product"
              width={200}
              height={200}
              className="w-full h-64 object-contain rounded-md"
            />
          </div>

          {/* Product List */}
          <Accordion type="single" collapsible className="w-full">
            {outfit?.productCollection?.map((product, index) => (
              <AccordionItem
                key={index || product?.productId}
                value={`item-${index}`}
              >
                <AccordionTrigger className="text-left">{product?.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="w-full h-fit flex gap-2">
                    <Image
                      src={product?.image}
                      alt="Product"
                      width={200}
                      height={200}
                      className="w-20 h-20 object-contain rounded-md"
                    />
                    <div className="space-y-2">
                      <p>
                        <ReactCountUp
                          prefix="₹"
                          amt={product?.price || 1000}
                          decimals={true}
                        />
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="w-full col-span-2 flex gap-2">
            <Button
              onClick={onDelete}
              variant="outline"
              size="sm"
              className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white "
            >
              Delete
            </Button>
            <Button 
              onClick={() => router.push(`/admin/all-outfit-collections/edit-outfit-collections/${outfit._id}`)}
              size="sm" 
              className="w-full"
            >
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
