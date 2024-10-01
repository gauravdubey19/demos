
"use client";
import React, { useEffect } from 'react';
import AddressCard from './AddressCard';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { IoIosInformationCircleOutline } from 'react-icons/io';


interface AddressI {
    addressData: {
        _id: string;
        firstName: string;
        lastName: string;
        address: string;
        phone_number: string;
        zipCode: string;
        state: {
            name: string;
            code: string;
        };
        city: {
            name: string;
            code: string;
        };
        isSameAddress?: boolean;
    }[];
    handleSelectAddress: (v: any) => void;
    selectedAddressId: any;
    fetchingAddress: boolean;
}

const Address = ({ addressData, handleSelectAddress, selectedAddressId,fetchingAddress }: AddressI) => {
    const [hasProfileAddress, setHasProfileAddress] = React.useState(false);
    useEffect(() => {
        console.log('Address Data in address: ', addressData);
    }, [addressData]);
    
    //map over the addressdata and check if any one of them has isSameAddress as true
    
    useEffect(() => {
        const hasProfileAddress = addressData.some((address) => address.isSameAddress);
        console.log('hasProfileAddress: ', hasProfileAddress);
        setHasProfileAddress(hasProfileAddress);
    }, [addressData]);
    if(fetchingAddress){
        return <div className="p-4 md:p-5 space-y-4 pt-7">Loading...</div>
    }
    return (

        <div className="p-4 md:p-5 space-y-4 pt-7">
            {/* Container for Address Cards */}
            <div className="space-y-0">
            {!hasProfileAddress && 
            //a message to info user to complet profile for showing profile address
            <div className="bg-emerald-50 text-green p-4 rounded-lg flex flex-row gap-x-2">
                <IoIosInformationCircleOutline size={20} />
                <span>Please complete your profile to view your profile address here.
                </span>
            </div>
            }
                {addressData.map((address) => (
                    <div
                        key={address._id}
                        className={`cursor-pointer ${selectedAddressId === address._id ? 'bg-gray-100' : ''} p-4 rounded-lg`}
                        onClick={() => handleSelectAddress(address._id)}
                    >
                        <AddressCard
                            isSameAddress={address.isSameAddress}
                            _id={address._id}
                            city={address.city}
                            state={address.state}
                            address={address.address}
                            firstName={address.firstName}
                            lastName={address.lastName}
                            phone={address.phone_number}
                            pincode={address.zipCode}
                            selected={selectedAddressId === address._id}
                            onSelect={() => handleSelectAddress(address._id)}
                        />
                    </div>
                ))}
            </div>

            {/* Add Address Button */}
            <Link href={'/profile/add-a-new-address'} className="flex flex-row gap-4 items-center justify-center border-2 border-[#FFB433] text-xl md:text-2xl text-[#FFB433] w-full py-2 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                <Plus height={30} width={30} className="md:h-8 md:w-8" /> Add Address
            </Link>
        </div>

    );
};

export default Address;