import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import rehypeRaw from "rehype-raw";
import { Heart, Bookmark, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { convertDateTimeToVietnam, convertLikeNumber } from "../utils/convert";

const NewsCard = ({
  id,
  title,
  author,
  createdAt,
  content,
  likeCount: initialLikeCount,
  commentsCount,
  tags = [],
  thumbnailUrl,
  slug,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userReaction, setUserReaction] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
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

  const handleBookmark = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra toàn bộ card
    setIsBookmarked(!isBookmarked);
  };

  const handleOnClickTitle = () => {
    navigate(`/news/${slug}`);
  };

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-6 sm:px-10 py-6 m-4 rounded-xl shadow-sm max-w-5xl w-full mx-auto transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h2
            className="text-xl font-bold mb-1 hover:cursor-pointer hover:underline text-gray-900 dark:text-gray-100"
            onClick={handleOnClickTitle}
          >
            {title}
          </h2>

          <div className="flex items-center mb-4">
            {author ? (
              <Link
                to={`/profile/${author.id}`}
                className="flex items-center group"
              >
                <img
                  src={author.avatarUrl}
                  alt={author.fullName}
                  className="w-6 h-6 rounded-full mr-2 object-cover"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:underline">
                  {author.fullName}
                </span>
              </Link>
            ) : (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tác giả ẩn danh
              </span>
            )}
            <span className="text-sm text-gray-500 mx-2">•</span>
            <span className="text-sm text-gray-500">
              {convertDateTimeToVietnam(createdAt)}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center space-x-4 px-2 ml-4">
          {/* Nút Like */}
          <div className="flex items-center space-x-1" title="Lượt thích">
            <button
              onClick={handleLike}
              className={`text-sm font-medium ${
                userReaction === "like"
                  ? "text-red-500"
                  : "text-gray-600 dark:text-gray-400"
              } hover:text-red-500 transition-colors`}
            >
              <Heart
                className="w-5 h-5"
                fill={userReaction === "like" ? "currentColor" : "none"}
              />
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {convertLikeNumber(likeCount)}
            </p>
          </div>

          {/* Comment */}
          <div
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400"
            title="Lượt bình luận"
          >
            <MessageSquare className="w-5 h-5" />
            <p className="text-sm">{convertLikeNumber(commentsCount || 0)}</p>
          </div>
          {/* ============================ */}

          {/* Nút Bookmark */}
          <button
            onClick={handleBookmark}
            className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors"
            title={isBookmarked ? "Bỏ lưu" : "Lưu bài viết"}
          >
            <Bookmark
              className="w-5 h-5"
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      <div
        ref={contentRef}
        className={`relative transition-all duration-300 prose prose-sm max-w-none leading-relaxed text-gray-700 dark:text-gray-300 [&>p]:mb-4 ${
          isExpanded ? "max-h-none" : "max-h-60 overflow-hidden"
        }`}
      >
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {sanitizedContent}
        </ReactMarkdown>

        {!isExpanded && isOverflowing && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
        )}
      </div>

      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {isExpanded ? "Thu gọn" : "Đọc thêm"}
        </button>
      )}

      <img src={thumbnailUrl} alt="thumbnail" />

      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id || tag.name}
              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsCard;
