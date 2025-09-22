import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { news } from "./Home";
import { ArrowLeft, AlertCircle, Heart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import rehypeRaw from "rehype-raw";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailNews } from "../api/api";
import { convertDateTimeToVietnam } from "../utils/convert";
import { resetNewsDetail } from "../store/NewsSlice";
import Loader from "../components/Loader";

function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Giả sử chưa có dữ liệu
    // const newsDetail = null;
    // const newsDetail = news.find(item => item.newsId === id);
    const { item, itemLoading, itemError } = useSelector(state => state.news);

    useEffect(() => {
        if (id) {
            dispatch(fetchDetailNews({ id }));
        }

        // cleanup redux item
        return () => {
            dispatch(resetNewsDetail());
        }
    }, [id]);

    const sanitizedContent = item ? DOMPurify.sanitize(item.content) : null;

    return (
        <div className="min-h-screen px-4 font-geist">
            <div className="w-full max-w-2xl text-center pt-8 px-4 sm:px-6 lg:px-8">
                {/* Nút quay lại */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-1 mb-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                >
                    <ArrowLeft size={18} />
                    Quay lại
                </button>
            </div>

            {
                itemLoading && <Loader isLoading={itemLoading}></Loader>
            }

            {/* Trường hợp không có dữ liệu */}
            {!item && !itemLoading && (
                <div className="bg-white p-8">
                    <div className="flex flex-col items-center text-gray-600">
                        <h2 className="text-xl font-semibold mb-2">
                            Bài viết không tồn tại
                        </h2>
                        <p className="text-gray-500">
                            Có thể bài viết đã bị xoá hoặc đường dẫn không đúng.
                        </p>
                    </div>
                </div>
            )}
            {/* Trường hợp có dữ liệu */}
            {item && (
                <div className="flex justify-center">
                <div className="px-4 sm:px-6 lg:px-8 max-w-4xl w-full">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 hover:cursor-pointer hover:underline font-geist"
                            >{item.title}</h2>
                            <p className="text-sm sm:text-md text-gray-500 mb-4 mt-4">
                                {item.owner} • {convertDateTimeToVietnam(item.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className="text-base sm:text-lg mt-2 mb-20 sm:mb-[200px] lg:mb-[400px] font-geist text-gray-800 leading-relaxed [&>p]:mb-4">
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                        >
                            {sanitizedContent}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default NewsDetail;
