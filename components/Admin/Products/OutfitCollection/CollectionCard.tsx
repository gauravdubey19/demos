import React, { useState } from 'react';
import Image from 'next/image';
const CollectionCard = () => {
  // State for controlling the popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to open the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative">
      {/* Collection Card */}
      <div className="h-max border scale-75 rounded-lg border-gray-300 flex flex-col justify-between items-center">
        <div className="w-full mx-auto bg-gray-50 p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-3 grid-rows-2 gap-2">
            {/* First Image (Left Side) */}
            <div className="flex items-center justify-center bg-gray-200 p-2 h-[150px]">
              <Image
                src="/images/1.png"
                alt="Vest"
                className="max-w-full max-h-full object-contain"
                width={150} // Set appropriate width
                height={150} // Set appropriate height
              />
            </div>

            {/* Second Image (Center, spans two rows and two columns) */}
            <div className="col-span-1 row-span-3 flex flex-col items-center justify-center bg-gray-200 p-2 h-[310px] overflow-hidden">
              <h1 className="text-xs font-light mt-2">Magician Coat</h1>
              <Image
                src="/images/3.png"
                alt="Magician Coat"
                className="max-w-full max-h-full object-contain"
                width={150} // Set appropriate width
                height={150} // Set appropriate height
              />
            </div>

            {/* Third Image (Right Side) */}
            <div className="flex items-center justify-center bg-gray-200 p-2 h-[150px]">
              <Image
                src="/images/2.png"
                alt="Vest"
                className="max-w-full max-h-full object-contain"
                width={150} // Set appropriate width
                height={150} // Set appropriate height
              />
            </div>

            {/* Fourth Image (Bottom Left) */}
            <div className="flex items-center justify-center bg-gray-200 p-2 h-[150px]">
              <Image
                src="/images/4.png"
                alt="Vest"
                className="max-w-full max-h-full object-contain"
                width={150} // Set appropriate width
                height={150} // Set appropriate height
              />
            </div>

            {/* Fifth Image (Bottom Right) */}
            <div className="flex items-center justify-center bg-gray-200 p-2 h-[150px]">
              <Image
                src="/images/5.png"
                alt="Vest"
                className="max-w-full max-h-full object-contain"
                width={150} // Set appropriate width
                height={150} // Set appropriate height
              />
            </div>
          </div>

          <div className="mt-4 text-center shadow p-4 w-full">
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={openPopup}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Popup Card (Centered in the screen) */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-96 relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-xl text-gray-400 hover:text-gray-600"
              onClick={closePopup}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Grid */}
            <div className='grid grid-cols-2 mt-4'>
              {/* Product Image */}
              <div className="mb-4">
                <Image
                  src="/images/5.png"
                  alt="Product"
                  className="w-full h-48 object-cover rounded"
                  width={192} // Set appropriate width
                  height={192} // Set appropriate height
                />
              </div>

              {/* Product List */}
              <div className="space-y-4 mt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex justify-between items-center text-gray-600" key={index}>
                    <span>Product Name {index + 1}</span>
                    <span>
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 10l5 5 5-5H7z" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Input for Outfit Name */}
            <div className="mt-4">
              <h1>Outfit Name</h1>
            </div>

            {/* Shop Button */}
            <button className="w-full bg-yellow-400 text-white py-2 rounded text-sm font-semibold mt-4">
              + Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionCard;
