// "use client"
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Plus } from 'lucide-react'
// import { ImageUp } from 'lucide-react';
// import demoimg from '@/public/ss.png'
// import Image from "next/image"



// interface ModalI{
//     variant:'create' | 'edit'
// }

// const Modal = ({ variant }:ModalI) => {
//     const [videoFile, setVideoFile] = useState<File | null>(null);
//     const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

//     const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setVideoFile(event.target.files[0]);
//         }
//     };

//     const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setThumbnailFile(event.target.files[0]);
//         }
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         console.log('Video File:', videoFile);
//         console.log('Thumbnail File:', thumbnailFile);
//     };

//     if(variant==='create'){
//         return (
//             <Dialog>
//                 <DialogTrigger asChild>
//                     <div className='inline-flex'>
//                         <Button variant={'default'} className='bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]'>
//                             <Plus /> Add Testimonials
//                         </Button>
//                     </div>
//                 </DialogTrigger>
//                 <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
//                     <DialogHeader className="w-full">
//                         <DialogTitle className="text-2xl font-normal text-center w-full mb-4">Create New Testimonial</DialogTitle>
//                         <form onSubmit={handleSubmit} className="w-full space-y-6">

//                             {/* Upload Video Section */}
//                             <div className="w-full">
//                                 <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
//                                     Upload Video
//                                 </label>
//                                 <input
//                                     className="block w-full outline-none text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
//                                     id="file_input"
//                                     type="file"
//                                     accept="video/*"
//                                     onChange={handleVideoChange}
//                                     required
//                                 />
//                             </div>

//                             {/* Upload Thumbnail Section */}
//                             <div className="w-full">
//                                 <label htmlFor="dropzone-file" className="block mb-2 text-sm font-medium text-gray-900">
//                                     Upload Thumbnail
//                                 </label>
//                                 <div className="flex items-center justify-center w-full">
//                                     <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                             <ImageUp />
//                                             <p className="mb-2 text-sm text-gray-500">
//                                                 <span className="font-semibold">Choose Thumbnail</span>
//                                             </p>
//                                             <p className="text-xs text-gray-500">340 x 560</p>
//                                         </div>
//                                         <input
//                                             id="dropzone-file"
//                                             type="file"
//                                             accept="image/*"
//                                             className="hidden"
//                                             onChange={handleThumbnailChange}
//                                             required
//                                         />
//                                     </label>
//                                 </div>
//                             </div>

//                             {/* Submit Button */}
//                             <div className="w-full flex justify-end pt-4">
//                                 <Button type="submit" variant={'default'} className="w-full bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]">
//                                     <Plus />Create Testimonila
//                                 </Button>
//                             </div>
//                         </form>
//                     </DialogHeader>
//                 </DialogContent>
//             </Dialog>
//         )
//     }



//     const handleDelete=()=>{
//         console.log('delete');
//     }

//     const [currentVideoName, setCurrentVideoName] = useState("SampleVideo.mp4");
//     const [currentThumbnail, setCurrentThumbnail] = useState(demoimg);



//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <div className="inline-flex">
//                     <Button variant="default" className="px-4 py-2 underline text-blue-500 bg-white rounded-md hover:bg-primary-dark">
//                         View details
//                     </Button>
//                 </div>
//             </DialogTrigger>

//             <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
//                 <DialogHeader className="w-full">
//                     <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
//                         Testimonial Details
//                     </DialogTitle>

//                     <form onSubmit={handleSubmit} className="w-full space-y-6">
//                         {/* Current Video and Upload Video Section */}
//                         <div className="w-full">
//                             <label className="block mb-2 text-lg font-medium text-gray-900" htmlFor="file_input">
//                                 Video: <span className="font-semibold">{currentVideoName}</span>
//                             </label>
//                             <input
//                                 className="block w-full outline-none text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
//                                 id="file_input"
//                                 type="file"
//                                 accept="video/*"
//                                 onChange={(e) => {
//                                     handleVideoChange(e);
//                                     if (e.target.files) {
//                                         setCurrentVideoName(e.target.files[0]?.name || currentVideoName);
//                                     }
//                                 }}
//                             />
//                         </div>

//                         {/* Current Thumbnail and Upload Thumbnail Section */}
//                         <div className="w-full">
//                             <label htmlFor="dropzone-file" className="block mb-2 text-lg font-medium text-gray-900">
//                                 Thumbnail:
//                             </label>

