import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecommendedNews,
  fetchDetailNews,
  fetchNewsByKeySearch,
  createNews,
  updateNews,
  deleteNews,
  fetchFeedNews,
  updateArticleLike,
  toggleBookmark,
  fetchRelatedArticles,
} from "../api/articleApi";

import { fetchComments, postComment } from "../api/commentApi";

const initialState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,

  feed: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },

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

  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetHomeNews: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.page = 1;
      state.hasMore = true;
    },
    resetFeed: (state) => {
      state.feed.items = [];
      state.feed.loading = false;
      state.feed.error = null;
      state.feed.page = 1;
      state.feed.hasMore = true;
    },
    resetNewsDetail: (state) => {
      state.item = null;
      state.itemLoading = false;
      state.itemError = null;
      state.itemComments = [];
      state.itemCommentAuthors = {};
      state.relatedItems = [];
    },
    resetArticleStatus: (state) => {
      state.createStatus = "idle";
      state.updateStatus = "idle";
      state.deleteStatus = "idle";
    },
    resetSearchResult: (state) => {
      state.searchedItems = [];
      state.searchedLoading = false;
      state.searchedError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Recommended News
      .addCase(fetchRecommendedNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendedNews.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.articles) {
          action.payload.articles.forEach((article) => {
            if (!state.items.find((item) => item.id === article.id)) {
              state.items.push(article);
            }
          });

          const { pagination } = action.payload;
          if (pagination && typeof pagination.currentPage === "number") {
            state.page = pagination.currentPage + 1;
            state.hasMore = pagination.currentPage < pagination.totalPages;
          } else {
            state.hasMore = false;
            console.error(
              "Lỗi: Dữ liệu phân trang không hợp lệ từ API (Recommended)",
              action.payload
            );
          }
        } else {
          state.hasMore = false;
        }
      })
      .addCase(fetchRecommendedNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Feed News
      .addCase(fetchFeedNews.pending, (state) => {
        state.feed.loading = true;
      })
      .addCase(fetchFeedNews.fulfilled, (state, action) => {
        state.feed.loading = false;
        action.payload.articles.forEach((article) => {
          if (!state.feed.items.find((item) => item.id === article.id)) {
            state.feed.items.push(article);
          }
        });
        state.feed.page += 1;
        state.feed.hasMore = action.payload.hasMore;
        state.feed.loading = false;
        if (action.payload && action.payload.articles) {
          action.payload.articles.forEach((article) => {
            if (!state.feed.items.find((item) => item.id === article.id)) {
              state.feed.items.push(article);
            }
          });

          const { pagination } = action.payload;
          if (pagination && typeof pagination.currentPage === "number") {
            state.feed.page = pagination.currentPage + 1;
            state.feed.hasMore = pagination.currentPage < pagination.totalPages;
          } else {
            state.feed.hasMore = false;
            console.error(
              "Lỗi: Dữ liệu phân trang không hợp lệ từ API (Feed)",
              action.payload
            );
          }
        } else {
          state.feed.hasMore = false;
        }
      })
      .addCase(fetchFeedNews.rejected, (state, action) => {
        state.feed.loading = false;
        state.feed.error = action.payload;
      })
      // Detail News
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
        console.log(
          "NewsSlice.js: Error fetching detail news",
          action.error.message
        );
      })
      // Create News
      .addCase(createNews.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createNews.rejected, (state) => {
        state.createStatus = "failed";
      })
      // Update News
      .addCase(updateNews.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.item = action.payload;
      })
      .addCase(updateNews.rejected, (state) => {
        state.updateStatus = "failed";
      })
      // Delete
      .addCase(deleteNews.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.item = null;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteNews.rejected, (state) => {
        state.deleteStatus = "failed";
      })
      // Search News
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
        console.log(
          "NewsSlice.js: Error fetching searched news",
          action.error.message
        );
      })
      // Article Like
      .addCase(updateArticleLike.fulfilled, (state, action) => {
        if (state.item && state.item.id === action.payload.id) {
          state.item.likeCount = action.payload.likeCount;
        }
      })
      // Bookmark
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        if (state.article) {
          state.article.isBookmarked = action.payload.isBookmarked;
        }
      })
      .addCase(toggleBookmark.rejected, (state, action) => {
        console.error("Bookmark failed:", action.payload);
      })
      // Comments
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.itemComments = action.payload.comments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        state.itemCommentAuthors = action.payload.authors;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.itemComments.unshift(action.payload.comment);
        state.itemCommentAuthors[action.payload.author.id] =
          action.payload.author;
      })
      // Related Articles
      .addCase(fetchRelatedArticles.fulfilled, (state, action) => {
        state.relatedItems = action.payload;
      });
  },
});

export const {
  resetNewsDetail,
  resetFeed,
  resetSearchResult,
  resetHomeNews,
  resetArticleStatus,
} = newsSlice.actions;
export default newsSlice.reducer;
