"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Check, X } from 'lucide-react';

interface TicketModalProps {
    ticket: any; // Accept the selected ticket as a prop
    onClose: () => void; // Function to close the modal
}

const TicketModal = ({ ticket, onClose }: TicketModalProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(true); // Modal is open when ticket is selected

    const handleButtonClick = () => {
        setIsDialogOpen(false); // Close the modal
        onClose(); // Call the onClose prop function
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
            setIsDialogOpen(isOpen);
            if (!isOpen) onClose(); // Call onClose when modal is closed
        }}>
            <DialogContent className="bg-white h-[30rem] overflow-y-auto text-black p-4 max-w-md rounded-md">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center font-semibold">
                        {ticket.issueType}
                    </DialogTitle>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Ticket Details</h2>
                        <div className="border p-4 rounded-md mt-2">
                            <p>Status: <span className="text-green-500">{ticket.status}</span></p>
                            <p>Order Id: {ticket.subIssueType}</p>
                            <p>Opened At: {ticket.createdAt}</p>
                        </div>
                    </div>

                    {/* Attachments Section */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Attachments</h2>
                        <div className="flex space-x-2 mt-2">
                            {ticket.attachments && ticket.attachments.length > 0 ? (
                                ticket.attachments.map((attachment: string, index: number) => (
                                    <div key={index} className="w-20 h-20">
                                        {attachment.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                            <img
                                                src={attachment}
                                                alt={`attachment-${index}`}
                                                className="object-cover w-full h-full rounded-md border"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-1 border p-2 rounded-md">
                                                <i className="fas fa-file"></i>
                                                <span>File</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>No attachments found.</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Issue Description</h2>
                        <div className="border p-4 rounded-md mt-2">
                            <p>{ticket.description}</p>
                        </div>
                    </div>
                    {
                        ticket.response ? (
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Response Given</h2>
                                <div className="border p-4 rounded-md mt-2">
                                    <p>{ticket.response}</p>
                                </div>
                            </div>
                        ) : (
                            null
                        )
                    }

                    <div className="flex justify-between mt-10">
                        <button
                            className="flex items-center space-x-1 bg-green text-green-500 px-4 py-2 rounded-md"
                            onClick={handleButtonClick} // Close modal on click
                        >
                            <Check />
                            <span>Satisfied</span>
                        </button>
                        <button
                            className="flex items-center space-x-1 bg-red-100 text-red-500 px-4 py-2 rounded-md"
                            onClick={handleButtonClick} // Close modal on click
                        >
                            <X />
                            <span>Not Satisfied</span>
                        </button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default TicketModal;
