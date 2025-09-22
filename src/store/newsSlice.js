import { createSlice } from "@reduxjs/toolkit";
import { fetchDetailNews, fetchNewsByKeySearch, fetchRecommendedNews } from "../api/api";



const newsSlice = createSlice({
    name: "news",
    initialState: {
        items: [],
        loading: false,
        error: null,
        page: 1,
        hasMore: true,

        item: null,
        itemLoading: false,
        itemError: null,

        searchedItems:[],
        searchedLoading: false,
        searchedError: null,
    },
    reducers: {
        resetHomeNews: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
            state.page = 1;
            state.hasMore = true;
        },
        resetNewsDetail: (state) => {
            state.item = null;
            state.itemLoading = false;
            state.itemError = null;
        },
        resetSearchResult: (state) => {
            state.searchedItems = [];
            state.searchedLoading = false;
            state.searchedError = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendedNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecommendedNews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = [...state.items, ...action.payload];

                // Kiểm tra xem có còn dữ liệu để tải không
                if (action.payload.length === 0) {
                    state.hasMore = false;
                }
                
                state.page += 1; // Tăng số trang lên

                // Chuyển đổi likeCount từ chuỗi sang số nguyên
                state.items = state.items.map(item => ({
                    ...item,
                    likeCount: Number(item.likeCount)
                }));

                console.log("NewsSlice.js: Received news", action.payload);
            })
            .addCase(fetchRecommendedNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //
            .addCase(fetchDetailNews.pending, (state) => {
                state.itemLoading = true;
                state.itemError = null;
            })
            .addCase(fetchDetailNews.fulfilled, (state, action) => {
                state.itemLoading = false;
                state.item = action.payload[0];

                // Chuyển đổi likeCount từ chuỗi sang số nguyên
                state.item = {
                    ...state.item,
                    likeCount: Number(state.item.likeCount)
                };

                console.log("NewsSlice.js: Received detail news", action.payload);
            })
            .addCase(fetchDetailNews.rejected, (state, action) => {
                state.itemLoading = false;
                state.itemError = action.error.message;
                console.log("NewsSlice.js: Error fetching detail news", action.error.message);
            })

            .addCase(fetchNewsByKeySearch.pending, (state) => {
                state.searchedLoading = true;
                state.searchedError = null;
            })
            .addCase(fetchNewsByKeySearch.fulfilled, (state, action) => {
                state.searchedLoading = false;
                state.searchedItems = action.payload;

                // Chuyển đổi likeCount từ chuỗi sang số nguyên
                state.searchedItems = state.searchedItems.map(item => ({
                    ...item,
                    likeCount: Number(item.likeCount)  // hoặc parseInt(item.likeCount, 10)
                }));

                console.log("NewsSlice.js: Received searched news", action.payload);
            })
            .addCase(fetchNewsByKeySearch.rejected, (state, action) => {
                state.searchedLoading = false;
                state.searchedError = action.error.message;
                console.log("NewsSlice.js: Error fetching searched news", action.error.message);
            });
    },
});

export const { resetNewsDetail, resetSearchResult, resetHomeNews } = newsSlice.actions;
export default newsSlice.reducer;
