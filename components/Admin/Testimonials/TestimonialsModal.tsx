"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { UploadButton } from "@/utils/uploadthing";

interface ModalI {
    onRefresh?: () => void;
}

const TestimonialsModal = ({  onRefresh }: ModalI) => {
    const [videoFile, setVideoFile] = useState<{ url: string; name: string } | null>(null);
    const [currentVideoName, setCurrentVideoName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (videoFile) {
            if (onRefresh) {
                onRefresh(); // Call the onRefresh prop when the form is submitted
            }
            setIsDialogOpen(false); // Close the dialog
            setVideoFile(null); // Reset videoFile to null
            setCurrentVideoName(""); // Reset currentVideoName to an empty string
        } else {
            alert("Please upload a video before saving changes.");
        }
    };

    const renderContent = () => {
        return (
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="w-full">
                    <label className="block mb-2 text-lg font-medium text-gray-900">
                        Video: <span className="font-semibold">{currentVideoName || "No video selected"}</span>
                    </label>
                    <UploadButton
                        endpoint="videoUploader"
                        onClientUploadComplete={(res) => {
                            if (res && res.length > 0) {
                                const file = res[0];
                                const url = file.url;
                                const name = file.name;
                                setVideoFile({ url, name });
                                setCurrentVideoName(name);
                            }
                        }}
                        onUploadError={(error) => {
                            alert(`Error uploading video: ${error.message}`);
                        }}
                        className="w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-900 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="w-full">
                    <label className="block mb-2 text-lg font-medium text-gray-900">
                        Video Preview:
                    </label>
                    <div className="w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 relative overflow-hidden">
                        {videoFile ? (
                            <video
                                src={videoFile.url}
                                controls
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-500">
                                No video selected
                            </div>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]"
                >
                    Save Changes
                </Button>
            </form>
        );
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <div className='inline-flex'>
                    <Button
                        variant={'default'}
                        className='bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]'
                        onClick={() => setIsDialogOpen(true)} // Open the dialog
                    >
                        <Plus /> Add Testimonials
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
                        Create New Testimonial
                    </DialogTitle>
                    {renderContent()}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default TestimonialsModal;