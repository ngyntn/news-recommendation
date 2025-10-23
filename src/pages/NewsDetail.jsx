import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
import { deleteNews } from "../api/articleApi";
import toast from "react-hot-toast";
import BookmarkInteraction from "../components/BookmarkInteraction";

function NewsDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    item,
    itemLoading,
    itemError,
    deleteStatus,
  } = useSelector((state) => state.news);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (slug) {
      dispatch(fetchDetailNews(slug));
    }
    return () => {
      dispatch(resetNewsDetail());
    };
  }, [dispatch, slug]);

  const isAuthor = currentUser && item && currentUser.id === item.author?.id;

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      try {
        await dispatch(deleteNews(item.id)).unwrap();
        toast.success("Xóa bài viết thành công!");
        navigate("/");
      } catch (error) {
        toast.error(error.message || "Xóa bài viết thất bại.");
      }
    }
  };

  if (itemLoading) return <Loader />;
  if (itemError)
    return <div className="text-red-500 text-center">{itemError}</div>;
  if (!item) return null;

  return (
    <div className="dark:text-gray-200">
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        className="w-full h-auto max-h-[350px] md:max-h-[500px] object-cover"
      />

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Nút "Quay lại" - Nâng cấp để chữ cùng hàng với mũi tên */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm mb-4 flex items-center space-x-1" // Thêm flex items-center space-x-1
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span> {/* Bọc chữ trong span để dễ kiểm soát */}
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {item.title}
        </h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={
                item.author?.avatarUrl ||
                "https://placehold.co/400x400/gray/white?text=User"
              }
              alt={item.author?.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{item.author?.fullName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {convertDateTimeToVietnam(item.createdAt)}
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="flex space-x-2">
              <Link
                to={`/edit/${item.slug}`}
                className="btn btn-sm btn-ghost btn-circle hover:bg-base-200 dark:hover:bg-base-700"
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

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

        {/* Khu vực tương tác Like/Bookmark */}
        {/* === Nâng cấp: Giảm khoảng cách và kéo dài "border" === */}
        {/* Xóa divider ở đây và bọc LikeInteraction, BookmarkInteraction trong một div có border/padding */}
        <div className="flex items-center space-x-6 py-4 border-b border-base-200 dark:border-base-700 mb-4"> {/* border-b và mb-4 */}
          <LikeInteraction article={item} />
          <BookmarkInteraction article={item} />
        </div>
        {/* Đã bỏ <div className="divider"></div> ở đây */}

        {/* Comment Section - Giảm khoảng cách bằng cách điều chỉnh mb của div trên */}
        <CommentSection articleId={item.id} />

        <div className="divider"></div>
        <RelatedArticles />
      </div>
    </div>
  );
}

export default NewsDetail;