"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Address, useGlobalContext } from '@/context/GlobalProvider';
import AddressCardCheckbox from '../ProfileComponents/AddressCardCheckbox';

const ShippingAddresses = () => {
  const { addresses, addressLoading,selectedAddresses, setSelectedAddresses,setAddressLoading,fetchAddresses,setAddresses,getAddresses} = useGlobalContext();
  
  useEffect(() => {
    getAddresses();
  }, [getAddresses]);
  const handleSelect = (addressId: string) => {
    setSelectedAddresses((prevSelected) =>
      prevSelected.includes(addressId)
        ? prevSelected.filter((id) => id !== addressId)
        : [...prevSelected, addressId]
    );
  };

  if (addressLoading) {
    return <div className='px-6'>Loading...</div>;
  }

  return (
    <>
      <div className="mt-4 mb-4 px-4">
        <div className='flex flex-row items-center mb-4'>
          {/* Select All */}
          <input
            className='h-5 w-5 border-2 border-[#2ed396] rounded-md focus:ring-0 cursor-pointer'
            type="checkbox"
            id="select-all"
            checked={addresses.length > 0 && selectedAddresses.length === addresses.length} // Check if all addresses are selected
            onChange={(e) =>
              setSelectedAddresses(e.target.checked ? addresses.map((address) => address._id) : [])
            } 
            style={{
              accentColor: '#2CD396',
            }}
          />
          <label htmlFor="select-all" className="ml-2 text-base font-medium text-color-primary">
            Select All
          </label>
        </div>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <AddressCardCheckbox
              _id={address._id}
              key={index}
              city={address.city}
              state={address.state}
              address={address.address}
              firstName={address.firstName}
              lastName={address.lastName}
              phone={address.phone_number}
              pincode={address.zipCode}
              selected={selectedAddresses.includes(address._id)} // Check if the address is selected
              onSelect={() => handleSelect(address._id)} // Toggle selection
            />
          ))
        ) : (
          <div>No addresses found.</div>
        )}
      </div>
    </>
  );
};

export default ShippingAddresses;