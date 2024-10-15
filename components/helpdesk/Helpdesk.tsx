// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { toast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";

// const HelpDesk = () => {
//     const [issueType, setIssueType] = useState("");
//     const [subIssueLabel, setSubIssueLabel] = useState("");
//     const [subIssueVisible, setSubIssueVisible] = useState(false);
//     const router = useRouter();
//     const { data: session } = useSession();
//     const [formData, setFormData] = useState({
//         fullName: "",
//         subIssue: "",
//         description: "",
//     });
//     const [sending, setSending] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     // Handle Issue Type Change
//     const handleIssueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedType = e.target.value;
//         setIssueType(selectedType);

//         // Set label and visibility based on issue type
//         if (selectedType === "Order Issue") {
//             setSubIssueLabel("Order Number");
//             setSubIssueVisible(true);
//         } else if (selectedType === "Product Issue") {
//             setSubIssueLabel("Product Number");
//             setSubIssueVisible(true);
//         } else {
//             setSubIssueLabel("");
//             setSubIssueVisible(false);
//         }
//     };

//     // Handle form input changes
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { id, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [id]: value }));
//     };

//     // Handle form submission
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setSending(true);
//         setError("");
//         setSuccess("");

//         const { fullName, subIssue, description } = formData;

//         // Check if the issue type is selected
//         if (!issueType) {
//             setError("Please select an issue type.");
//             setSending(false);
//             return;
//         }

//         try {
//             // Call the POST API to submit the form
//             const res = await fetch("/api/helpdesk", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     fullName,
//                     issueType,
//                     subIssueType: subIssue,
//                     description,
//                     userId: session?.user?.id
//                 }),
//             });

//             if (!res.ok) throw new Error("Failed to submit ticket");

//             setSuccess("Ticket submitted successfully!");
//             toast({
//                 title: "Ticket submitted successfully",
//                 description: "We will get back to you soon.",
//             });
//             setFormData({ fullName: "", subIssue: "", description: "" });
//             router.push("/profile/my-tickets");
//         } catch (err) {
//             setError("An error occurred while submitting the ticket.");
//             toast({
//                 title: "Error submitting ticket",
//                 variant: "destructive",
//                 description: "Please try again later.",
//             });
//         } finally {
//             setSending(false);
//         }
//     };

//     return (
//         <div className="m-4 md:m-8 mb-6">
//             {/* Welcome Section */}
//             <div className="text-center mb-8 px-4 md:px-12 lg:px-24">
//                 <h2 className="text-xl md:text-2xl mb-4">Hi, How can we help?</h2>
//                 <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-6">
//                     Welcome to our Help & Support Center. Here you can find answers to
//                     common questions, track your orders, manage returns, and more. Our
//                     goal is to provide you with the best possible support experience.
//                 </p>
//             </div>

//             {/* Search Bar */}
//             <div className="mb-8 px-4 md:px-12 lg:px-24">
//                 <input
//                     type="text"
//                     placeholder="Ask any question..."
//                     className="w-full p-2 md:p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 />
//                 <span className="text-center flex justify-center text-gray-500 mt-2 text-sm">
//                     Or choose an option
//                 </span>
//             </div>

//             {/* FAQ Section */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 px-4 md:px-12 lg:px-24">
//                 <div className="bg-yellow-100 p-4 rounded-md">
//                     <div className="flex justify-center mb-2">
//                         <span className="text-2xl">❓</span>
//                     </div>
//                     <Link href="/contact" passHref>
//                         <div className="text-center cursor-pointer">
//                             <p className="text-lg font-semibold">FAQ</p>
//                             <small className="text-gray-500">
//                                 Find quick answers to common questions here!
//                             </small>
//                         </div>
//                     </Link>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-md">
//                     <div className="flex justify-center mb-2">
//                         <span className="text-2xl">❓</span>
//                     </div>
//                     <Link href="/profile/my-tickets" passHref>
//                         <div className="text-center cursor-pointer">
//                             <p className="text-lg font-semibold">Your Ticket</p>
//                             <small className="text-gray-500">
//                                 Track your tickets history and status here
//                             </small>
//                         </div>
//                     </Link>
//                 </div>
//             </div>

//             {/* Submit Ticket Form */}
//             <div className="mt-8 flex justify-center px-4 md:px-6 lg:px-12">
//                 <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
//                     <h2 className="text-xl md:text-2xl font-semibold mb-6">Submit a Ticket</h2>
//                     {/* Displaying errors and success */}
//                     {error && <p className="text-red-500 mb-4">{error}</p>}
//                     {success && <p className="text-green-500 mb-4">{success}</p>}

