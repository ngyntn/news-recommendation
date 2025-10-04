import { createSlice } from "@reduxjs/toolkit";
import { fetchDetailNews, fetchNewsByKeySearch, fetchRecommendedNews, createNews, updateArticleLike, fetchComments, postComment, fetchRelatedArticles } from "../api/api";



const newsSlice = createSlice({
    name: "news",
    initialState: {
        items: [],
        authors: {},
        loading: false,
        error: null,
        page: 1,
        hasMore: true,

        item: null,
        itemLoading: false,
        itemError: null,

        itemComments: [],
        itemCommentAuthors: {},
        relatedItems: [],
        searchedItems: [],
        searchedAuthors: {},
        searchedLoading: false,
        searchedError: null,

        createStatus: 'idle',
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
            state.itemComments = [];
            state.itemCommentAuthors = {};
            state.relatedItems = [];
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
            })
            .addCase(fetchRecommendedNews.fulfilled, (state, action) => {
                state.items.push(...action.payload.articles);
                Object.assign(state.authors, action.payload.authors);
                state.page += 1;
                state.loading = false;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchRecommendedNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchDetailNews.pending, (state) => {
                state.itemLoading = true;
                state.itemError = null;
            })
            .addCase(fetchDetailNews.fulfilled, (state, action) => {
                state.itemLoading = false;
                state.item = action.payload;
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
                const { articles, authors } = action.payload;
                state.searchedItems = articles;
                state.searchedAuthors = authors;
            })
            .addCase(fetchNewsByKeySearch.rejected, (state, action) => {
                state.searchedLoading = false;
                state.searchedError = action.error.message;
                console.log("NewsSlice.js: Error fetching searched news", action.error.message);
            })
            .addCase(createNews.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createNews.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.items.unshift(action.payload);
            })
            .addCase(createNews.rejected, (state) => {
                state.createStatus = 'failed';
            })
            .addCase(updateArticleLike.fulfilled, (state, action) => {
                if (state.item && state.item.id === action.payload.id) {
                    state.item.likeCount = action.payload.likeCount;
                }
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.itemComments = action.payload.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                state.itemCommentAuthors = action.payload.authors;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.itemComments.unshift(action.payload.comment);
                state.itemCommentAuthors[action.payload.author.id] = action.payload.author;
            })
            .addCase(fetchRelatedArticles.fulfilled, (state, action) => {
                state.relatedItems = action.payload;
            });
    },
});

export const { resetNewsDetail, resetSearchResult, resetHomeNews } = newsSlice.actions;
export default newsSlice.reducer;