//                             <div className="flex items-center justify-center w-full mb-4">
//                                 <div className="w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 relative overflow-hidden">
//                                     {/* Thumbnail Image */}
//                                     <Image
//                                         src={currentThumbnail}
//                                         alt="Current Thumbnail"
//                                         className="object-cover w-full h-full"
//                                     />
//                                     {/* Replace Thumbnail Overlay */}
//                                     <label
//                                         htmlFor="dropzone-file"
//                                         className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
//                                     >
//                                         <ImageUp />
//                                         <p className="mb-2 text-sm text-white">
//                                             <span className="font-semibold">Choose New Thumbnail</span>
//                                         </p>
//                                         <p className="text-xs text-white">340 x 560</p>
//                                         <input
//                                             id="dropzone-file"
//                                             type="file"
//                                             accept="image/*"
//                                             className="hidden"
//                                             onChange={handleThumbnailChange}
//                                         />
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Save Changes and Delete Testimonial Buttons */}
//                         <div className="w-full flex gap-4 justify-between pt-4">
//                             <Button
//                                 variant="destructive"
//                                 className="w-1/3 bg-white text-red-700 hover:text-white hover:bg-red-700 font-semibold border-2 border-red-700"
//                                 onClick={handleDelete}
//                             >
//                                 Delete Testimonial
//                             </Button>

//                             <Button
//                                 type="submit"
//                                 variant="default"
//                                 className="w-2/3 bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]"
//                             >
//                                 Save Changes
//                             </Button>
//                         </div>
//                     </form>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default Modal;



"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { ImageUp } from 'lucide-react';
import demoimg from '@/public/ss.png'
import Image from "next/image"
import { StaticImageData } from 'next/image'; // Add this import

interface ModalI {
    variant: 'create' | 'edit'
}

const Modal = ({ variant }: ModalI) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [currentVideoName, setCurrentVideoName] = useState("SampleVideo.mp4");
    const [currentThumbnail, setCurrentThumbnail] = useState(demoimg);

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setVideoFile(event.target.files[0]);
            if (variant === 'edit') {
                setCurrentVideoName(event.target.files[0].name);
            }
        }
    };

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setThumbnailFile(event.target.files[0]);
            if (variant === 'edit') {
                setCurrentThumbnail(URL.createObjectURL(event.target.files[0]) as unknown as StaticImageData);
            }
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Video File:', videoFile);
        console.log('Thumbnail File:', thumbnailFile);
    };

    const handleDelete = () => {
        console.log('delete');
    };

    const renderContent = () => {
        if (variant === 'create') {
            return (
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
                            Upload Video
                        </label>
                        <input
                            className="block w-full outline-none text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                            id="file_input"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="dropzone-file" className="block mb-2 text-sm font-medium text-gray-900">
                            Upload Thumbnail
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <ImageUp />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Choose Thumbnail</span>
                                    </p>
                                    <p className="text-xs text-gray-500">340 x 560</p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleThumbnailChange}
                                required
                                />
                            </label>
                        </div>
                    </div>

                    <div className="w-full flex justify-end pt-4">
                        <Button type="submit" variant={'default'} className="w-full bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]">
                            <Plus />Create Testimonial
                        </Button>
                    </div>
                </form>
            );
        } else {
            return (
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div className="w-full">
                        <label className="block mb-2 text-lg font-medium text-gray-900" htmlFor="file_input">
                            Video: <span className="font-semibold">{currentVideoName}</span>
                        </label>
                        <input
                            className="block w-full outline-none text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                            id="file_input"
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                                handleVideoChange(e);
                                if (e.target.files) {
                                    setCurrentVideoName(e.target.files[0]?.name || currentVideoName);
                                }
                            }}
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="dropzone-file" className="block mb-2 text-lg font-medium text-gray-900">
                            Thumbnail:
                        </label>

                        <div className="flex items-center justify-center w-full mb-4">
                            <div className="w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 relative overflow-hidden">
                                <Image
                                    src={currentThumbnail}
                                    alt="Current Thumbnail"
                                    className="object-cover w-full h-full"
                                />
                                <label
                                    htmlFor="dropzone-file"
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                    <ImageUp />
                                    <p className="mb-2 text-sm text-white">
                                        <span className="font-semibold">Choose New Thumbnail</span>
                                    </p>
                                    <p className="text-xs text-white">340 x 560</p>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleThumbnailChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex gap-4 justify-between pt-4">
                        <Button
                            variant="destructive"
                            className="w-1/3 bg-white text-red-700 hover:text-white hover:bg-red-700 font-semibold border-2 border-red-700"
                            onClick={handleDelete}
                        >
                            Delete Testimonial
                        </Button>

                        <Button
                            type="submit"
                            variant="default"
                            className="w-2/3 bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            );
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='inline-flex'>
                    <Button variant={'default'} className='bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]'>
                        {variant === 'create' ? <><Plus /> Add Testimonials</> : 'View details'}
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
                        {variant === 'create' ? 'Create New Testimonial' : 'Testimonial Details'}
                    </DialogTitle>
                    {renderContent()}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;