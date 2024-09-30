// import React from 'react';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import Image from "next/image";

// interface AddModalProps {
//     searchQuery: string;
//     setSearchQuery: (query: string) => void;
//     suggestions: any[];
//     handleSelectProduct: (product: any) => void;
//     selectedProduct: any;
//     loading: boolean;
//     onSave: () => void;
//     onOpen: () => void;
// }

// const AddModal: React.FC<AddModalProps> = ({
//     searchQuery,
//     setSearchQuery,
//     suggestions,
//     handleSelectProduct,
//     selectedProduct,
//     loading,
//     onSave,
//     onOpen,
// }) => {
//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <button
//                     className="mt-4 w-full bg-white text-yellow-500 border border-yellow-500 px-6 py-2 hover:text-white hover:bg-yellow-500 rounded transition-all"
//                     onClick={onOpen}
//                 >
//                     Select Product
//                 </button>
//             </DialogTrigger>
//             <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
//                 <DialogHeader className="w-full">
//                     <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
//                         Product
//                     </DialogTitle>
//                     <div className="bg-white p-6 rounded-lg relative flex flex-col sm:flex-row space-x-0 sm:space-x-6">
//                         <div className="w-full sm:w-1/2 flex flex-col">
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 placeholder="Search Product"
//                                 className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                             />
//                             <ul className="overflow-y-auto -ml-5 max-h-40 mt-[3.2rem] absolute w-1/2 bg-white shadow-md border rounded-md p-2 space-y-2 ">
//                                 {loading ? (
//                                     <li className="p-2 text-gray-500">Loading suggestions...</li>
//                                 ) : suggestions.length > 0 ? (
//                                     suggestions.map((suggestion: any) => (
//                                         <li
//                                             key={suggestion.id}
//                                             className="hover:bg-gray-100 p-2 cursor-pointer animate-slide-down"
//                                             onClick={() => {
//                                                 setSearchQuery(suggestion.title);
//                                                 handleSelectProduct(suggestion);
//                                             }}
//                                         >
//                                             <div className="w-full h-fit flex items-center space-x-2">
//                                                 <Image
//                                                     src={suggestion.mainImage}
//                                                     alt={suggestion.title}
//                                                     width={40}
//                                                     height={40}
//                                                     className="object-cover rounded"
//                                                 />
//                                                 <div>
//                                                     <p className="font-semibold">{suggestion.title}</p>
//                                                 </div>
//                                             </div>
//                                         </li>
//                                     ))
//                                 ) : !loading ? (
//                                     <li className="p-2 text-gray-500">
//                                         No products found matching your query..
//                                     </li>
//                                 ) : null}
//                             </ul>
//                         </div>
//                         <div className="w-full sm:w-1/2 flex flex-col items-center">
//                             {selectedProduct ? (
//                                 <Image
//                                     height={160}
//                                     width={200}
//                                     src={selectedProduct.mainImage}
//                                     alt="img"
//                                     className="mb-6 object-cover rounded-lg"
//                                 />
//                             ) : (
//                                 <img
//                                     src="https://placehold.co/600x400"
//                                     alt="img"
//                                     className="w-[200px] h-[160px] mb-6 object-cover rounded-lg"
//                                 />
//                             )}
//                             <button
//                                 className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//                                 onClick={onSave}
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default AddModal;


import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface AddModalProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    suggestions: any[];
    handleSelectProduct: (product: any) => void;
    selectedProduct: any;
    loading: boolean;
    onSave: () => void;
    onOpen: () => void;
}

const AddModal: React.FC<AddModalProps> = ({
    searchQuery,
    setSearchQuery,
    suggestions,
    handleSelectProduct,
    selectedProduct,
    loading,
    onSave,
    onOpen,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleSave = () => {
        onSave();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="mt-4 w-full bg-white text-yellow-500 border border-yellow-500 px-6 py-2 hover:text-white hover:bg-yellow-500 rounded transition-all"
                    onClick={() => {
                        onOpen();
                        setOpen(true);
                    }}
                >
                    Select Product
                </button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
                        Product
                    </DialogTitle>
                    <div className="bg-white p-6 rounded-lg relative flex flex-col sm:flex-row space-x-0 sm:space-x-6">
                        <div className="w-full sm:w-1/2 flex flex-col">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Product"
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <ul className="overflow-y-auto -ml-5 max-h-40 mt-[3.2rem] absolute w-1/2 bg-white shadow-md border rounded-md p-2 space-y-2 ">
                                {loading ? (
                                    <li className="p-2 text-gray-500">Loading suggestions...</li>
                                ) : suggestions.length > 0 ? (
                                    suggestions.map((suggestion: any) => (
                                        <li
                                            key={suggestion.id}
                                            className="hover:bg-gray-100 p-2 cursor-pointer animate-slide-down"
                                            onClick={() => {
                                                setSearchQuery(suggestion.title);
                                                handleSelectProduct(suggestion);
                                            }}
                                        >
                                            <div className="w-full h-fit flex items-center space-x-2">
                                                <Image
                                                    src={suggestion.mainImage}
                                                    alt={suggestion.title}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover rounded"
                                                />
                                                <div>
                                                    <p className="font-semibold">{suggestion.title}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : !loading ? (
                                    <li className="p-2 text-gray-500">
                                        No products found matching your query..
                                    </li>
                                ) : null}
                            </ul>
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col items-center">
                            {selectedProduct ? (
                                <Image
                                    height={160}
                                    width={200}
                                    src={selectedProduct.mainImage}
                                    alt="img"
                                    className="mb-6 object-cover rounded-lg"
                                />
                            ) : (
                                <img
                                    src="https://placehold.co/600x400"
                                    alt="img"
                                    className="w-[200px] h-[160px] mb-6 object-cover rounded-lg" />
                            )}
                            <button
                                className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddModal;