import React, { useState } from "react";
import { convertDateTimeToVietnam } from "../utils/convert";
import CommentForm from "./CommentForm";

const Comment = ({ comment, articleId, currentUser }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { author, content, createdAt, replies, isAuthor } = comment;

  return (
    <div className="flex gap-3 py-4">
      {/* Avatar */}
      <img
        src={
          author?.avatarUrl ||
          "https://placehold.co/400x400/gray/white?text=User"
        }
        alt={author?.fullName}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      {/* Nội dung comment */}
      <div className="flex-1">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {author?.fullName || "Người dùng ẩn danh"}
            </p>

            {isAuthor && (
              <span className="text-xs font-medium bg-indigo-100 text-indigo-600 dark:bg-indigo-700 dark:text-indigo-200 px-2 py-0.5 rounded-full">
                Tác giả
              </span>
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {content}
          </p>
        </div>
        {/* Nút chức năng (Thời gian, Trả lời) */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>{convertDateTimeToVietnam(createdAt)}</span>
          {comment.parentId === null && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="font-semibold hover:underline"
            >
              {showReplyForm ? "Hủy" : "Trả lời"}
            </button>
          )}
        </div>

        {/* Form trả lời */}
        {showReplyForm && (
          <div className="mt-3">
            <CommentForm
              articleId={articleId}
              parentId={comment.id}
              placeholder={`Trả lời ${author?.fullName}...`}
              onCommentPosted={() => setShowReplyForm(false)}
              currentUser={currentUser}
            />
          </div>
        )}

        {/* Đệ quy Render replies */}
        {replies && replies.length > 0 && (
          <div className="mt-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                articleId={articleId}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
