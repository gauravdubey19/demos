import React, { useEffect } from 'react';

interface Ticket {
  _id: string;
  fullName: string;
  userId: string;
  issueType: string;
  subIssueType: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  attachments: any[];
}

const TicketComponent: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const [issueType, setIssueType] = React.useState(ticket.issueType);
  const [subIssueLabel, setSubIssueLabel] = React.useState("");
  const [subIssueVisible, setSubIssueVisible] = React.useState(false);

  useEffect(() => {
    const handleIssueTypeChange = () => {
      const selectedType = ticket.issueType;
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
    handleIssueTypeChange();
  }, [ticket.issueType]);
  return (
    <div className="border p-4 rounded shadow bg-white px-6">
      <h2 className="text-xl font-bold mb-2">{ticket.issueType}</h2>
      <p className={`text-sm text-gray-600 mb-1 `}>Status: {" "}
      <span className={`${ticket.status?.toLowerCase() === "open" ?"text-green":"text-red-500"} capitalize`}>{ticket.status}</span></p>
     {subIssueVisible && (
        <p className="text-sm text-gray-600 mb-1">
          {subIssueLabel}: {ticket.subIssueType}
        </p>
      )  
        }
  
      <p className="text-sm text-gray-600 mb-1">Opened At: {new Date(ticket.createdAt).toLocaleString()}</p>
      <p className="text-sm text-gray-600 mb-1">Description: {ticket.description}</p>
    </div>
  );
};

export default TicketComponent;