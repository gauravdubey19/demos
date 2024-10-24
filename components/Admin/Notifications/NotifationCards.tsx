import { Button } from '@/components/ui/button';
import React from 'react';

interface NotificationCardProps {
    title: string;
    message: string;
    dateTime: string; // Assuming you have a dateTime field
    read: boolean;
    onMarkAsRead?: () => void; // Function to call when marking as read
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, message, dateTime, read, onMarkAsRead }) => {
    // Function to format dateTime
    const formatDateTime = (dateTime: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // Use 12-hour format
        };
        return new Date(dateTime).toLocaleString('en-US', options);
    };

    return (
        <div className="w-full mb-4">
            <div className={`shadow-md rounded-lg p-6 flex items-start bg-gray-100`}>
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">{title}</h2>
                        <p className="text-gray-600">{formatDateTime(dateTime)}</p> {/* Format the dateTime here */}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-600">{message}</p>
                        {!read && (
                            <Button onClick={onMarkAsRead} className='hover:opacity-70'>Mark as read</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
