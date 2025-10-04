import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Heart } from 'lucide-react';
import { convertLikeNumber } from '../utils/convert';
import { updateArticleLike } from '../api/api';

const LikeInteraction = ({ article }) => {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(article.likeCount || 0);

    const handleLike = () => {
        const newIsLiked = !isLiked;
        const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;

        setIsLiked(newIsLiked);
        setLikeCount(newLikeCount);

        dispatch(updateArticleLike({ 
            articleId: article.id, 
            newLikeCount: newLikeCount 
        }));
    };

    return (
        <div className="my-6 py-4 border-t border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
                <button
                    onClick={handleLike}
                    className={`p-2 rounded-full transition-colors ${
                        isLiked 
                            ? 'bg-red-100 dark:bg-red-900 text-red-500' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                    <Heart 
                        className="w-6 h-6"
                        fill={isLiked ? 'currentColor' : 'none'}
                    />
                </button>
                <span className="font-medium text-gray-700 dark:text-gray-200">
                    {convertLikeNumber(likeCount)} lượt thích
                </span>
            </div>
        </div>
    );
};

export default LikeInteraction;