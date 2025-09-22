
import { createAsyncThunk } from "@reduxjs/toolkit";


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const GET_RECOMMENDED_NEWS = `${BASE_URL}/news`;
const GET_DETAIL_NEWS = `${BASE_URL}/news`; // /:id
const GET_NEWS_BY_SEARCH_KEY = `${BASE_URL}/news`; 


export const fetchRecommendedNews = createAsyncThunk('news/recommended',
    async ({ limit }, { rejectWithValue }) => {
        try {
            const TARGET_API = GET_RECOMMENDED_NEWS + `?limit=${limit}`;
            const response = await fetch(TARGET_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return rejectWithValue({
                    code: response.status, // Lưu mã trạng thái (ví dụ: 404)
                    message: `Lỗi từ server: ${response.status} ${response.statusText}`,
                });
            }

            const objectResponse = await response.json();
            return objectResponse;
        } catch (error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    }
);

export const fetchDetailNews = createAsyncThunk('news/detail',
    async ({ id }, { rejectWithValue }) => {
        try {
            const TARGET_API = GET_DETAIL_NEWS + `?newsId=${id}`;
            const response = await fetch(TARGET_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return rejectWithValue({
                    code: response.status, // Lưu mã trạng thái (ví dụ: 404)
                    message: `Lỗi từ server: ${response.status} ${response.statusText}`,
                });
            }
            
            const objectResponse = await response.json();
            return objectResponse;
        } catch (error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    }
);



export const fetchNewsByKeySearch = createAsyncThunk('news/search',
    async ({ keySearch, limit, page }, { rejectWithValue }) => {
        try {
            const TARGET_API = GET_NEWS_BY_SEARCH_KEY + `?title=${keySearch}`;
            const response = await fetch(TARGET_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return rejectWithValue({
                    code: response.status, // Lưu mã trạng thái (ví dụ: 404)
                    message: `Lỗi từ server: ${response.status} ${response.statusText}`,
                });
            }
            
            const objectResponse = await response.json();
            return objectResponse;
        } catch (error) {
            return rejectWithValue({
                code: 9090,
                message: error.message || 'Lỗi kết nối đến server'
            });
        }
    }
);



