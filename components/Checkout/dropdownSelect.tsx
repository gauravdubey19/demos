import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react';

interface DropdownI{
    title:string
    selected:any
}

const Dropdown = ({ title,selected }: DropdownI) => {

    return (
    
      <div className="relative">
          <button id="dropdownDefaultButton" className="text-black bg-[#fff4e0] hover:bg-[#efdab3]  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center " type="button">
              {title}: {selected}
          </button>

          {/* Dropdown menu */}
          {/* {isDropdownOpen && (
              <div id="dropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-20 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {option?.map((size:any) => (
                          <li key={size}>
                              <button onClick={() => handleSizeSelect(size)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">
                                  {size}
                              </button>
                          </li>
                      ))}
                  </ul>
              </div>
          )} */}
      </div>
  )
}

export default Dropdown