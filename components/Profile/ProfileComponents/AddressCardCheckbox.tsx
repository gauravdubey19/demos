import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRouter } from 'next/navigation'; // Import useRouter
import React, { useEffect } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';

export interface AddressClient {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  pincode: string;
  state: {
    name: string;
    code: string;
  };
  city: {
    name: string;
    code: string;
  };
}

interface AddressCardCheckboxProps extends AddressClient {
  selected: boolean;
  onSelect: () => void; // Handling selection
}

const AddressCardCheckbox = ({
  firstName,
  lastName,
  phone,
  address,
  city,
  state,
  pincode,
  selected,
  onSelect,
  _id,
}: AddressCardCheckboxProps) => {
  const router = useRouter(); // Initialize useRouter
    const {setEditAddressData} = useGlobalContext();
    const setHandleEditAddress = () => {
        console.log('Edit Address');
        setEditAddressData({
            firstName,
            lastName,
            phone,
            address,
            city,
            state,
            pincode,
            _id
        });
        router.push('/profile/edit-address');

        }
  return (
    <div className="border border-gray-300 w-full h-max p-4 rounded-lg flex justify-between items-start bg-white">
      <div className="flex flex-row items-start gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="h-5 w-5 border-2 border-[#2ed396] rounded-md checked:bg-[#2ed396] focus:ring-0 cursor-pointer mt-1.5"
          style={{
            accentColor: '#2CD396',
          }}
        />
        <div className="font-dmSans">
          <p className="text-lg sm:text-xl font-dmSansSemiBold truncate capitalize">{`${firstName} ${lastName}`}</p>
          <p className="text-sm sm:text-base text-color-tertiary mt-2">+91 {phone}</p>
          {address.length > 0 && (
            <p
              className="text-sm sm:text-base text-color-tertiary"
              style={{ textTransform: 'capitalize' }}
            >
              {address}
            </p>
          )}
          <p className="text-sm sm:text-base text-color-tertiary">{`${city.name}, ${state.name}, ${pincode}`}</p>
        </div>
      </div>
      <Button
        className="bg-transparent text-primary rounded-none active:translate-y-0.5  hover:bg-yellow-500 hover:text-white"
        onClick={setHandleEditAddress}
      >
        <BiSolidEditAlt size={24} />
      </Button>
    </div>
  );
};

export default AddressCardCheckbox;