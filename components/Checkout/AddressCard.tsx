import React from 'react';

interface AddressCardProps {
    address: string;
    city: string;
    state: string;
    zip: string;
    selected: boolean;
    onSelect: () => void;  // Add a new prop for handling selection
}

const AddressCard = ({ address, city, state, zip, selected, onSelect }: AddressCardProps) => {
    return (
        <div className="border border-[#8888] w-full h-max p-3 sm:p-4 rounded-lg">
            <div className="flex flex-row items-center gap-2 sm:gap-3">
                <input
                    type="radio"
                    checked={selected}
                    onChange={onSelect}
                    className="appearance-none h-4 w-4 sm:h-5 sm:w-5 border-2 border-[#2ed396] rounded-full checked:bg-[#2ed396] focus:ring-0 cursor-pointer"
                />
                <h2 className="text-lg sm:text-xl font-semibold truncate">{`${city}, ${state}`}</h2>
            </div>
            <div className="pl-6 sm:pl-8 mt-2">
                <p className="text-sm sm:text-base text-[#494949] break-words">{address}</p>
                <p className="text-sm sm:text-base text-[#494949]">{zip}</p>
            </div>
        </div>
    );
};

export default AddressCard;
