"use server";

import { utapi } from "@/server/uploadthing";

export const uploadNewFile = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const { data } = await utapi.uploadFiles(file);
    return data?.url || null;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
};

export const uploadMultipleNewFiles = async (formData: FormData) => {
  try {
    const files = formData.getAll("files") as File[];
    if (!files || files.length === 0) throw new Error("No files provided");

    const uploadedFilesUrls = await Promise.all(
      files.map(async (file: File) => {
        const { data } = await utapi.uploadFiles(file);
        console.log(data?.url);
        return data?.url || null;
      })
    );

    return uploadedFilesUrls;
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw new Error("Multiple file upload failed");
  }
};
