// // src/pages/Feed.jsx

// import React, { useEffect, useRef, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFeedNews, fetchCurrentUser } from '../api/userApi';
// import { resetFeed } from '../store/userSlice';
// import NewsCard from '../components/NewsCard';
// import Loader from '../components/Loader';
// import { Link } from 'react-router-dom';
// import ScrollToTopButton from '../components/ScrollToTopButton';

// const Feed = () => {
//     const dispatch = useDispatch();
//     const { news, authors, status, error, page, hasMore } = useSelector((state) => state.user.feed);
//     const { currentUser } = useSelector((state) => state.user);
//     const isLoading = status === 'loading';

//     const observer = useRef();
//     const lastNewsElementRef = useCallback(node => {
//         if (isLoading) return;
//         if (observer.current) observer.current.disconnect();
//         observer.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting && hasMore) {
//                 if (currentUser) {
//                     dispatch(fetchFeedNews({ page, limit: 10 }));
//                 }
//             }
//         });
//         if (node) observer.current.observe(node);
//     }, [isLoading, hasMore, page, dispatch, currentUser]);

//     useEffect(() => {
//         const loadInitialFeed = () => {
//             if (currentUser && news.length === 0) {
//                 dispatch(fetchFeedNews({ page: 1, limit: 10 }));
//             }
//         };

//         if (!currentUser) {
//             dispatch(fetchCurrentUser()).then(loadInitialFeed);
//         } else {
//             loadInitialFeed();
//         }

//         return () => {
//             dispatch(resetFeed());
//         }
//     }, [dispatch, currentUser]);
    
//     if (isLoading && news.length === 0) {
//         return <Loader isLoading={true} />;
//     }

//     if (status === 'failed' && news.length === 0) {
//         return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center py-8 transition-colors">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Bảng tin của bạn</h1>
//             {news.length > 0 ? (
//                  <div className="flex flex-col items-center gap-4">
//                     {news.map((item, index) => {
//                         const author = authors[item.userId];
//                         if (news.length === index + 1) {
//                              return (
//                                 <div ref={lastNewsElementRef} key={item.id}>
//                                     <NewsCard {...item} likeCount={item.likeCount} author={author} />
//                                 </div>
//                             );
//                         }
//                         return <NewsCard key={item.id} {...item} likeCount={item.likeCount} author={author} />;
//                     })}
//                  </div>
//             ) : (
//                 !isLoading && (
//                     <div className="text-center text-gray-500 dark:text-gray-400">
//                         <p>Bảng tin của bạn đang trống.</p>
//                         <p>Hãy theo dõi một vài tác giả để xem bài viết của họ ở đây!</p>
//                         <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline mt-2 inline-block">
//                             Khám phá các bài viết
//                         </Link>
//                     </div>
//                 )
//             )}
//             {isLoading && news.length > 0 && <div className="py-8"><Loader isLoading={true} /></div>}
//             {!hasMore && news.length > 0 && <p className="text-center text-gray-500 dark:text-gray-400 mt-8">Đã hết bài viết để xem.</p>}
//             <ScrollToTopButton />
//         </div>
//     );
// };

// export default Feed;

// Chwa có backend nên tạm thời phân trang ở client
// Khi có backend sẽ sửa lại

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFeed } from '../store/userSlice';
import { fetchFeedNews, fetchCurrentUser } from '../api/userApi';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import ScrollToTopButton from '../components/ScrollToTopButton';

const ITEMS_PER_PAGE = 10;

const Feed = () => {
    const dispatch = useDispatch();
    const { news: allNews, authors, status, error } = useSelector((state) => state.user.feed);
    const { currentUser } = useSelector((state) => state.user);

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const newsToDisplay = allNews.slice(0, visibleCount);
    const hasMore = visibleCount < allNews.length;
    const isLoading = status === 'loading';

    const observer = useRef();
    const lastNewsElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchFeedNews());
        } else {
            dispatch(fetchCurrentUser());
        }

        return () => {
            dispatch(resetFeed());
        }
    }, [dispatch, currentUser]);
    
    if (isLoading && allNews.length === 0) {
        return <Loader isLoading={true} />;
    }

    if (status === 'failed' && allNews.length === 0) {
        return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center py-8 transition-colors">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Bảng tin của bạn</h1>
            {newsToDisplay.length > 0 ? (
                 <div className="flex flex-col items-center gap-4">
                    {newsToDisplay.map((item, index) => {
                        const author = authors[item.userId];
                        if (newsToDisplay.length === index + 1) {
                             return (
                                <div ref={lastNewsElementRef} key={item.id}>
                                    <NewsCard {...item} author={author} />
                                </div>
                            );
                        }
                        return <NewsCard key={item.id} {...item} author={author} />;
                    })}
                 </div>
            ) : (
                !isLoading && (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <p>Bảng tin của bạn đang trống.</p>
                        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline mt-2 inline-block">
                            Khám phá các bài viết
                        </Link>
                    </div>
                )
            )}
            {!hasMore && allNews.length > 0 && <p className="text-center text-gray-500 dark:text-gray-400 mt-8">Đã hết bài viết để xem.</p>}
            <ScrollToTopButton />
        </div>
    );
};

export default Feed;