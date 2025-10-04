// src/pages/Home.jsx

import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// Sửa lại đường dẫn import cho đúng
import { fetchRecommendedNews } from "../api/api"; 
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import ScrollToTopButton from "../components/ScrollToTopButton";

function Home() {
    const dispatch = useDispatch();
    // Lấy thêm `authors` từ state
    const { items, authors, loading, error, page, hasMore } = useSelector(state => state.news);

    const observer = useRef();
    const lastNewsElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // Sửa lại tham số cho đúng với thunk mới
                dispatch(fetchRecommendedNews({ page, limit: 10 }));
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, page, dispatch]);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchRecommendedNews({ page: 1, limit: 10 }));
        }
    }, [dispatch, items.length]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center py-3 transition-colors">
            <div className="min-h-screen flex flex-col items-center py-20">
                {items.map((newsItem, index) => {
                    const author = authors[newsItem.userId];
                    if (items.length === index + 1) {
                        return (
                            <div ref={lastNewsElementRef} key={newsItem.id}>
                                <NewsCard {...newsItem} author={author} />
                            </div>
                        );
                    } else {
                        console.log("Rendering news item:", newsItem);
                        return <NewsCard key={newsItem.id} {...newsItem} author={author} />;
                    }
                })}
            </div>
            {loading && <Loader isLoading={loading} />}
            {!hasMore && <p className="text-center text-gray-500 dark:text-gray-400 mt-8">Đã hết tin để xem.</p>}
            {error && <p className="text-center text-red-500 mt-8">Đã có lỗi xảy ra: {error}</p>}
            <ScrollToTopButton />
        </div>
    );
}

export default Home;