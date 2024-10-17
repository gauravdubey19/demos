// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import TicketComponent from '../ProfileComponents/TicketComponent';

// interface Ticket {
//   _id: string;
//   fullName: string;
//   userId: string;
//   issueType: string;
//   subIssueType: string;
//   description: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   attachments: any[];
// }

// const MyTickets = () => {
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { data: session } = useSession();

//   useEffect(() => {
//     const fetchTickets = async () => {
//       if (!session?.user?.id) return;
//       try {
//         const res = await fetch(`/api/helpdesk/${session?.user?.id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-store', // Ensure no caching
//           },
//         });
//         if (!res.ok) {
//           throw new Error('Failed to fetch tickets');
//         }

//         const data = await res.json();
//         setTickets(data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, [session?.user?.id]);

//   if (loading) {
//     return <div className='p-4'>Loading...</div>;
//   }

//   if (error) {
//     return <div className='p-4'>Error: {error}</div>;
//   }

//   return (
//     <div className='mt-4 px-4 pb-4'>
//       {tickets.length === 0 ? (
//         <div>No tickets found for this user.</div>
//       ) : (
//         <ul>
//           {tickets.map((ticket) => (
//             <TicketComponent key={ticket._id} ticket={ticket} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyTickets;


import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import TicketComponent from '../ProfileComponents/TicketComponent';
import TicketModal from '@/components/tickets/TicketsModel'; // Import the TicketModal

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

const MyTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null); // State to track the selected ticket
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTickets = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/helpdesk/${session?.user?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store', // Ensure no caching
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const data = await res.json();
        setTickets(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [session?.user?.id]);

  if (loading) {
    return <div className='p-4'>Loading...</div>;
  }

  if (error) {
    return <div className='p-4'>Error: {error}</div>;
  }

  return (
    <div className='mt-4 px-4 pb-4'>
      {tickets.length === 0 ? (
        <div>No tickets found for this user.</div>
      ) : (
        <ul>
          {tickets.map((ticket,index) => (
            <li key={ticket._id}>
              <TicketComponent
                ticket={ticket}
                onClick={() => setSelectedTicket(ticket)} // Set the selected ticket when clicked
              />
            </li>
          ))}
        </ul>
      )}

      {/* Render the TicketModal if a ticket is selected */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)} // Close modal by resetting the selected ticket
        />
      )}
    </div>
  );
};

export default MyTickets;
