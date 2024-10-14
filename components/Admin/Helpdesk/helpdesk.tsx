"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const HelpDesk = () => {
  const [issueType, setIssueType] = useState("");
  const [subIssueLabel, setSubIssueLabel] = useState("");
  const [subIssueVisible, setSubIssueVisible] = useState(false);
  const router = useRouter();
  const {data: session} = useSession();
  const [formData, setFormData] = useState({
    fullName: "",
    subIssue: "",
    description: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Issue Type Change
  const handleIssueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setIssueType(selectedType);

    // Set label and visibility based on issue type
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");

    const { fullName, subIssue, description } = formData;

    // Check if the issue type is selected
    if (!issueType) {
      setError("Please select an issue type.");
      setSending(false);
      return;
    }

    try {
      // Call the POST API to submit the form
      const res = await fetch("/api/helpdesk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          issueType,
          subIssueType: subIssue,
          description,
          userId: session?.user?.id
        }),
      });

      if (!res.ok) throw new Error("Failed to submit ticket");

      setSuccess("Ticket submitted successfully!");
      toast({
        title: "Ticket submitted successfully",
        description: "We will get back to you soon.",
      });
      setFormData({ fullName: "", subIssue: "", description: "" });
      router.push("/profile/my-tickets");
    } catch (err) {
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
  {/* Welcome Section */}
  <div className="text-center mb-8 px-4 md:px-12 lg:px-24">
    <h2 className="text-xl md:text-2xl mb-4">Hi, How can we help?</h2>
    <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-6">
      Welcome to our Help & Support Center. Here you can find answers to
      common questions, track your orders, manage returns, and more. Our
      goal is to provide you with the best possible support experience.
    </p>
  </div>

  {/* Search Bar */}
  <div className="mb-8 px-4 md:px-12 lg:px-24">
    <input
      type="text"
      placeholder="Ask any question..."
      className="w-full p-2 md:p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
    <span className="text-center flex justify-center text-gray-500 mt-2 text-sm">
      Or choose an option
    </span>
  </div>

  {/* FAQ Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 px-4 md:px-12 lg:px-24">
    <div className="bg-yellow-100 p-4 rounded-md">
      <div className="flex justify-center mb-2">
        <span className="text-2xl">❓</span>
      </div>
      <Link href="/contact" passHref>
        <div className="text-center cursor-pointer">
          <p className="text-lg font-semibold">FAQ</p>
          <small className="text-gray-500">
            Find quick answers to common questions here!
          </small>
        </div>
      </Link>
    </div>
    <div className="bg-blue-50 p-4 rounded-md">
      <div className="flex justify-center mb-2">
        <span className="text-2xl">❓</span>
      </div>
      <Link href="/profile/my-tickets" passHref>
        <div className="text-center cursor-pointer">
          <p className="text-lg font-semibold">Your Ticket</p>
          <small className="text-gray-500">
          Track your tickets history and status here
          </small>
        </div>
      </Link>
    </div>
  </div>

  {/* Submit Ticket Form */}
  <div className="mt-8 flex justify-center px-4 md:px-6 lg:px-12">
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Submit a Ticket</h2>
                {/* Displaying errors and success */}
                {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form onSubmit={handleSubmit}>
        {/* Full Name Input */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100"
            required
             value={formData.fullName}
                onChange={handleInputChange}
          />
        </div>

    

            {/* Issue Type Select */}
            <div className="mb-4">
              <label htmlFor="issueType" className="block text-gray-700 mb-2">Issue Type</label>
              <select
                id="issueType"
                value={issueType}
                onChange={handleIssueTypeChange}
                className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select Issue Type</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Product Issue">Product Issue</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            {/* Sub Issue Input (Conditionally Rendered) */}
            {subIssueVisible && (
              <div className="mb-4">
                <label htmlFor="subIssue" className="block text-gray-700 mb-2">{subIssueLabel}</label>
                <input
                  type="text"
                  id="subIssue"
                  placeholder={subIssueLabel}
                  value={formData.subIssue}
                  onChange={handleInputChange}
                  className="w-full p-2 md:p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            )}

        {/* Description Textarea */}
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

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 md:w-1/3 p-2 md:p-3 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500 transition-colors disabled:opacity-70"
                disabled={sending}
              >
                {sending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
