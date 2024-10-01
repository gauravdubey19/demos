
"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from 'lucide-react';

interface ModalI {
    onRefresh?: () => void;
}

const TestimonialsModal = ({ onRefresh }: ModalI) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [personTitle, setPersonTitle] = useState("");
    const [testimony, setTestimony] = useState("");
    const [rating, setRating] = useState<number>(1);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
        } else {
            alert('Please select a valid video file.');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("personTitle", personTitle);
        formData.append("testimony", testimony);
        formData.append("rating", rating.toString());
        if (videoFile) {
            formData.append("video", videoFile);
        }

        try {
            const response = await fetch("/api/Testimonials/Push", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload testimonial");
            }

            const result = await response.json();
            console.log(result);

            if (onRefresh) {
                onRefresh();
            }
            setIsDialogOpen(false);
            resetForm();
        } catch (error) {
            console.error("Error uploading testimonial:", error);
            // alert("Failed to upload testimonial. Please try again.");
        }
    };

    const resetForm = () => {
        setFullName("");
        setPersonTitle("");
        setTestimony("");
        setRating(1);
        setVideoFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const renderContent = () => {
        return (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Full Name</label>
                    <Input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Person Title</label>
                    <Input
                        type="text"
                        value={personTitle}
                        onChange={(e) => setPersonTitle(e.target.value)}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Testimony</label>
                    <Textarea
                        value={testimony}
                        onChange={(e) => setTestimony(e.target.value)}
                        required
                        className=" w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-900 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* <div className="w-full">
                    <label className="block mb-2 text-lg font-medium text-gray-900">
                        Video Preview:
                    </label>
                    <div className="w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 relative overflow-hidden">
                        {videoFile ? (
                            <video
                                src={URL.createObjectURL(videoFile)}
                                controls
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-500">
                                No video selected
                            </div>
                        )}
                    </div>
                </div> */}

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]"
                >
                    Upload Testimonial
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
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <Plus /> Add Testimonials
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
                        Upload Testimonial
                    </DialogTitle>
                    {renderContent()}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default TestimonialsModal;