import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/testimonials/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();


import { generateReactHelpers } from "@uploadthing/react/hooks";


export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();