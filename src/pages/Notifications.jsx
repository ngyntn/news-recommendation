import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { fetchNotifications } from '../api/notificationApi';
import { resetNotifications } from '../store/notificationSlice';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import NotificationItem from '../components/NotificationItem'; 
import Loader from '../components/Loader';

const notificationStateSelector = (state) => ({
    items: state.notifications.items,
    loading: state.notifications.loading,
    error: state.notifications.error,
    page: state.notifications.page,
    hasMore: state.notifications.hasMore,
});

const Notifications = () => {
    const listState = useSelector(notificationStateSelector, shallowEqual);

    const { items, loading, error, hasMore, lastElementRef } = useInfiniteScroll({
        listState,
        fetchThunk: fetchNotifications,
        resetAction: resetNotifications,
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center py-12 px-4 transition-colors">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Thông báo</h1>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    {items.length > 0 && (
                        items.map((notification, index) => {
                            if (items.length === index + 1) {
                                return (
                                    <div ref={lastElementRef} key={notification.id}>
                                        <NotificationItem notification={notification} />
                                    </div>
                                );
                            }
                            return (
                                <NotificationItem key={notification.id} notification={notification} />
                            );
                        })
                    )}

                    {/* Trạng thái Loading */}
                    {loading && (
                        <div className="p-4 text-center">
                            <Loader isLoading={true} />
                        </div>
                    )}
                    
                    {/* Trạng thái Lỗi */}
                    {error && items.length === 0 && (
                        <p className="p-4 text-center text-red-500">Lỗi: {error}</p>
                    )}
                    
                    {/* Trạng thái Rỗng */}
                    {!loading && items.length === 0 && !error && (
                         <p className="p-4 text-center text-gray-500">Bạn không có thông báo nào.</p>
                    )}
                    
                    {/* Trạng thái Hết dữ liệu */}
                    {!hasMore && items.length > 0 && (
                        <p className="p-4 text-center text-gray-500">Đã tải tất cả thông báo.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;