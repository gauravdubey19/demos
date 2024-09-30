import Image from 'next/image';
import React from 'react'
import EditModal from './EditModal';

interface Products {
    id: number;
    name: string;
    price: number;
}

interface OutfitData {
    outfitTitle: string;
    outfitImage: string;
    productCollection: Product[];
}
interface Product {
    title: string;
    image: string;
}


const NewOutFit = () => {

    const outfitCollection: OutfitData[] = [
        {
            outfitTitle: "Outfit 1",
            outfitImage: "/images/outfit1.jpg",
            productCollection: [
                { title: "Product 1", image: "/images/product1.jpg" },
                { title: "Product 2", image: "/images/product2.jpg" },
                { title: "Product 3", image: "/images/product3.jpg" },
                { title: "Product 4", image: "/images/product4.jpg" },
            ],
        },
    ];

    const products: Products[] = [
        { id: 1, name: 'Lorem Ipsum is simply dummy text', price: 90 },
        { id: 2, name: 'Lorem Ipsum is simply dummy text', price: 90 },
        { id: 3, name: 'Lorem Ipsum is simply', price: 90 },
        { id: 4, name: 'Lorem Ipsum is simply', price: 90 },
    ];

  return (
    <div className='h-screen overflow-y-auto'>
          <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold">Products</h1>
                  <button className="bg-yellow-500 text-white px-6 py-2 rounded">Save</button>
              </div>
              <div>
                  <h2 className="text-xl font-medium mb-4">Add Outfit Collection</h2>
                  <div className="grid grid-cols-4 gap-4 mb-8">
                      {Array(4).fill(0).map((_, index) => (
                          <div key={index} className="border p-4">
                              <img src="https://placehold.co/100x100" alt={`Image ${index + 1}`} className="w-full h-auto" />
                          </div>
                      ))}
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                  <div>
                      <h2 className="text-xl font-medium mb-4">Choose Maine Image</h2>
                      <div className="relative">
                          <img src="https://placehold.co/300x200" alt="Outfit collection including a shirt, sunglasses, watch, and shoes" className="w-full h-auto" />
                          <button className="absolute top-2 left-2 bg-white text-red-500 border border-red-500 px-4 py-2 rounded">Remove</button>
                      </div>
                      {/* <button className="mt-4 w-full bg-white text-yellow-500 border border-yellow-500 px-6 py-2 hover:text-white hover:bg-yellow-500 rounded transition-all">Edit</button>
                       */}
                       <div className=' w-full'>
                        <EditModal/>
                       </div>
                  </div>
                  <div>
                      <h2 className="text-xl font-medium mb-4">Product Details</h2>
                      <div className='border border-[#8888] rounded-lg p-5'>
                          <ul className="space-y-2">
                              {products.map((product) => (
                                  <li key={product.id} className="flex justify-between">
                                      <span>{product.name}</span>
                                      <span>₹ {product.price}</span>
                                  </li>
                              ))}
                          </ul>
                          <hr className="my-4" />
                          <div className="flex justify-between font-bold">
                              <span>Total Outfit Price</span>
                              <span>₹ {products.reduce((acc, current) => acc + current.price, 0)}</span>
                          </div>
                      </div>
                     
                  </div>
              </div>
          </div>


          <h2 className="text-xl p-5 px-10 font-medium mb-4">Product Details</h2>

          <div className="flex flex-col md:flex-row items-start gap-2 justify-evenly md:px-20 sm:px-20 px-4 w-full sm:gap-4 md:h-[75%] sm:h-[60%] h-[85%]">
              {/* Column 1 */}
              <div className="flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full sm:h-[30%] h-[20%] md:h-full">
                  {outfitCollection[0].productCollection.slice(0, 2).map((product, index) => (
                      <div
                          key={index}
                          title={product.title}
                          className="md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex-center p-4 md:p-6 overflow-hidden"
                      >
                          <Image
                              src={product.image}
                              alt={product.title}
                              width={300}
                              height={300}
                              className="w-full h-full py-1 p-1 object-contain"
                          />
                      </div>
                  ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col md:w-[40%] w-full h-[40vh] sm:h-[57%] md:h-[103%]">
                  <div
                      className={`relative h-full md:py-10 py-4 w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center flex-col md:gap-10 gap-5 p-4 md:p-6 overflow-hidden`}
                  >
                      <Image
                          src={outfitCollection[0].outfitImage}
                          alt={outfitCollection[0].outfitTitle}
                          height={400}
                          width={400}
                          className="w-full h-full md:p-0 sm:p-[2.8rem] xl:p-[.4rem] p-6 object-contain"
                      />
                      <h1 className="absolute bottom-3 w-full h-fit capitalize font-bold text-xl md:text-2xl text-wrap text-center text-[#767676] overflow-hidden">
                          {outfitCollection[0].outfitTitle}
                      </h1>
                  </div>
              </div>

              {/* Column 3 */}
              <div className="flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full sm:h-[30%] h-[25%] sm:mt-16 md:mt-0 md:h-full">
                  {outfitCollection[0].productCollection.slice(2, 4).map((product, index) => (
                      <div
                          key={index + 2}
                          title={product.title}
                          className="md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex-center p-4 md:p-6 overflow-hidden"
                      >
                          <Image
                              src={product.image}
                              alt={product.title}
                              width={300}
                              height={300}
                              className="w-full h-full py-1 p-1 object-contain"
                          />
                      </div>
                  ))}
              </div>
          </div>

    </div>
  )
}

export default NewOutFit