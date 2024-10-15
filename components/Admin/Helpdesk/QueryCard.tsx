// import { ChevronRight, CircleCheck, Hourglass, MessageSquareMore } from 'lucide-react'
// import Image from 'next/image';
// import React from 'react'
// import QuerryModal from './QuerryModal';

// interface QueryCardI{
//     query:any
//     onClick: () => void;
//     selectedQuery: any;
//     onRefreshQueries: () => void;
// }

// const QueryCard = ({ query, onClick, selectedQuery, onRefreshQueries }: QueryCardI) => {
//   return (
      
//       <div className="bg-[#f8f8f8] p-4 rounded-lg flex border justify-between  items-center gap-5" >
//         <div className='flex flex-row items-start '>
//               <div className=' flex flex-col items-start gap-4'>
//                   <Image height={100} width={100} src="https://static.vecteezy.com/system/resources/previews/019/896/008/large_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" alt="Customer profile picture" className="w-12 h-12 rounded-full mr-4" />
//               </div>
//               <div>
//                   <p className="font-semibold">{query.name}</p>
//                   {/* <p className="text-gray-500">{query.email}</p> */}
//                   <p className="text-gray-500 w-[15rem] overflow-hidden">{query.question}</p>
//               </div>
//         </div>
                     
                      
//           <QuerryModal query={query} onClick={onClick} selectedQuery={selectedQuery} onRefreshQueries={onRefreshQueries}/>
//                   </div>
             
//   )
// }

// export default QueryCard



import { ChevronRight, CircleCheck, Hourglass, MessageSquareMore } from 'lucide-react'
import Image from 'next/image';
import React from 'react'
import QuerryModal from './QuerryModal';

interface QueryCardI {
    ticket: any
    onClick: () => void;
    selectedQuery: any;
    onRefreshQueries: () => void;
}

const QueryCard = ({ ticket, onClick, selectedQuery, onRefreshQueries }: QueryCardI) => {
    // Function to truncate text if too long
    const truncateText = (text: string | undefined, maxLength: number) => {
        // Check if the text is defined and is a string
        if (typeof text !== 'string') return '';
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };


    // Function to render different icons based on query status
    const renderStatusIcon = (status: string) => {
        switch (status) {
            case 'Resolved':
                return <CircleCheck className="text-green-500" size={24} />;
            case 'In Progress':
                return <Hourglass className="text-yellow-500" size={24} />;
            default:
                return <MessageSquareMore className="text-gray-500" size={24} />;
        }
    };

    return (
        <div className="bg-[#f8f8f8] p-4 rounded-lg flex border justify-between items-center gap-5">
            <div className='flex flex-row items-start'>
                <div className='flex flex-col items-start gap-4'>
                    <Image height={100} width={100} src="https://static.vecteezy.com/system/resources/previews/019/896/008/large_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" alt="Customer profile picture" className="w-12 h-12 rounded-full mr-4" />
                </div>
                <div>
                    <p className="font-semibold">{ticket.fullName}</p>
                    <p className="text-gray-500 w-[15rem] overflow-hidden text-ellipsis whitespace-nowrap" title={ticket.description}>
                        {truncateText(ticket.description, 50)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Render the status icon dynamically based on query status */}
                {renderStatusIcon(ticket.status)}

                {/* Query Modal for viewing more details */}
                <QuerryModal ticket={ticket} onClick={onClick} selectedQuery={selectedQuery} onRefreshQueries={onRefreshQueries} />

                {/* Chevron for more actions */}
                <ChevronRight className="text-gray-500" size={24} />
            </div>
        </div>
    );
}

export default QueryCard;
