import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { news } from "./Home";
import { ArrowLeft, AlertCircle, Heart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import rehypeRaw from "rehype-raw";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailNews, fetchComments, fetchRelatedArticles } from "../api/api";
import LikeInteraction from "../components/LikeInteraction";
import CommentSection from "../components/CommentSection";
import RelatedArticles from "../components/RelatedArticles";
import { convertDateTimeToVietnam } from "../utils/convert";
import { resetNewsDetail } from "../store/newsSlice";
import Loader from "../components/Loader";

function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { item, itemLoading } = useSelector(state => state.news);

    useEffect(() => {
        if (id) {
            dispatch(fetchDetailNews({ id }))
                .unwrap()
                .then((article) => {
                    if (article) {
                        dispatch(fetchComments({ articleId: article.id }));
                        dispatch(fetchRelatedArticles({ authorId: article.author?.id, currentArticleId: article.id }));
                    }
                });
        }
        return () => { dispatch(resetNewsDetail()); }
    }, [id, dispatch]);

    const sanitizedContent = item ? DOMPurify.sanitize(item.content) : null;

    return (
        <div className="min-h-screen px-4 bg-white dark:bg-black font-geist transition-colors">
            <div className="w-full max-w-2xl text-center pt-8 px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-1 mb-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                >
                    <ArrowLeft size={18} />
                    Quay lại
                </button>
            </div>

            { itemLoading && <Loader isLoading={itemLoading}></Loader> }

            {!item && !itemLoading && (
                <div className="bg-white dark:bg-black p-8">
                    <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                        <h2 className="text-xl font-semibold mb-2">
                            Bài viết không tồn tại
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Có thể bài viết đã bị xoá hoặc đường dẫn không đúng.
                        </p>
                    </div>
                </div>
            )}
            
            {item && (
                <div className="flex justify-center">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2
                                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 hover:cursor-pointer hover:underline text-gray-900 dark:text-gray-100"
                                >{item.title}</h2>
                                <p className="text-sm sm:text-md text-gray-500 dark:text-gray-400 mb-4 mt-4">
                                    {item.author?.name || 'Tác giả ẩn danh'} • {convertDateTimeToVietnam(item.publishedAt)}
                                </p>
                            </div>
                        </div>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-300 leading-relaxed [&>p]:mb-4 mt-2 mb-20 sm:mb-[200px] lg:mb-[400px]">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {sanitizedContent}
                            </ReactMarkdown>
                        </div>
                        <LikeInteraction article={item} />
                        <CommentSection articleId={item.id} />
                        <RelatedArticles />
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewsDetail;
