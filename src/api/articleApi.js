import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './apiClient';

export const fetchRecommendedNews = createAsyncThunk(
    'articles/fetchRecommended', 
    async ({ page, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await api.get('/articles', { params: { page, limit } });
            const resData = response.data.data;
            console.log("SSSS",resData)
            return { 
                articles: resData.articles, 
                pagination: resData.pagination
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchDetailNews = createAsyncThunk(
    'articles/fetchDetail',
    async (slug, { rejectWithValue }) => { 
        try {
            const response = await api.get(`/articles/${slug}`);
            console.log("DETAIL",response)
            return response.data.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchNewsByKeySearch = createAsyncThunk(
    'articles/search',
    async ({ keySearch }, { rejectWithValue }) => {
        try {
            const response = await api.get('/articles/search', { params: { q: keySearch } });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const createNews = createAsyncThunk(
    'articles/create',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post('/articles', formData, {
                headers: { 'Content-Type': 'multipart/form-data' } 
            }); 
            console.log("AAAA",response)
            return response.data.data;
        } catch (error) {
            const originalMessage = error.response?.data?.message || error.message;
            const cleanMessage = originalMessage.replace(/^\[.*?\]: /, '');
            return rejectWithValue(cleanMessage);
        }
    }
);

export const uploadMedia = createAsyncThunk(
    'articles/uploadMedia',
    async (fileData, { rejectWithValue }) => {
        try {
            const response = await api.post('/articles/upload-media', fileData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateNews = createAsyncThunk(
    'articles/update',
    async ({ articleId, formData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/articles/${articleId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteNews = createAsyncThunk(
    'articles/delete',
    async (articleId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/articles/${articleId}`);
            return response.data.data; 
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateArticleLike = createAsyncThunk(
    'articles/updateLike', 
    async (articleId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/articles/${articleId}/like`);
            return response.data.data; 
        } catch (error) { 
            return rejectWithValue(error.response?.data?.message || error.message); 
        }
    }
);

export const fetchUserNews = createAsyncThunk(
    'articles/fetchByUser', 
    async ({ userId, page, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await api.get('/articles', { params: { userId, page, limit } });
            const resData = response.data.data; 
            return {
                articles: resData.data,
                hasMore: resData.pagination.page < resData.pagination.totalPages
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchFeedNews = createAsyncThunk(
    'articles/fetchFeed', 
    async ({ page, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await api.get('/articles/feed', { params: { page, limit } });
            const resData = response.data.data;
            return { 
                articles: resData.articles,
                pagination: resData.pagination
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchRelatedArticles = createAsyncThunk('news/fetchRelated',
    async ({ authorId, currentArticleId }, { rejectWithValue }) => {
        if (!authorId) return [];
        try {
            const response = await api.get(ARTICLES_API, { params: { userId: authorId } });
            const articles = response.data;
            return articles.filter(a => a.id !== currentArticleId).slice(0, 3);
        } catch (error) { 
            return rejectWithValue(error.response?.data?.message || error.message); 
        }
    }
);