//                     <form onSubmit={handleSubmit}>
//                         {/* Full Name Input */}
//                         <div className="mb-4">
//                             <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
//                             <input
//                                 type="text"
//                                 id="fullName"
//                                 placeholder="Full Name"
//                                 className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100"
//                                 required
//                                 value={formData.fullName}
//                                 onChange={handleInputChange}
//                             />
//                         </div>



//                         {/* Issue Type Select */}
//                         <div className="mb-4">
//                             <label htmlFor="issueType" className="block text-gray-700 mb-2">Issue Type</label>
//                             <select
//                                 id="issueType"
//                                 value={issueType}
//                                 onChange={handleIssueTypeChange}
//                                 className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                                 required
//                             >
//                                 <option value="">Select Issue Type</option>
//                                 <option value="Order Issue">Order Issue</option>
//                                 <option value="Payment Issue">Payment Issue</option>
//                                 <option value="Product Issue">Product Issue</option>
//                                 <option value="Technical Issue">Technical Issue</option>
//                                 <option value="General Inquiry">General Inquiry</option>
//                             </select>
//                         </div>

//                         {/* Sub Issue Input (Conditionally Rendered) */}
//                         {subIssueVisible && (
//                             <div className="mb-4">
//                                 <label htmlFor="subIssue" className="block text-gray-700 mb-2">{subIssueLabel}</label>
//                                 <input
//                                     type="text"
//                                     id="subIssue"
//                                     placeholder={subIssueLabel}
//                                     value={formData.subIssue}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                                 />
//                             </div>
//                         )}

//                         <div className="mb-4">
//                             <label htmlFor="fullName" className="block text-gray-700 mb-2">Order Number</label>
//                             <input
//                                 type="number"
//                                 id="Order Number"
//                                 placeholder="Order Number"
//                                 className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100"
//                                 required
//                                 value={formData.fullName}
//                                 onChange={handleInputChange}
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label htmlFor="fullName" className="block text-gray-700 mb-2">Attachements</label>
//                             <label className="flex items-center px-4 py-2  w-full p-2 md:p-3 border  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100border border-[#8888] bg text-white rounded-md cursor-pointer">
//                                 <span className="bg-yellow-400 p-2 rounded-md">Choose File</span>
//                                 <input type="file" className="hidden" />
//                             </label>
//                         </div>

//                         {/* Description Textarea */}
//                         <div className="mb-6">
//                             <label htmlFor="description" className="block text-gray-700 mb-2">Detailed Message/Description</label>
//                             <textarea
//                                 id="description"
//                                 placeholder="Detailed Message/Description"
//                                 value={formData.description}
//                                 onChange={handleInputChange}
//                                 className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
//                                 required
//                             ></textarea>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="flex justify-center">
//                             <button
//                                 type="submit"
//                                 className="w-1/2 md:w-1/3 p-2 md:p-3 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500 transition-colors disabled:opacity-70"
//                                 disabled={sending}
//                             >
//                                 {sending ? "Submitting..." : "Submit"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HelpDesk;






"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
    removeFile as removeFileAction,
    uploadMultipleNewFiles,
} from "@/utils/actions/fileUpload.action";

interface FormData {
    fullName: string;
    subIssue: string;
    description: string;
    orderNumber: string;
}

