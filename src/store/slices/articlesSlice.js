import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNYTimesArticles } from "../../utils/api";

export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async (params, { getState }) => {
        const { query, source } = getState().articles.filters;

        const apiMappings = {
            "news-api": fetchNewsAPIArticles,
            "guardian-api": fetchGuardianArticles,
            "ny-times": fetchNYTimesArticles,
        };

        const sourcesToFetch = source.key === "all"
            ? Object.keys(apiMappings)
            : [source.key];

        const articles = await Promise.all(
            sourcesToFetch.map((key) => apiMappings[key](query, params))
        ).then((results) => results.flat());

        return articles;
    }
);

const initialState = {
    articles: [],
    status: "idle",
    error: null,
    filters: {
        query: "",
        category: "",
        date: "",
        source: "",
        author: "",
        preferredSources: [],
        preferredCategories: [],
        preferredAuthors: [],
    },
};

const createFilterReducer = (key) => (state, action) => {
    state.filters[key] = action.payload;
};

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setQuery: createFilterReducer("query"),
        setCategory: createFilterReducer("category"),
        setDate: createFilterReducer("date"),
        setSource: createFilterReducer("source"),
        setAuthor: createFilterReducer("author"),
        setPreferredSources: createFilterReducer("preferredSources"),
        setPreferredCategories: createFilterReducer("preferredCategories"),
        setPreferredAuthors: createFilterReducer("preferredAuthors"),
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    setQuery,
    setCategory,
    setDate,
    setAuthor,
    setSource,
    setPreferredSources,
    setPreferredCategories,
    setPreferredAuthors,
} = articlesSlice.actions;

export default articlesSlice.reducer;
