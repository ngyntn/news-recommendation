import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedNews } from "../api/api";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import ScrollToTopButton from "../components/ScrollToTopButton";

function Home() {
    const dispatch = useDispatch();
    const { items, loading, error, page, hasMore } = useSelector(state => state.news);

    // Sử dụng useRef để tránh re-render không cần thiết
    const observer = useRef();
    const lastNewsElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // Khi phần tử cuối cùng hiển thị trên màn hình và còn dữ liệu, tải thêm
                dispatch(fetchRecommendedNews({ page }));
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, page, dispatch]);


    useEffect(() => {
        // Chỉ fetch dữ liệu lần đầu nếu items rỗng
        if (items.length === 0) {
            dispatch(fetchRecommendedNews({ page: 1, limit: 10 })); // Gửi page và limit
        }
    }, [dispatch, items.length]);

    return (
        // <div className="bg-white min-h-screen">
        //     <div className="max-w-4xl mx-auto py-8 px-4">
        //         <div className="grid grid-cols-1 gap-8">
        //             {items.map((newsItem, index) => {
        //                 // Gán ref cho phần tử cuối cùng trong danh sách
        //                 if (items.length === index + 1) {
        //                     return (
        //                         <div ref={lastNewsElementRef} key={newsItem.newsId}>
        //                             <NewsCard {...newsItem} />
        //                         </div>
        //                     );
        //                 } else {
        //                     return <NewsCard key={newsItem.newsId} {...newsItem} />;
        //                 }
        //             })}
        //         </div>
        //         {loading && <Loader isLoading={loading} />}
        //         {!hasMore && <p className="text-center text-gray-500 mt-8">Đã hết tin để xem.</p>}
        //         {error && <p className="text-center text-red-500 mt-8">Đã có lỗi xảy ra: {error}</p>}
        //     </div>
        // </div>
        <div className="min-h-screen flex flex-col items-center py-3">
            {<div className="min-h-screen flex flex-col items-center py-20">
                {items.map((newsItem, index) => {
                        // Gán ref cho phần tử cuối cùng trong danh sách
                        if (items.length === index + 1) {
                            return (
                                <div ref={lastNewsElementRef} key={newsItem.newsId}>
                                    <NewsCard {...newsItem} />
                                </div>
                            );
                        } else {
                            return <NewsCard key={newsItem.newsId} {...newsItem} />;
                        }
                    })}
            </div>}
            {loading && <Loader isLoading={loading} />}
            {!hasMore && <p className="text-center text-gray-500 mt-8">Đã hết tin để xem.</p>}
             {error && <p className="text-center text-red-500 mt-8">Đã có lỗi xảy ra: {error}</p>}
            <ScrollToTopButton />
        </div>
    );
}

export default Home;