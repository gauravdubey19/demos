"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchForm: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        console.log('Search query:', query);
        // You can trigger search logic here instead of form submit
        // Perform your live search or API call here
    };

    return (
        <form className="flex items-center w-[20rem]  ">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Search color='#8888' />
                </div>
                <input
                    type="text"
                    id="simple-search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className=" border border-[#ffb433] bg-white text-[#888888] text-sm rounded-lg focus:ring-[#ffb433] focus:border-[#ffb433] block w-full ps-10 p-2.5 outline-none"
                    placeholder="Search for a related question... "
                    required
                />
            </div>
        </form>
    );
};

export default SearchForm;
