"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { removeFile, uploadNewFile } from "@/utils/actions/fileUpload.action";

interface ModalI {
  onRefresh?: () => void;
}

const TestimonialsModal = ({ onRefresh }: ModalI) => {
  const router = useRouter();
  const [video, setVideo] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [personTitle, setPersonTitle] = useState("");
  const [testimony, setTestimony] = useState("");
  const [rating, setRating] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingVideoUpload, setLoadingVideoUpload] = useState<boolean>(false);

  const handleVideoFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const videoFile = e.target.files?.[0];
    if (!videoFile)
      return toast({
        title: "Video file not found.",
        description: "Please try again later...",
        variant: "destructive",
      });

    setLoadingVideoUpload(true);

    if (video) {
      const rmVideo = await removeFile(video);
      if (!rmVideo) {
        toast({
          title: "Failed to remove previour video.",
          description: "Please try again later...",
          variant: "destructive",
        });
        setLoadingVideoUpload(false);
        return;
      }
    }

    const videoFileFormData = new FormData();
    videoFileFormData.append("file", videoFile);
    const videoUrl = (await uploadNewFile(videoFileFormData)) as string;

    if (!videoUrl) {
      toast({
        title: "Testimonial video upload failed.",
        description: "Please try again later...",
        variant: "destructive",
      });
      setLoadingVideoUpload(false);
      return;
    }

    setVideo(videoUrl);
    setLoadingVideoUpload(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingSave(true);

    if (!fullName || !personTitle || !testimony || !rating || !video) {
      setLoadingSave(false);
      return toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }

    try {
      const response = await fetch("/api/testimonials/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          personTitle,
          testimony,
          rating: rating.toString(),
          videoLink: video,
        }),
      });

      if (!response.ok) {
        toast({
          title: "Failed to upload testimonial",
          description: "Please try again later...",
          variant: "destructive",
        });
        // throw new Error("Failed to upload testimonial");
      }

      const result = await response.json();
      //   console.log(result);

      if (onRefresh) {
        onRefresh();
      }
      setIsDialogOpen(false);
      resetForm();

      toast({
        title: result.message || result.error,
        description: result.message
          ? "Now you can view the Testimonials."
          : "Please try again later...",
        variant: result.error ? "destructive" : "default",
      });
      router.refresh();
    } catch (error) {
      console.error("Error uploading testimonial:", error);
      // alert("Failed to upload testimonial. Please try again.");
      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  const resetForm = () => {
    setFullName("");
    setPersonTitle("");
    setTestimony("");
    setRating(1);
    // setVideo("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="inline-flex">
          <Button
            variant={"default"}
            className="bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus /> Add Testimonials
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white text-black p-4 w-[30rem] max-w-full h-fit max-h-[85%] rounded-md overflow-hidden">
        <DialogHeader className="w-full">
          <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
            Upload Testimonial
          </DialogTitle>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="w-full h-[65%] p-1 space-y-2 overflow-x-hidden overflow-y-auto">
              <div className="w-full h-fit flex-center">
                <div className="relative group w-fit h-60 rounded-lg overflow-hidden">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    ref={fileInputRef}
                    className="absolute inset-0 z-30 opacity-0 cursor-pointer"
                  />
                  {loadingVideoUpload ? (
                    <div className="absolute inset-0 w-60 text-sm px-4 text-primary flex-center bg-black/50 animate-pulse">
                      Uploading Video...
                    </div>
                  ) : (
                    <>
                      {video && (
                        <div className="absolute inset-0 z-10 text-sm text-primary cursor-pointer flex-center bg-black/40 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
                          Change Video
                        </div>
                      )}
                      {video && (
                        <video
                          src={video}
                          // controls
                          className="w-full h-full object-cover"
                        />
                      )}
                      {!video && !loadingVideoUpload && (
                        <div className="flex items-center justify-center w-full h-full px-4 rounded-lg text-black bg-zinc-200 group-hover:bg-zinc-300 ease-in-out duration-300 overflow-hidden">
                          Chooes video
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Person Title
                </label>
                <Input
                  type="text"
                  value={personTitle}
                  onChange={(e) => setPersonTitle(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Testimony
                </label>
                <Textarea
                  value={testimony}
                  onChange={(e) => setTestimony(e.target.value)}
                  required
                  className=" w-full"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Rating
                </label>
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
            </div>

            <Button
              type="submit"
              disabled={loadingSave}
              variant="default"
              className="w-full"
            >
              {loadingSave ? "Uploading Testimonial..." : "Upload Testimonial"}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsModal;
