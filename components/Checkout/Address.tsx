

import React from 'react';
import AddressCard from './AddressCard';
import { Plus } from 'lucide-react';

interface AddressI {
    addressData: Array<{
        address: string;
        city: { name: string; code: string };
        state: { name: string; code: string };
        zip: string;
        selected: boolean;
        _id: string;
    }>;
    handleSelectAddress: (v: any) => void;
    selectedAddressId: any
}

const Address = ({ addressData, handleSelectAddress, selectedAddressId }: AddressI) => {


    return (

        <div className="p-4 md:p-5 space-y-4 pt-7">
            {/* Container for Address Cards */}
            <div className="space-y-3">
                {addressData.map((address) => (
                    <div
                        key={address._id}
                        className={`cursor-pointer ${selectedAddressId === address._id ? 'bg-gray-100' : ''} p-4 rounded-lg`}
                        onClick={() => handleSelectAddress(address._id)}
                    >
                        <AddressCard
                            address={address.address}
                            city={address.city.name}
                            state={address.state.name}
                            zip={address.zip}
                            selected={selectedAddressId === address._id}
                            onSelect={() => handleSelectAddress(address._id)}
                        />
                    </div>
                ))}
            </div>

            {/* Add Address Button */}
            <div className="flex flex-row gap-4 items-center justify-center border-2 border-[#FFB433] text-xl md:text-2xl text-[#FFB433] w-full py-2 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                <Plus height={30} width={30} className="md:h-8 md:w-8" /> Add Address
            </div>
        </div>

    );
};

export default Address;