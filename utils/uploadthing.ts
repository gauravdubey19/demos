import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

import { generateReactHelpers } from "@uploadthing/react/hooks";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
