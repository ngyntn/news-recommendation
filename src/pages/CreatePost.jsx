import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNews } from '../api/api';
import Loader from '../components/Loader';
import { ImagePlus, Video, X, Tag } from 'lucide-react';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState(''); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const { createStatus } = useSelector((state) => state.news);

    const handleFileChange = (e) => {
        // Lấy các file đã chọn và tạo URL preview
        const selectedFiles = Array.from(e.target.files).map(file => ({
            file,
            preview: URL.createObjectURL(file),
            type: file.type,
        }));
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const removeFile = (fileToRemove) => {
        // Xóa một file khỏi danh sách preview
        setFiles(files.filter(file => file.preview !== fileToRemove.preview));
        URL.revokeObjectURL(fileToRemove.preview); // Giải phóng bộ nhớ
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = currentTag.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setCurrentTag(''); 
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };


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
                    
                    {/* Khu vực upload và preview */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Thêm ảnh/video
                        </label>
                        <div className="flex gap-4 mb-4">
                            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                                <ImagePlus size={20} className="text-indigo-500" />
                                <span>Thêm ảnh</span>
                                <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                            </label>
                            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                                <Video size={20} className="text-green-500" />
                                <span>Thêm video</span>
                                <input type="file" accept="video/*" multiple onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>

                        {/* Khu vực preview */}
                        {files.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 border-t pt-4">
                                {files.map(file => (
                                    <div key={file.preview} className="relative group">
                                        {file.type.startsWith('image/') ? (
                                            <img src={file.preview} alt="preview" className="w-full h-32 object-cover rounded-lg" />
                                        ) : (
                                            <video src={file.preview} className="w-full h-32 object-cover rounded-lg" controls />
                                        )}
                                        <button 
                                            type="button"
                                            onClick={() => removeFile(file)}
                                            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="tags" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Gắn thẻ (tags)
                        </label>
                        <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                            {tags.map(tag => (
                                <div key={tag} className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 text-sm font-medium px-2 py-1 rounded">
                                    <span>{tag}</span>
                                    <button type="button" onClick={() => removeTag(tag)}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                id="tags"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                placeholder="Thêm tag..."
                                className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-gray-200"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Nhấn Enter hoặc dấu phẩy (,) để thêm một tag.</p>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="content" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nội dung (hỗ trợ Markdown)
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="10"
                            placeholder="Viết nội dung của bạn ở đây..."
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