// src/pages/Notifications.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, MessageSquare, Heart, Bell } from 'lucide-react';

const mockAllNotifications = [
    { id: 1, type: 'new_follower', user: { name: 'Charlie' }, read: false, time: '5 phút trước' },
    { id: 2, type: 'new_comment', user: { name: 'David' }, post: { title: 'Hướng dẫn toàn tập về React Hooks' }, read: false, time: '1 giờ trước' },
    { id: 3, type: 'new_like', user: { name: 'Alice' }, post: { title: '10 Mẹo CSS không thể bỏ qua' }, read: true, time: '3 giờ trước' },
    { id: 4, type: 'new_follower', user: { name: 'Frank' }, read: true, time: '1 ngày trước' },
    { id: 5, type: 'new_like', user: { name: 'Grace' }, post: { title: 'Giới thiệu về AI tạo sinh' }, read: true, time: '2 ngày trước' },
];

const NotificationPageItem = ({ notification }) => {
    // Các hàm getIcon và getText có thể copy từ NotificationBell.jsx
    const getIcon = (type) => {
        switch (type) {
            case 'new_follower': return <UserPlus className="text-blue-500" size={24} />;
            case 'new_comment': return <MessageSquare className="text-green-500" size={24} />;
            case 'new_like': return <Heart className="text-red-500" size={24} />;
            default: return <Bell size={24} />;
        }
    };

    const getText = (notification) => {
         switch (notification.type) {
            case 'new_follower': return <><b>{notification.user.name}</b> đã bắt đầu theo dõi bạn.</>;
            case 'new_comment': return <><b>{notification.user.name}</b> đã bình luận về bài viết "<i>{notification.post.title}</i>".</>;
            case 'new_like': return <><b>{notification.user.name}</b> đã thích bài viết "<i>{notification.post.title}</i>".</>;
            default: return "Bạn có thông báo mới.";
        }
    };

    return (
        <div className={`flex items-start gap-4 p-4 border-b dark:border-gray-700 ${!notification.read ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
            <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
            <div className="flex-1">
                <p className="text-gray-800 dark:text-gray-200">{getText(notification)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
            </div>
             {!notification.read && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full mt-2"></div>}
        </div>
    );
};

const Notifications = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center py-12 px-4 transition-colors">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Thông báo</h1>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    {mockAllNotifications.map(notification => (
                        <NotificationPageItem key={notification.id} notification={notification} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;