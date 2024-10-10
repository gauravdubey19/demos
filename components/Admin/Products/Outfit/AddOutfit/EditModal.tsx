import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <div className='inline-flex'> */}
        <button className="mt-4 w-full bg-white text-yellow-500 border border-yellow-500 px-6 py-2 hover:text-white hover:bg-yellow-500 rounded transition-all">
          Edit
        </button>
        {/* </div> */}
      </DialogTrigger>
      <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
        <DialogHeader className="w-full">
          <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
            Image Name
          </DialogTitle>
          <div className="bg-white p-6 rounded-lg ">
            <Image
              src="https://placehold.co/600x400"
              alt="img"
              className="w-full h-auto mb-6 rounded-lg"
            />
            <input
              type="text"
              placeholder="wright name..."
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Save
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
