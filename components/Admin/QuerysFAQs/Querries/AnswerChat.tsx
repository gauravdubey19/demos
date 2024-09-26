

// import React, { useState } from 'react';
// import { toast } from "@/hooks/use-toast";

// interface AnswerChatProps {
//     selectedQuery: any;
// }

// const AnswerChat = ({ selectedQuery }: AnswerChatProps) => {
//     const [answer, setAnswer] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleReply = async () => {
//         if (!answer) return;

//         setLoading(true);

//         try {
//             const response = await fetch('/api/querry/put', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     name: selectedQuery.name,
//                     email: selectedQuery.email,
//                     answer,
//                     queryId: selectedQuery._id,
//                 }),
//             });

//             const data = await response.json();

//             if (data.status === 200) {
//                 setAnswer('');
//                 setLoading(false);
//                 // alert('Reply sent successfully!');
//                 toast({
//                     title: "Mail Sent",
//                     description: "Reply sent successfully!",
//                     variant: "default",
//                 });
//             } else {
//                 setError(data.error);
//                 setLoading(false);
//             }
//         } catch (error:any) {
//             setError(error.message);
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center mb-4">
//                 <img src="https://placehold.co/50x50" alt="Customer profile picture" className="w-12 h-12 rounded-full mr-4" />
//                 <div>
//                     <p className="font-semibold">{selectedQuery?.name}</p>
//                     <p className="text-gray-500">{selectedQuery?.email}</p>
//                 </div>
//             </div>
//             <h2 className="text-xl font-semibold mb-4">Q. {selectedQuery?.question}</h2>
//             <textarea
//                 className="w-full p-4 border border-gray-300 rounded-lg mb-4"
//                 rows={6}
//                 placeholder="Enter Reply ..."
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//             ></textarea>
//             <button
//                 className="w-full p-2 bg-yellow-500 text-white rounded-lg"
//                 onClick={handleReply}
//                 disabled={loading}
//             >
//                 {loading ? 'Sending...' : 'Post Reply'}
//             </button>
//             {error && <p className="text-red-500">{error}</p>}
//         </div>
//     );
// };

// export default AnswerChat;



// AnswerChat.js
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";

interface AnswerChatProps {
    selectedQuery: any;
    onRefreshQueries: () => void;
}

const AnswerChat = ({ selectedQuery, onRefreshQueries }: AnswerChatProps) => {
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

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <img src="https://static.vecteezy.com/system/resources/previews/019/896/008/large_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"  alt="Customer profile picture" className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <p className="font-semibold">{selectedQuery?.name}</p>
                    <p className="text-gray-500">{selectedQuery?.email}</p>
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">Q. {selectedQuery?.question}</h2>
            <textarea
                className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                rows={6}
                placeholder="Enter Reply ..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            <button
                className="w-full p-2 bg-yellow-500 text-white rounded-lg"
                onClick={handleReply}
                disabled={loading}
            >
                {loading ? 'Sending...' : 'Post Reply'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default AnswerChat;