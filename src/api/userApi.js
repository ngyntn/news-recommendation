import { createAsyncThunk } from '@reduxjs/toolkit';

const USERS_API = import.meta.env.VITE_REACT_APP_USERS_API;
const ARTICLES_API = import.meta.env.VITE_REACT_APP_ARTICLES_API; 

const CURRENT_USER_ID = '1'; 

const fetchApi = async (url, options = {}, rejectWithValue) => {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            ...options,
        });
        if (!response.ok) {
            return rejectWithValue(`Lỗi từ server: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message || 'Lỗi kết nối đến server');
    }
};

export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrentUser',
    (_, { rejectWithValue }) => fetchApi(`${USERS_API}/${CURRENT_USER_ID}`, {}, rejectWithValue)
);

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    ({ userId }, { rejectWithValue }) => fetchApi(`${USERS_API}/${userId}`, {}, rejectWithValue)
);

export const fetchUserNews = createAsyncThunk(
    'user/fetchUserNews',
    ({ userId }, { rejectWithValue }) => fetchApi(`${ARTICLES_API}?userId=${userId}`, {}, rejectWithValue)
);

// Hàm này sẽ được sử dụng khi có backend
// export const fetchFeedNews = createAsyncThunk(
//     'user/fetchFeedNews',
//     async ({ page, limit }, { rejectWithValue, getState }) => {
//         const { currentUser } = getState().user;
//         if (!currentUser || !currentUser.following || currentUser.following.length === 0) {
//             return { news: [], authors: {}, hasMore: false };
//         }

//         try {
//             const followingQuery = currentUser.following.map(id => `userId=${id}`).join('&');
//             const url = `${ARTICLES_API}?${followingQuery}&_page=${page}&_limit=${limit}&_sort=publishedAt&_order=desc`;
            
//             const response = await fetch(url);
//             if (!response.ok) throw new Error('Không thể tải dữ liệu Feed');
            
//             const news = await response.json();
//             const hasMore = news.length === limit;

//             if (news.length === 0) {
//                 return { news: [], authors: {}, hasMore: false };
//             }

//             const authorIds = [...new Set(news.map(p => p.userId))];
//             const authorPromises = authorIds.map(id => fetch(`${USERS_API}/${id}`).then(res => res.ok ? res.json() : null));
//             const authorsData = (await Promise.all(authorPromises)).filter(Boolean);
            
//             const authorsMap = authorsData.reduce((acc, author) => {
//                 acc[author.id] = author;
//                 return acc;
//             }, {});

//             return { news, authors: authorsMap, hasMore };

//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// Hàm này làm việc với json-server, khi có backend sẽ sử dụng hàm trên
export const fetchFeedNews = createAsyncThunk(
    'user/fetchFeedNews',
    async (_, { rejectWithValue, getState }) => {
        const { currentUser } = getState().user;
        if (!currentUser || !currentUser.following || currentUser.following.length === 0) {
            return { news: [], authors: {} }; 
        }

        try {
            const promises = currentUser.following.map(userId =>
                fetch(`${ARTICLES_API}?userId=${userId}`).then(res => {
                    if (res.ok) return res.json();
                    return [];
                })
            );

            const results = await Promise.all(promises);

            const allNews = results.flat().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

            if (allNews.length === 0) {
                return { news: [], authors: {} };
            }

            const authorIds = [...new Set(allNews.map(p => p.userId))];
            const authorPromises = authorIds.map(id => fetch(`${USERS_API}/${id}`).then(res => res.ok ? res.json() : null));
            const authorsData = (await Promise.all(authorPromises)).filter(Boolean);
            
            const authorsMap = authorsData.reduce((acc, author) => {
                acc[author.id] = author;
                return acc;
            }, {});

            return { news: allNews, authors: authorsMap };

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleFollow = createAsyncThunk(
    'user/toggleFollow',
    async ({ targetUser }, { rejectWithValue, getState }) => {
        const { currentUser } = getState().user;
        const isFollowing = currentUser.following.includes(targetUser.id);

        const updatedFollowing = isFollowing
            ? currentUser.following.filter(id => id !== targetUser.id)
            : [...currentUser.following, targetUser.id];
        
        const p1 = fetchApi(`${USERS_API}/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify({ following: updatedFollowing }),
        }, rejectWithValue);

        const updatedFollowers = isFollowing
            ? targetUser.followers.filter(id => id !== currentUser.id)
            : [...targetUser.followers, currentUser.id];
        
        const p2 = fetchApi(`${USERS_API}/${targetUser.id}`, {
            method: 'PUT',
            body: JSON.stringify({ followers: updatedFollowers }),
        }, rejectWithValue);

        const [updatedCurrentUser, updatedTargetUser] = await Promise.all([p1, p2]);

        return { updatedCurrentUser, updatedTargetUser };
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (userData, { rejectWithValue, getState }) => {
        const { currentUser } = getState().user;
        const url = `${USERS_API}/${currentUser.id}`;
        return fetchApi(url, {
            method: 'PUT',
            body: JSON.stringify(userData),
        }, rejectWithValue);
    }
);