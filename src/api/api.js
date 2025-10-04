import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const ARTICLES_API = `${BASE_URL}/articles`;
const USERS_API = import.meta.env.VITE_REACT_APP_USERS_API;
const COMMENTS_API = `${BASE_URL}/comments`;

export const fetchRecommendedNews = createAsyncThunk('news/recommended',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const articlesResponse = await fetch(`${ARTICLES_API}?page=${page}&limit=${limit}`);
            if (!articlesResponse.ok) {
                return rejectWithValue(`Lỗi từ server (articles): ${articlesResponse.status}`);
            }
            const articles = await articlesResponse.json();
            const hasMore = articles.length === limit;

            if (articles.length === 0) {
                return { articles: [], authors: {}, hasMore: false };
            }

            const authorIds = [...new Set(articles.map(article => article.userId))];

            const authorPromises = authorIds.map(id =>
                fetch(`${USERS_API}/${id}`).then(res => res.ok ? res.json() : null)
            );
            const authorsData = (await Promise.all(authorPromises)).filter(Boolean);

            const authorsMap = authorsData.reduce((acc, author) => {
                acc[author.id] = author;
                return acc;
            }, {});

            return { articles, authors: authorsMap, hasMore };
        } catch (error) {
            return rejectWithValue(error.message || 'Lỗi kết nối đến server');
        }
    }
);

export const fetchDetailNews = createAsyncThunk('news/detail',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${ARTICLES_API}?id=${id}`);
            if (!response.ok) return rejectWithValue('Không tìm thấy bài viết');
            
            const articles = await response.json();
            const article = articles[0];
            if (!article) return rejectWithValue('Không tìm thấy bài viết');

            const authorResponse = await fetch(`${USERS_API}/${article.userId}`);
            const author = authorResponse.ok ? await authorResponse.json() : null;

            return { ...article, author };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchNewsByKeySearch = createAsyncThunk('news/search',
    async ({ keySearch }, { rejectWithValue }) => {
        try {
            const articlesResponse = await fetch(`${ARTICLES_API}?title=${keySearch}`);
            if (!articlesResponse.ok) return rejectWithValue('Tìm kiếm thất bại');
            const articles = await articlesResponse.json();

            if (articles.length === 0) {
                return { articles: [], authors: {} };
            }

            const authorIds = [...new Set(articles.map(article => article.userId))];
            const authorPromises = authorIds.map(id =>
                fetch(`${USERS_API}/${id}`).then(res => res.ok ? res.json() : null)
            );
            const authorsData = (await Promise.all(authorPromises)).filter(Boolean);

            const authorsMap = authorsData.reduce((acc, author) => {
                acc[author.id] = author;
                return acc;
            }, {});

            return { articles, authors: authorsMap };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createNews = createAsyncThunk('news/create',
    async ({ title, content, userId }, { rejectWithValue }) => {
        try {
            const newPost = {
                title,
                content,
                userId,
                publishedAt: new Date().toISOString(),
                likeCount: 0,
            };

            const response = await fetch(ARTICLES_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                return rejectWithValue(`Lỗi từ server: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message || 'Lỗi kết nối đến server');
        }
    }
);

export const updateArticleLike = createAsyncThunk('news/updateLike',
    async ({ articleId, newLikeCount }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${ARTICLES_API}/${articleId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ likeCount: newLikeCount }),
            });
            if (!response.ok) return rejectWithValue('Cập nhật thất bại');
            return await response.json();
        } catch (error) { return rejectWithValue(error.message); }
    }
);

export const fetchComments = createAsyncThunk('news/fetchComments',
    async ({ articleId }, { rejectWithValue }) => {
        try {
            const commentsResponse = await fetch(`${COMMENTS_API}?articleId=${articleId}`);
            if (!commentsResponse.ok) return rejectWithValue('Lấy bình luận thất bại');
            const comments = await commentsResponse.json();

            if (comments.length === 0) return { comments: [], authors: {} };

            const authorIds = [...new Set(comments.map(c => c.userId))];
            const authorPromises = authorIds.map(id => fetch(`${USERS_API}/${id}`).then(res => res.json()));
            const authors = await Promise.all(authorPromises);
            const authorsMap = authors.reduce((acc, author) => {
                acc[author.id] = author;
                return acc;
            }, {});

            return { comments, authors: authorsMap };
        } catch (error) { return rejectWithValue(error.message); }
    }
);

export const postComment = createAsyncThunk('news/postComment',
    async ({ articleId, content, currentUser }, { rejectWithValue }) => {
        try {
            const newComment = {
                articleId,
                content,
                userId: currentUser.id,
                createdAt: new Date().toISOString(),
            };
            const response = await fetch(COMMENTS_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment),
            });
            if (!response.ok) return rejectWithValue('Gửi bình luận thất bại');
            const postedComment = await response.json();
            return { comment: postedComment, author: currentUser };
        } catch (error) { return rejectWithValue(error.message); }
    }
);

export const fetchRelatedArticles = createAsyncThunk('news/fetchRelated',
    async ({ authorId, currentArticleId }, { rejectWithValue }) => {
        if (!authorId) return [];
        try {
            const response = await fetch(`${ARTICLES_API}?userId=${authorId}`);
            if (!response.ok) return rejectWithValue('Lấy bài viết liên quan thất bại');
            const articles = await response.json();
            return articles.filter(a => a.id !== currentArticleId).slice(0, 3);
        } catch (error) { return rejectWithValue(error.message); }
    }
);