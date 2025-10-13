// src/components/NotificationBell.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, UserPlus, MessageSquare, Heart } from 'lucide-react';

const mockNotifications = [
    { id: 1, type: 'new_follower', user: { name: 'Charlie' }, read: false, time: '5 phút trước' },
    { id: 2, type: 'new_comment', user: { name: 'David' }, post: { title: 'Hướng dẫn toàn tập về React Hooks' }, read: false, time: '1 giờ trước' },
    { id: 3, type: 'new_like', user: { name: 'Alice' }, post: { title: '10 Mẹo CSS không thể bỏ qua' }, read: true, time: '3 giờ trước' },
];

const NotificationItem = ({ notification }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'new_follower': return <UserPlus className="text-blue-500" size={20} />;
            case 'new_comment': return <MessageSquare className="text-green-500" size={20} />;
            case 'new_like': return <Heart className="text-red-500" size={20} />;
            default: return <Bell size={20} />;
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
        <Link to="/notifications" className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">{getIcon(notification.type)}</div>
                <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{getText(notification)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                </div>
                {!notification.read && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full mt-1"></div>}
            </div>
        </Link>
    );
};

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Thông báo"
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs items-center justify-center">{unreadCount}</span>
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    <div className="p-3 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white">Thông báo</h3>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto">
                        {mockNotifications.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                    <Link to="/notifications" className="block text-center py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Xem tất cả thông báo
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;