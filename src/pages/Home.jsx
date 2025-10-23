import React from "react";
import { useSelector, shallowEqual } from "react-redux"; 
import { fetchRecommendedNews } from "../api/articleApi";
import { resetHomeNews } from "../store/newsSlice"; 
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"; 
import ArticleList from "../components/ArticleList"; 

const homeStateSelector = (state) => ({
    items: state.news.items,
    loading: state.news.loading,
    error: state.news.error,
    page: state.news.page,
    hasMore: state.news.hasMore,
});

function Home() {
    const listState = useSelector(homeStateSelector, shallowEqual);

    const { items, loading, error, hasMore, lastElementRef } = useInfiniteScroll({
        listState,
        fetchThunk: fetchRecommendedNews,
        resetAction: resetHomeNews
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center py-8 transition-colors">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Trang chủ</h1>
            <ArticleList
                items={items}
                loading={loading}
                error={error}
                hasMore={hasMore}
                lastElementRef={lastElementRef}
            />
        </div>
    );
}

export default Home;