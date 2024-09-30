import React from 'react';

interface AddressCardProps {
    isSameAddress?: boolean;
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
    selected: boolean;
    onSelect: () => void;  // Handling selection
}

const AddressCard = ({
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
    isSameAddress
}: AddressCardProps) => {
    return (
        <div className="border border-gray-300 w-full h-max p-4 rounded-lg flex justify-between items-start bg-white">
            <div className="flex flex-row items-start gap-3">
                <input
                    type="radio"
                    checked={selected}
                    onChange={onSelect}
                    className="h-5 w-5 border-0 border-[#2ed396] rounded-full checked:bg-[#2ed396] focus:ring-0 cursor-pointer mt-1.5"
                    style={{
                        accentColor: '#2CD396',
                    }}
                />
                <div className="font-dmSans">
                    <p className="text-lg sm:text-xl font-dmSansSemiBold truncate capitalize">{`${firstName} ${lastName}`}</p>
                    {isSameAddress && (
                        <span className='text-green text-sm'>
                            Your profile address
                        </span>)
                            }
                    <p className="text-sm sm:text-base text-color-tertiary mt-2">+91 {phone}</p>
                    {address?.length > 0 && (
                        <p
                            className="text-sm sm:text-base text-color-tertiary"
                            style={{ textTransform: 'capitalize' }}
                        >
                            {address}
                        </p>
                    )}
                    <p className="text-sm sm:text-base text-color-tertiary">{`${city?.name}, ${state?.name}, ${pincode}`}</p>
                </div>
            </div>
        </div>
    );
};

export default AddressCard;