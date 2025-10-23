import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import { news } from "./Home";
import { ArrowLeft, Heart, Bookmark } from "lucide-react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import rehypeRaw from "rehype-raw";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchDetailNews, fetchRelatedArticles } from "../api/articleApi";
import { fetchComments } from "../api/commentApi";
import LikeInteraction from "../components/LikeInteraction";
import CommentSection from "../components/CommentSection";
import RelatedArticles from "../components/RelatedArticles";
import { convertDateTimeToVietnam } from "../utils/convert";
import { resetNewsDetail } from "../store/newsSlice";
import Loader from "../components/Loader";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function NewsDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    item: article,
    itemLoading,
    itemError,
    deleteStatus, // Lấy trạng thái xóa
  } = useSelector((state) => state.news);
  const { user } = useSelector((state) => state.auth); // Lấy user đang đăng nhập

  useEffect(() => {
    if (slug) {
      dispatch(fetchDetailNews(slug));
    }
    return () => {
      dispatch(resetNewsDetail());
    };
  }, [dispatch, slug]);

  // ======================================
  // === PHẦN THÊM MỚI (U11) ===
  // ======================================

  // Kiểm tra xem user hiện tại có phải là tác giả không
  const isAuthor = user && article && user.id === article.author?.id;

  const handleDelete = async () => {
    // Sử dụng modal xác nhận của DaisyUI (hoặc window.confirm)
    // Giả sử bạn có modal với id 'delete_modal'
    // document.getElementById('delete_modal').showModal();
    // Hoặc dùng confirm đơn giản:
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      try {
        await dispatch(deleteNews(article.id)).unwrap();
        toast.success("Xóa bài viết thành công!");
        navigate("/"); // Chuyển về trang chủ
      } catch (error) {
        toast.error(error.message || "Xóa bài viết thất bại.");
      }
    }
  };
  // ======================================

  if (itemLoading) return <Loader />;
  if (itemError)
    return <div className="text-red-500 text-center">{itemError}</div>;
  if (!article) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 dark:text-gray-200">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      {/* Thông tin tác giả và Nút Sửa/Xóa */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={
              article.author?.avatarUrl ||
              "https://placehold.co/400x400/gray/white?text=User"
            }
            alt={article.author?.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{article.author?.fullName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* NÚT SỬA/XÓA (U11) */}
        {isAuthor && (
          <div className="flex space-x-2">
            <Link
              to={`/edit/${article.slug}`} // Sửa: Dùng path /edit/
              className="btn btn-sm btn-ghost btn-circle"
              aria-label="Sửa bài viết"
            >
              <PencilIcon className="w-5 h-5" />
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-ghost btn-circle text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
              disabled={deleteStatus === "loading"}
              aria-label="Xóa bài viết"
            >
              {deleteStatus === "loading" ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <TrashIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Ảnh bìa */}
      <img
        src={article.thumbnailUrl}
        alt={article.title}
        className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-6"
      />

      {/* Nội dung bài viết (HTML) */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <LikeInteraction article={item} />
      <CommentSection articleId={item.id} />
      <RelatedArticles />
    </div>
  );
}

export default NewsDetail;