const HelpDesk: React.FC = () => {
    const [issueType, setIssueType] = useState<string>("");
    const [subIssueLabel, setSubIssueLabel] = useState<string>("");
    const [subIssueVisible, setSubIssueVisible] = useState<boolean>(false);
    const router = useRouter();
    const { data: session } = useSession();
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        subIssue: "",
        description: "",
        orderNumber: "",
    });
    const [sending, setSending] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

    const handleIssueTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setIssueType(selectedType);

        if (selectedType === "Order Issue") {
            setSubIssueLabel("Order Number");
            setSubIssueVisible(true);
        } else if (selectedType === "Product Issue") {
            setSubIssueLabel("Product Number");
            setSubIssueVisible(true);
        } else {
            setSubIssueLabel("");
            setSubIssueVisible(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const validFiles = files.filter(file =>
                ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)
            );

            if (validFiles.length + selectedFiles.length > 4) {
                toast({
                    title: "File limit exceeded",
                    description: "You can only upload a maximum of 4 files.",
                    variant: "destructive",
                });
                return;
            }

            if (validFiles.length !== files.length) {
                toast({
                    title: "Invalid file type",
                    description: "Only PDF, JPG, and PNG files are allowed.",
                    variant: "destructive",
                });
            }

            const imagesFormData = new FormData();
            validFiles.forEach(file => {
                imagesFormData.append("files", file);
            });

            try {
                const imagesUrl = await uploadMultipleNewFiles(imagesFormData);

                if (!imagesUrl || imagesUrl.length === 0) {
                    throw new Error("Image upload failed");
                }

                setUploadedUrls((prevUrls:any) => [...prevUrls, ...imagesUrl]);
                setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles].slice(0, 4));
            } catch {
                toast({
                    title: "Images upload failed.",
                    description: "Please try again later...",
                    variant: "destructive",
                });
            }
        }
    };

    const removeFile = async (index: number) => {
        const fileToRemove = uploadedUrls[index];
        try {
            await removeFileAction(fileToRemove);
            setUploadedUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
            setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        } catch {
            toast({
                title: "Image removal failed.",
                description: "Please try again later...",
                variant: "destructive",
            });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setError("");
        setSuccess("");

        const { fullName, description } = formData;

        if (!issueType || !fullName || !description) {
            setError("Please fill in all required fields.");
            setSending(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('fullName', fullName);
        formDataToSend.append('issueType', issueType);
        formDataToSend.append('subIssueType', formData.subIssue);
        formDataToSend.append('description', description);
        formDataToSend.append('orderNumber', formData.orderNumber);
        formDataToSend.append('userId', session?.user?.id || '');
        uploadedUrls.forEach((url, index) => {
            formDataToSend.append(`file${index}`, url);
        });

        try {
            const res = await fetch("/api/helpdesk", {
                method: "POST",
                body: formDataToSend,
            });

            if (!res.ok) throw new Error("Failed to submit ticket");

            setSuccess("Ticket submitted successfully!");
            toast({
                title: "Ticket submitted successfully",
                description: "We will get back to you soon.",
            });
            setFormData({ fullName: "", subIssue: "", description: "", orderNumber: "" });
            setSelectedFiles([]);
            setUploadedUrls([]);
            router.push("/profile/my-tickets");
        } catch {
            setError("An error occurred while submitting the ticket.");
            toast({
                title: "Error submitting ticket",
                variant: "destructive",
                description: "Please try again later.",
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="m-4 md:m-8 mb-6">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="issueType" className="block text-gray-700 mb-2">Issue Type</label>
                    <select
                        id="issueType"
                        value={issueType}
                        onChange={handleIssueTypeChange}
                        className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                    >
                        <option value="">Select an issue</option>
                        <option value="Order Issue">Order Issue</option>
                        <option value="Product Issue">Product Issue</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {subIssueVisible && (
                    <div className="mb-4">
                        <label htmlFor="subIssue" className="block text-gray-700 mb-2">{subIssueLabel}</label>
                        <input
                            type="text"
                            id="subIssue"
                            value={formData.subIssue}
                            onChange={handleInputChange}
                            className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                )}

                {/* Attachments Section */}
                <div className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="attachments" className="block text-gray-700 mb-2">Attachments</label>
                        <label className="flex items-center px-4 py-2 w-full p-2 md:p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100 border border-[#8888] rounded-md cursor-pointer">
                            <span className="bg-yellow-400 p-2 rounded-md text-black">Choose File</span>
                            <input
                                type="file"
                                id="attachments"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.jpg,.jpeg,.png"
                                multiple
                            />
                        </label>
                        <div className="mt-2 flex flex-wrap">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="relative flex items-center justify-center bg-gray-100 p-2 rounded m-1 group">
                                    {file.type === 'application/pdf' ? (
                                        <span className="text-gray-800">{file.name}</span>
                                    ) : (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="w-40 h-40 object-cover rounded"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description Field */}
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 mb-2">Detailed Message/Description</label>
                        <textarea
                            id="description"
                            placeholder="Detailed Message/Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
                            required
                        ></textarea>
                    </div>

                    {/* Error and Success Messages */}
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    {success && <div className="mb-4 text-green-500">{success}</div>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={sending}
                        className={`w-full p-3 text-white bg-yellow-400 rounded-md transition-colors duration-300 ${sending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
                    >
                        {sending ? 'Sending...' : 'Submit Ticket'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HelpDesk;