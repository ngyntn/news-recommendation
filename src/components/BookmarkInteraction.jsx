// components/BookmarkInteraction.jsx
import React, { useState, useEffect } from "react"; // Thêm useEffect
import { useDispatch, useSelector } from "react-redux"; // Thêm useSelector
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "../api/articleApi"; // Import thunk toggleBookmark
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Để chuyển hướng khi chưa đăng nhập

const BookmarkInteraction = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Khởi tạo navigate
  const { currentUser } = useSelector((state) => state.user); // Lấy currentUser từ Redux

  // Sử dụng trạng thái ban đầu từ article.isBookmarked
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked);
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading riêng

  // Cập nhật trạng thái isBookmarked khi article thay đổi
  // Điều này quan trọng nếu article được fetch lại hoặc cập nhật từ bên ngoài
  useEffect(() => {
    setIsBookmarked(article.isBookmarked);
  }, [article.isBookmarked]);

  const handleBookmark = async () => {
    if (!currentUser) {
      toast.info("Bạn cần đăng nhập để lưu bài viết");
      navigate("/sign-in"); // Chuyển đến trang đăng nhập
      return;
    }

    setIsLoading(true); // Bắt đầu loading
    try {
      // Dispatch thunk toggleBookmark. Nó sẽ trả về trạng thái bookmark mới
      const resultAction = await dispatch(toggleBookmark(article.id)).unwrap();
      
      // Cập nhật state cục bộ dựa trên kết quả trả về từ backend
      setIsBookmarked(resultAction.isBookmarked); // resultAction.isBookmarked là true/false
      
      toast.success(
        resultAction.isBookmarked ? "Đã lưu bài viết!" : "Đã bỏ lưu bài viết."
      );

    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi lưu bài viết.");
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <button
      className="btn btn-ghost btn-sm flex items-center space-x-1"
      onClick={handleBookmark}
      disabled={isLoading} // Disable nút khi đang loading
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <Bookmark
          className={`w-5 h-5 ${
            isBookmarked
              ? "fill-blue-500 text-blue-500" // Đã bookmark
              : "text-gray-500 dark:text-gray-400" // Chưa bookmark
          }`}
        />
      )}
      <span>{isBookmarked ? "Đã lưu" : "Lưu"}</span>
    </button>
  );
};

export default BookmarkInteraction;