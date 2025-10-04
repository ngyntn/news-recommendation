import { useParams } from "react-router-dom";
// import { news } from "./Home";
import SearchResultItem from "../components/SearchResultItem"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsByKeySearch } from "../api/api";
import { resetSearchResult } from "../store/newsSlice";
import Loader from "../components/Loader";

const SearchResult = () => {
    const { query } = useParams();
    const dispatch = useDispatch();
    const { searchedItems, searchedAuthors, searchedLoading, searchedError } = useSelector(state => state.news);

    useEffect(() => {
        dispatch(fetchNewsByKeySearch({ keySearch: query, page: 1, limit: 10}));
        return () => {
            // Cleanup if necessary
            dispatch(resetSearchResult());
        }
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center pt-24 pb-12 transition-colors">
            <div className="w-full max-w-4xl px-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                    Kết quả tìm kiếm cho: "{query}"
                </h1>
                {searchedItems.length > 0 && !searchedLoading && (
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                        {searchedItems.map((item) => {
                            const author = searchedAuthors[item.userId];
                            return <SearchResultItem key={item.id} item={item} author={author} />;
                        })}
                    </div>
                )}
                {searchedLoading && (
                    <Loader isLoading={searchedLoading} />
                )}
                { searchedError &&
                    <div className="text-center py-16">
                        <p className="text-gray-600">Không tìm thấy bài viết nào phù hợp.</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchResult;