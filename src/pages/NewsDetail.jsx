import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { news } from "./Home";
import { ArrowLeft, AlertCircle, Heart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import rehypeRaw from "rehype-raw";

function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Giả sử chưa có dữ liệu
    // const newsDetail = null;
    const newsDetail = news.find(item => item.newsId === id);

    const sanitizedContent = newsDetail ? DOMPurify.sanitize(newsDetail.content) : null;

    return (
        <div className="min-h-screen px-4 font-geist">
            <div className="w-full max-w-2xl text-center pt-8 px-20">
                {/* Nút quay lại */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-1 mb-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                >
                    <ArrowLeft size={18} />
                    Quay lại
                </button>
            </div>
            {/* Trường hợp không có dữ liệu */}
            {!newsDetail && (
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
            {newsDetail && (
                <div className="min-w-[100vh] flex justify-center">
                    <div className="px-8 max-w-4xl w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2
                                    className="text-4xl font-bold mb-1 hover:cursor-pointer hover:underline font-geist"
                                >{newsDetail.title}</h2>
                                <p className="text-md text-gray-500 mb-4 mt-4">
                                    {newsDetail.createdBy} • {newsDetail.date}
                                </p>
                            </div>
                        </div>
                        <div className="text-[17px] mt-2 mb-[400px] font-geist text-gray-800 leading-relaxed [&>p]:mb-4">
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
