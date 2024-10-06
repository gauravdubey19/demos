// "use client";

// import { CldUploadWidget } from "next-cloudinary";

// interface CloudinaryResult {
//   secure_url?: string;
// }

// const UploadFile = ({
//   multiple = false,
//   setUrls,
//   children,
// }: {
//   multiple?: boolean;
//   setUrls: React.Dispatch<React.SetStateAction<string[]>>;
//   children: React.ReactNode;
// }) => {
//   return (
//     <>
//       <CldUploadWidget
//         uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_Preset}
//         // signatureEndpoint="/api/sign-cloudinary-file-upload"
//         options={{ multiple }}
//         onSuccess={(result, { widget }) => {
//           const info = result?.info;

//           const urls: string[] = Array.isArray(info)
//             ? info.map((file: CloudinaryResult) => file.secure_url || "")
//             : [];

//           if (urls.length > 0) {
//             setUrls((prevUrls) => [...prevUrls, ...urls]);
//           }
//         }}
//         onQueuesEnd={(result, { widget }) => {
//           widget.close();
//         }}
//       >
//         {({ open }) => {
//           function handleOnClick() {
//             setUrls([]);
//             open();
//           }
//           return <button onClick={handleOnClick}>{children}</button>;
//         }}
//       </CldUploadWidget>
//     </>
//   );
// };

// export default UploadFile;

import React from 'react'

export default function UploadsFile() {
  return (
    <div>UploadsFile</div>
  )
}
