import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchUserNews, fetchCurrentUser } from '../api/userApi';
import { resetProfile } from '../store/userSlice';
import ProfileHeader from '../components/ProfileHeader';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';

const Profile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { data: user, news, status, error } = useSelector((state) => state.user.profile);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (!currentUser) {
            dispatch(fetchCurrentUser());
        }
        if (userId) {
            dispatch(fetchUserProfile({ userId }));
            dispatch(fetchUserNews({ userId }));
        }

        return () => {
            dispatch(resetProfile());
        };  
    }, [userId, dispatch, currentUser]);

    if (status === 'loading' || !user) {
        return <Loader isLoading={true} />;
    }

    if (status === 'failed') {
        return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;
    }

    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen py-8 px-4 transition-colors">
            <ProfileHeader user={user} />
            
            <div className="mt-8">
                <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
                    Bài viết của {user.name}
                </h2>
                {news.length > 0 ? (
                    <div className="flex flex-col items-center gap-4">
                        {news.map((item) => (
                            <NewsCard
                                key={item.id}
                                {...item}
                                author={{
                                    id: user.id,
                                    name: user.name,
                                    avatar: user.avatar,
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">Người dùng này chưa có bài viết nào.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;