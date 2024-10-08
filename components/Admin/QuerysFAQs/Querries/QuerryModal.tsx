"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";


interface QuerryModal{
    query: any; 
    onClick:any;
    selectedQuery:any;
    onRefreshQueries:any;
}

const QuerryModal = ({ query, onClick, selectedQuery, onRefreshQueries }: QuerryModal) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [name, setName] = useState("");
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleReply = async () => {
        if (!answer) return;

        setLoading(true);

        try {
            const response = await fetch('/api/querry/put', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: selectedQuery.name,
                    email: selectedQuery.email,
                    answer,
                    queryId: selectedQuery._id,
                }),
            });

            const data = await response.json();

            if (data.status === 200) {
                // Update the local state instantly to show the new answer
                selectedQuery.answers = [...selectedQuery.answers, answer];
                setAnswer('');
                setLoading(false);
                onRefreshQueries(); // Call the onRefreshQueries callback function
                toast({
                    title: "Mail Sent",
                    description: "Reply sent successfully!",
                    variant: "default",
                });
            } else {
                setError(data.error);
                setLoading(false);
            }
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitted name:", name);
        // You can handle the form submission logic here
        setIsDialogOpen(false); // Close the modal after submission
        setName(""); // Reset the input field
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <div>
                    {query.status === 'answered' ? (
                        <Button
                            variant="default"
                            className="bg-[#2ed396] font-semibold hover:bg-[#26b27f]"
                            onClick={() => { setIsDialogOpen(true); onClick() }}
                        >
                            Answered
                        </Button>
                    ) : (
                        <Button
                            variant="default"
                            className="bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]"
                            onClick={() => { setIsDialogOpen(true); onClick() }}
                        >
                            Pending
                        </Button>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="bg-white text-black p-4 max-w-[30rem] h-fit rounded-md overflow-hidden flex flex-col items-center justify-center">
                <DialogHeader className="w-full flex flex-col items-center">
                    <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
                        {query.status === 'answered' ? (
                            <h1 className="text-lg font-semibold text-green">Answered Query</h1>
                        ) : (
                            <h1 className="text-lg font-semibold text-red-500">Unanswered Query</h1>
                        )}
                    </DialogTitle>
                    <div className="flex items-center w-full mb-4 justify-start">
                        <Image height={100} width={100} src="https://static.vecteezy.com/system/resources/previews/019/896/008/large_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" alt="Customer profile picture" className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <p className="font-semibold">{selectedQuery?.name}</p>
                            <p className="text-gray-500">{selectedQuery?.email}</p>
                        </div>
                    </div>
                    <div className="mb-4 w-full mt-4 ">
                        <h3 className="text-md font-semibold mb-1 text-start">Question</h3>
                        <div className="p-3 border rounded-md bg-gray-100">
                            {selectedQuery?.question}
                        </div>
                    </div>

                    {selectedQuery?.answers?.length > 0 ? (
                        <div className="mb-4 h-[10rem] overflow-y-scroll w-full">
                            <h3 className="text-md font-semibold mb-1 text-start">Response Given</h3>
                            <div className="p-3 border rounded-md bg-gray-100">
                                {selectedQuery.answers[0]}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                                <div className="mb-4 h-[10rem] overflow-y-scroll w-full">
                                    <h3 className="text-md font-semibold mb-1 text-start">Response</h3>
                                    <textarea
                                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                        rows={6}
                                        placeholder="Enter Reply ..."
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    ></textarea>
                                </div>
                           
                            <button
                                className="w-full p-2 bg-yellow-500 text-white rounded-lg"
                                onClick={handleReply}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Post Reply'}
                            </button>
                        </div>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default QuerryModal;
