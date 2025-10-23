// fe/src/api/commentApi.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './apiClient';

export const fetchComments = createAsyncThunk(
    'comments/fetchByArticle', // Đổi tên 'news/fetchComments'
    async ({ articleId, page, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await api.get('/comments', { 
                params: { articleId, page, limit } 
            });
            // (Giả sử BE đã hỗ trợ phân trang)
            const resData = response.data.data; 
            return {
                comments: resData.data,
                hasMore: resData.pagination.page < resData.pagination.totalPages
            };
        } catch (error) { 
            return rejectWithValue(error.response?.data?.message || error.message); 
        }
    }
);

export const postComment = createAsyncThunk(
    'comments/post', // Đổi tên 'news/postComment'
    async ({ articleId, content }, { rejectWithValue }) => {
        try {
            const response = await api.post('/comments', { articleId, content });
            return response.data.data; // Trả về comment mới
        } catch (error) { 
            return rejectWithValue(error.response?.data?.message || error.message); 
        }
    }
);