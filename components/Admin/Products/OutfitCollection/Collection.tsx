import React from 'react'
import CollectionCard from './CollectionCard'


const Collection = () => {
  return (
    <div className='h-screen overflow-y-auto p-5'>
        <div className='flex items-center justify-between'>
              <h1 className="text-3xl font-bold mb-8">Outfit Collection</h1>
              <div className="flex justify-end mb-8">
                  <input
                      type="text"
                      placeholder="Search..."
                      className="border border-yellow-500 w-[20rem] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
              </div>
        </div>
        <div className='grid grid-cols-2'>
          <CollectionCard/>
        </div>
          
    </div>
  )
}

export default Collection