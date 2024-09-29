// import { createUploadthing, type FileRouter } from "uploadthing/next";
// // import { UploadThingError } from "uploadthing/server";

// const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// // FileRouter for your app, can contain multiple FileRoutes
// export const ourFileRouter = {
//     // Define as many FileRoutes as you like, each with a unique routeSlug
//     imageUploader: f({ video: { maxFileSize: "32MB" } })
//         // Set permissions and file types for this FileRoute
//         .middleware(async ({ req }) => {
//             // This code runs on your server before upload
//             const user = await auth(req);


//             return { userId: user.id };
//         })
//         .onUploadComplete(async ({ metadata, file }) => {
//             // This code RUNS ON YOUR SERVER after upload
//             console.log("Upload complete for userId:", metadata.userId);

//             console.log("file url", file.url);

//             // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
//             return { uploadedBy: metadata.userId };
//         }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;



import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
    videoUploader: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
        .middleware(async ({ req }) => {
            const user = await auth(req);
            if (!user) throw new Error("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("File URL:", file.url);
            return { uploadedBy: metadata.userId };
        }),

    thumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async ({ req }) => {
            const user = await auth(req);
            if (!user) throw new Error("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Thumbnail upload complete for userId:", metadata.userId);
            console.log("Thumbnail URL:", file.url);
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;