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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && isPlaying) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(true);
    }
  };

  const handleVideoFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const videoFile = e.target.files?.[0];
    if (!videoFile) {
      toast({
        title: "Video file wasn't provided.",
        description: "Please try again later...",
        variant: "destructive",
      });
      return;
    }

    setLoadingVideoUpload(true);

    if (video) {
      const rmVideo = await removeFile(video);
      if (!rmVideo) {
        // toast.error("Failed to remove previous video. Please try again later...");
        toast({
          title: "Failed to remove previous video.",
          description: "Please try again later...",
          variant: "destructive",
        });
        setLoadingVideoUpload(false);
        return;
      }
    }

    const videoFileFormData = new FormData();
    videoFileFormData.append("file", videoFile);

    try {
      const videoUrl = (await uploadNewFile(videoFileFormData)) as string;
      if (!videoUrl) {
        return toast({
          title: "Testimonial video upload failed.",
          description: "Please try again later...",
          variant: "destructive",
        });
      }

      setVideo(videoUrl);
    } catch (error) {
      toast({
        title: "Testimonial video upload failed.",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoadingVideoUpload(false);
    }
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
    setVideo("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus /> Add Testimonials
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black p-4 w-[30rem] max-w-full h-fit max-h-[85%] rounded-md overflow-hidden">
        <DialogHeader className="w-full">
          <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
            Upload Testimonial
          </DialogTitle>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="w-full h-[65%] p-1 space-y-2 overflow-x-hidden overflow-y-auto">
              <div className="w-full h-fit flex-center">
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative group w-40 h-60 rounded-lg overflow-hidden"
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    ref={fileInputRef}
                    className="absolute inset-0 z-30 opacity-0 cursor-pointer"
                  />
                  {loadingVideoUpload ? (
                    <div className="absolute inset-0 text-sm px-4 text-black flex-center bg-zinc-300 animate-pulse">
                      Uploading Video...
                    </div>
                  ) : (
                    <>
                      {video && (
                        <div>
                          <div className="absolute inset-0 z-10 text-sm text-primary cursor-pointer flex items-end justify-center py-4 bg-black/40 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
                            Change Video
                          </div>
                          <video
                            ref={videoRef}
                            src={video}
                            playsInline
                            className="w-full h-full object-cover"
                            // controls // Added controls for better UX
                          />
                        </div>
                      )}
                      {!video && !loadingVideoUpload && (
                        <div className="flex-center w-full h-full px-4 rounded-lg text-black bg-zinc-200 group-hover:bg-zinc-300 ease-in-out duration-300 overflow-hidden">
                          Choose Video
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <InputField
                label="Full Name"
                value={fullName}
                onChange={setFullName}
                required
              />
              <InputField
                label="Person Title"
                value={personTitle}
                onChange={setPersonTitle}
                required
              />
              <TextareaField
                label="Testimony"
                value={testimony}
                onChange={setTestimony}
                required
              />
              <RatingField rating={rating} setRating={setRating} />
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

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  required,
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-900">
      {label}
    </label>
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full"
    />
  </div>
);

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  required,
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-900">
      {label}
    </label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full"
    />
  </div>
);

interface RatingFieldProps {
  rating: number;
  setRating: (value: number) => void;
}

const RatingField: React.FC<RatingFieldProps> = ({ rating, setRating }) => (
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
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>
);

export default TestimonialsModal;
