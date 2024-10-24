


import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Analysis from './Analysis';
import QueryCard from './QueryCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Query {
    _id: string;
    name: string;
    email: string;
    answers: any;
    question: string;
    createdAt: any;
    status: 'answered' | 'unanswered';
}

const Querry = () => {
    const [queries, setQueries] = useState<Query[]>([]);
    const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await fetch('/api/querry/get');
                const data = await response.json();
                setQueries(data.queries);
                if (data.queries.length > 0) {
                    const latestQuery = data.queries.reduce((prev: Query, current: Query) =>
                        (new Date(prev.createdAt) > new Date(current.createdAt)) ? prev : current
                    );
                    setSelectedQuery(latestQuery);
                }
            } catch (error) {
                console.error('Error fetching queries:', error);
            }
        };

        fetchQueries();
    }, []);

    const analysisData = useMemo(() => {
        const answered = queries.filter(q => q.status === 'answered').length;
        const unanswered = queries.filter(q => q.status === 'unanswered').length;
        return {
            answeredCount: answered,
            unansweredCount: unanswered,
            total: answered + unanswered
        };
    }, [queries]);

    const handleQueryClick = (query: Query) => {
        setSelectedQuery(query);
    };

    const handleRefreshQueries = async () => {
        try {
            const response = await fetch('/api/querry/get');
            const data = await response.json();
            setQueries(data.queries);
        } catch (error) {
            console.error('Error fetching queries:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen overflow-y-scroll">
            <h1 className="text-3xl font-bold mb-6">Queries</h1>
            <Analysis data={analysisData} />

            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
                <h2 className="text-xl font-semibold mb-4 sm:mb-0">Customer Queries</h2>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'>
                    <div className="w-full sm:w-auto mb-2 sm:mb-0">
                        <input
                            type="text"
                            placeholder="Search for a related question..."
                            className="w-full p-2 border border-yellow-500 rounded-lg outline-none"
                        />
                    </div>
                    <div className="w-full sm:w-auto">
                        <button className="w-full p-2 bg-yellow-500 text-white rounded-lg flex items-center justify-center">
                            All queries <ChevronDown className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:pr-4 mb-6 lg:mb-0">
                    {queries.length === 0 ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <Skeleton key={index} className="bg-gray-200 rounded-lg p-4 h-40 w-full animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {queries.map((query) => (
                                <QueryCard
                                    onRefreshQueries={handleRefreshQueries}
                                    selectedQuery={selectedQuery}
                                    key={query._id}
                                    query={query}
                                    onClick={() => handleQueryClick(query)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {/* <div className="w-full lg:w-[60%] lg:pl-4">
                    <AnswerChat
                        selectedQuery={selectedQuery}
                        onRefreshQueries={handleRefreshQueries}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default Querry;
