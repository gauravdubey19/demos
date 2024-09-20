
interface ColorSelectorI{
    selectedColor:any
    setSelectedColor:any
    colors:any
} 

const ColorSelector = ({ colors, selectedColor, setSelectedColor }: ColorSelectorI) => {
    

    const handleColorSelect = (id:any) => {
        setSelectedColor(id);
    };

    return (
        <div className='flex flex-row items-center gap-2'>
            <p>Color:</p>
            <div className="flex space-x-2">
                {colors?.map((color:any) => (
                    <div
                        key={color.id}
                        onClick={() => handleColorSelect(color.id)}
                        className={`w-6 h-6 rounded-full border border-gray-400 ${color.color} flex items-center justify-center cursor-pointer`}
                    >
                        {selectedColor === color.id && (
                            <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
        
    );
};

export default ColorSelector;
