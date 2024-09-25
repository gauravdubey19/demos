import React from 'react';
import CartCard from './CartCard';
import { useCart } from "@/context/CartProvider";


interface ShoppingCartI {
    cartData: any[];
    setSelectedItems: (count: number) => void;
    selectedItems: number;
    onSelectItem: (id: any, isSelected: boolean) => void;
    onSelectAll: (selectAll: boolean) => void;
}

const ShoppingCart = ({
    cartData,
    setSelectedItems,
    selectedItems,
    onSelectItem,
    onSelectAll
}: ShoppingCartI) => {

    const { handleClearCart } = useCart(); //console.log(isOpen);


    return (
        <div>
            <div className='flex flex-col md:flex-row justify-between text-lg md:text-xl py-5'>
                <div className='flex flex-row gap-3 items-center'>
                    <input
                        type="checkbox"
                        className="h-5 w-5 md:h-6 md:w-6 rounded-xl form-checkbox accent-[#2ed396] focus:accent-[#2ed396]"
                        id="selectAll"
                        checked={selectedItems === cartData.length && cartData.length > 0}
                        onChange={(e) => onSelectAll(e.target.checked)}
                    />
                    <p>{`${selectedItems}/${cartData.length} items selected`}</p>
                </div>
                <div onClick={handleClearCart} className='text-red-500 cursor-pointer pt-3 md:pt-0' >
                    Remove all
                </div>
            </div>

            <div>
                {cartData.length === 0 ? (
                    <div className='flex items-center pt-10 justify-center'>
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    cartData.map((data: any, index: number) => (
                        <CartCard
                            key={index}
                            data={data}
                            onSelectItem={onSelectItem}
                        />
                    ))
                )}
            </div>
        </div>

    );
};

export default ShoppingCart;