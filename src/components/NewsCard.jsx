import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { Heart, Bookmark, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { convertDateTimeToVietnam, convertLikeNumber } from "../utils/convert";
import { useDispatch, useSelector } from "react-redux";
import { updateArticleLike, toggleBookmark } from "../api/articleApi";
import { toast } from "react-hot-toast";

const NewsCard = ({
  id,
  title,
  author,
  createdAt,
  content,
  likesCount, 
  commentsCount,
  isLiked, 
  isBookmarked, 
  tags = [],
  thumbnailUrl,
  slug,
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [currentLikeCount, setCurrentLikeCount] = useState(likesCount || 0);
  const [currentUserReaction, setCurrentUserReaction] = useState(isLiked);
  const [currentIsBookmarked, setCurrentIsBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setCurrentLikeCount(likesCount || 0);
    setCurrentUserReaction(isLiked);
    setCurrentIsBookmarked(isBookmarked);
  }, [likesCount, isLiked, isBookmarked]);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [content]);

  const handleLike = async (e) => {
    e.stopPropagation(); 
    if (!currentUser) {
      toast.info("Bạn cần đăng nhập để thích bài viết");
      navigate("/login");
      return;
    }
    
    const oldState = {
      isLiked: currentUserReaction,
      likeCount: currentLikeCount,
    };

    const newState = {
      isLiked: !currentUserReaction,
      likeCount: !currentUserReaction ? currentLikeCount + 1 : currentLikeCount - 1,
    };
    setCurrentUserReaction(newState.isLiked);
    setCurrentLikeCount(newState.likeCount);

    try {
      await dispatch(updateArticleLike(id)).unwrap();
    } catch (error) {
      toast.error(error.message || "Lỗi: Không thể thích bài viết.");
      setCurrentUserReaction(oldState.isLiked);
      setCurrentLikeCount(oldState.likeCount);
    }
  };

  const handleBookmark = async (e) => {
    e.stopPropagation(); 
    if (!currentUser) {
      toast.info("Bạn cần đăng nhập để lưu bài viết");
      navigate("/login");
      return;
    }

    const oldState = currentIsBookmarked;

    setCurrentIsBookmarked(!oldState);

    try {
      await dispatch(toggleBookmark(id)).unwrap();
    } catch (error) {
      toast.error(error.message || "Lỗi: Không thể lưu bài viết.");
      setCurrentIsBookmarked(oldState);
    }
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
          <div className="flex items-center space-x-1" title="Lượt thích">
            <button
              onClick={handleLike}
              className={`text-sm font-medium ${
                currentUserReaction
                  ? "text-red-500"
                  : "text-gray-600 dark:text-gray-400"
              } hover:text-red-500 transition-colors`}
            >
              <Heart
                className="w-5 h-5"
                fill={currentUserReaction ? "currentColor" : "none"}
              />
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {convertLikeNumber(currentLikeCount)}
            </p>
          </div>

          <div
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400"
            title="Lượt bình luận"
          >
            <MessageSquare className="w-5 h-5" />
            <p className="text-sm">{convertLikeNumber(commentsCount || 0)}</p>
          </div>

          <button
            onClick={handleBookmark}
            className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors"
            title={currentIsBookmarked ? "Bỏ lưu" : "Lưu bài viết"}
          >
            <Bookmark
              className="w-5 h-5"
              fill={currentIsBookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

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