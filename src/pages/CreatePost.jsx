import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNews } from '../api/api';
import Loader from '../components/Loader';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const { createStatus } = useSelector((state) => state.news);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('Vui lòng nhập cả tiêu đề và nội dung.');
            return;
        }

        if (!currentUser) {
            alert('Không tìm thấy thông tin người dùng. Vui lòng thử lại.');
            return;
        }

        dispatch(createNews({ title, content, userId: currentUser.id }))
            .unwrap()
            .then((newPost) => {
                navigate(`/news/${newPost.id}`);
            })
            .catch((error) => {
                console.error('Không thể tạo bài viết:', error);
                alert('Đã có lỗi xảy ra khi tạo bài viết.');
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center py-12 px-4 transition-colors">
            <div className="w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Tạo bài viết mới</h1>
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tiêu đề
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tiêu đề bài viết của bạn"
                            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nội dung (hỗ trợ Markdown)
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="15"
                            placeholder="Viết nội dung của bạn ở đây... Sử dụng Markdown để định dạng."
                            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 font-mono"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={createStatus === 'loading'}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-400 dark:disabled:bg-indigo-700"
                    >
                        {createStatus === 'loading' ? 'Đang đăng...' : 'Đăng bài'}
                    </button>
                </form>
            </div>
            {createStatus === 'loading' && <Loader isLoading={true} />}
        </div>
    );
};

export default CreatePost;