import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postComment } from '../api/api';

const Comment = ({ comment, author }) => (
    <div className="flex gap-3 py-4">
        <img src={author?.avatar} alt={author?.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-gray-100">{author?.name || 'Người dùng ẩn danh'}</p>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
    </div>
);

const CommentSection = ({ articleId }) => {
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState("");
    const { currentUser } = useSelector(state => state.user);
    const { itemComments, itemCommentAuthors } = useSelector(state => state.news);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser) return;
        dispatch(postComment({ articleId, content: newComment, currentUser }));
        setNewComment("");
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Bình luận</h3>
            {currentUser && (
                <form onSubmit={handleSubmitComment} className="flex gap-3 mb-6">
                    <img src={currentUser.avatar} alt="Your avatar" className="w-10 h-10 rounded-full object-cover" />
                    <input 
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Viết bình luận..."
                        className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-200"
                    />
                    <button type="submit" className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-indigo-700">Gửi</button>
                </form>
            )}
            <div>
                {itemComments.map(comment => (
                    <Comment key={comment.id} comment={comment} author={itemCommentAuthors[comment.userId]} />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;