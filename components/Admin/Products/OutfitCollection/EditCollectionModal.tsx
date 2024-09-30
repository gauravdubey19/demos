import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from 'react';
import CollectionGrid from "./CollectionGrid";

const EditModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="mt-4 w-full bg-white text-yellow-500 border border-yellow-500 px-6 py-2 hover:text-white hover:bg-yellow-500 rounded transition-all">
                    Edit
                </button>
            </DialogTrigger>
            {/* Adjust the modal width to fit the grid content */}
            <DialogContent className="bg-white scale-75 text-black p-6 w-max max-w-full rounded-md">
                <DialogHeader className="w-full text-center mb-4">
                    <div className="p-4">
                        {/* Adjusting the grid width and layout to fit in the modal */}
                        <div className="max-w-full">
                            <CollectionGrid />
                        </div>
                    </div>
                    <h2 className="font-semibold text-2xl text-center">Name</h2>
                    <div className="flex flex-row items-center justify-between gap-2">
                        <button className="w-full p-3 border text-yellow-500 border-yellow-500 hover:text-white rounded-lg hover:bg-yellow-600">
                            Edit
                        </button>
                        <button className="w-full p-3 border border-red-500 text-red-500 hover:text-white rounded-lg hover:bg-red-600">
                            Close
                        </button>
                    </div>
                   
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditModal;
