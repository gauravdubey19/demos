import { useEffect, useState } from 'react';
import NotificationCard from './NotifationCards';

const NotificationSection = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('/api/notifications/get'); // Update with your actual API route
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data = await response.json();
                setNotifications(data); // Assuming the response is an array of notifications
                setLoading(false);
            } catch (err: any) {
                console.error(err);
                setError('Error fetching notifications');
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Function to mark notification as read
    const markAsRead = async (notificationId: string) => {
        try {
            const response = await fetch(`/api/notifications/put`, {
                method: 'PATCH', // Use the appropriate HTTP method for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notificationId }), // Sending the read status
            });

            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }

            // Update the notifications state to reflect the change
            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification._id === notificationId ? { ...notification, read: true } : notification
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    if (loading) {
        return <div className="text-center py-6">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-6 text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen overflow-y-scroll">
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            <div>
                {notifications.length === 0 ? (
                    <div className="text-center">No notifications available</div>
                ) : (
                    notifications.map((notification) => (
                        <NotificationCard
                            key={notification._id} // Use unique identifier like _id from the notification object
                            title={notification.title}
                            dateTime={notification.createdAt} // Use the appropriate date field
                            message={notification.message}
                            read={notification.read}
                            onMarkAsRead={() => markAsRead(notification._id)} // Pass the function to mark as read
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationSection;
