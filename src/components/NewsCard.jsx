import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import rehypeRaw from "rehype-raw";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { convertDateTimeToVietnam, convertLikeNumber } from "../utils/convert";

const NewsCard = ({ newsId, title, owner, createdAt, content, likeCount: initialLikeCount }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
    const [userReaction, setUserReaction] = useState(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (contentRef.current) {
            setIsOverflowing(
                contentRef.current.scrollHeight > contentRef.current.clientHeight
            );
        }
    }, [content]);

    const handleLike = () => {
        if (userReaction === "like") {
            setLikeCount(likeCount - 1);
            setUserReaction(null);
        } else {
            setLikeCount(likeCount + 1);
            setUserReaction("like");
        }
    };

    const handleOnClickTitle = (id) => {
        navigate(`/news/${id}`);
    };

    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        // THAY ĐỔI Ở ĐÂY: Thêm `mx-auto` để căn giữa thẻ
        <div className="bg-white border px-6 sm:px-10 py-6 m-4 rounded-xl shadow-sm max-w-5xl w-full font-geist mx-auto">
            <div className="flex justify-between items-start">
                <div>
                    <h2
                        className="text-xl font-bold mb-1 hover:cursor-pointer hover:underline"
                        onClick={() => handleOnClickTitle(newsId)}
                    >
                        {title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        {owner} • {convertDateTimeToVietnam(createdAt)}
                    </p>
                </div>
                <div className="flex items-center space-x-2 px-2">
                    <button
                        onClick={handleLike}
                        className={`text-sm font-medium ${userReaction === "like" ? "text-red-600" : "text-gray-600"} hover:text-red-600 transition-colors`}
                        title="Like"
                    >
                        <Heart
                            className="w-5 h-5"
                            fill={userReaction === "like" ? "currentColor" : "none"}
                        />
                    </button>
                    <p className="text-sm text-gray-600">{convertLikeNumber(likeCount)}</p>
                </div>
            </div>

            <div
                ref={contentRef}
                className={`relative transition-all duration-300 prose prose-sm max-w-none leading-relaxed [&>p]:mb-4 ${isExpanded ? "max-h-none" : "max-h-60 overflow-hidden"}`}
            >
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {sanitizedContent}
                </ReactMarkdown>

                {!isExpanded && isOverflowing && (
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
            </div>

            {isOverflowing && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 text-sm font-semibold text-indigo-800 hover:underline"
                >
                    {isExpanded ? "Thu gọn" : "Đọc thêm"}
                </button>
            )}
        </div>
    );
};

export default NewsCard;