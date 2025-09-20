import { useParams } from "react-router-dom";
import { news } from "./Home";
import SearchResultItem from "../components/SearchResultItem"; 

const SearchResult = () => {
    const { query } = useParams();

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 pb-12">
            <div className="w-full max-w-4xl px-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">
                    Kết quả tìm kiếm cho: "{query}"
                </h1>
                {filteredNews.length > 0 ? (
                    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                        {filteredNews.map((item) => (
                            <SearchResultItem key={item.newsId} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-600">Không tìm thấy bài viết nào phù hợp.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;