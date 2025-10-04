import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser, fetchFeedNews, fetchUserNews, fetchUserProfile, toggleFollow, updateUserProfile } from '../api/userApi';

// Những chố comment là những phần khi có backend mới sử dụng
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null, 
        profile: { 
            data: null,
            news: [],
            status: 'idle',
            error: null,
            // page: 1,
            // hasMore: true,
        },
        feed: { 
            news: [], 
            authors: {},
            status: 'idle',
            error: null,
        },
    },
    reducers: {
        resetProfile: (state) => {
            state.profile.data = null;
            state.profile.news = [];
            state.profile.status = 'idle';
            state.profile.error = null;
        },
        resetFeed: (state) => {
            state.feed.news = [];
            state.feed.authors = {};
            state.feed.status = 'idle';
            state.feed.error = null;
            // state.feed.page = 1;
            // state.feed.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.fulfilled, (state, action) => { state.currentUser = action.payload; })
            .addCase(fetchUserProfile.pending, (state) => { state.profile.status = 'loading'; })
            .addCase(fetchUserProfile.fulfilled, (state, action) => { state.profile.status = 'succeeded'; state.profile.data = action.payload; })
            .addCase(fetchUserProfile.rejected, (state, action) => { state.profile.status = 'failed'; state.profile.error = action.payload; })
            .addCase(fetchUserNews.fulfilled, (state, action) => { state.profile.news = action.payload; })
            
            // SỬA LẠI CASE NÀY
            .addCase(fetchFeedNews.pending, (state) => {
                // if (state.page === 1) {
                //     state.feed.status = 'loading';
                // }
                state.feed.status = 'loading';
            })
            .addCase(fetchFeedNews.fulfilled, (state, action) => {
                state.feed.status = 'succeeded';
                // state.feed.news.push(...action.payload.news);
                // Object.assign(state.feed.authors, action.payload.authors);
                // state.feed.page += 1;
                // state.feed.hasMore = action.payload.hasMore;
                state.feed.news = action.payload.news;
                state.feed.authors = action.payload.authors;
            })
            .addCase(fetchFeedNews.rejected, (state, action) => { state.feed.status = 'failed'; state.feed.error = action.payload; })

            .addCase(toggleFollow.fulfilled, (state, action) => {
                state.currentUser = action.payload.updatedCurrentUser;
                if (state.profile.data?.id === action.payload.updatedTargetUser.id) {
                    state.profile.data = action.payload.updatedTargetUser;
                }
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                if (state.profile.data?.id === action.payload.id) {
                    state.profile.data = action.payload;
                }
            });
    },
});

export const { resetProfile, resetFeed } = userSlice.actions;
export default userSlice.reducer;