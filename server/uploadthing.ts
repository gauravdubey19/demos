import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
    apiKey: process.env.UPLOADTHING_SECRET_GD, // YOUR UPLOADTHING_SECRET
});