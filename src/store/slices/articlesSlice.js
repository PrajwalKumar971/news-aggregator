// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNYTimesArticles } from "../../utils/api";
// export const fetchArticles = createAsyncThunk(
//     "articles/fetchArticles",
//     async (params, { getState }) => {
//         const { query, source } = getState().articles.filters;

//         let articles = [];

//         if (source.key === 'news-api' || source.key === 'all') {
//             const newsAPIArticles = await fetchNewsAPIArticles(query, params);
//             articles = [...articles, ...newsAPIArticles];
//         }

//         if (source.key === 'guardian-api' || source.key === 'all') {
//             const guardianArticles = await fetchGuardianArticles(query, params);
//             articles = [...articles, ...guardianArticles];
//         }

//         if (source.key === 'ny-times' || source.key === 'all') {
//             const nyTimesArticles = await fetchNYTimesArticles(query, params);
//             articles = [...articles, ...nyTimesArticles];
//         }
//         return articles;
//     }
// );
// const articlesSlice = createSlice({

//     name: "articles",
//     initialState: {
//         articles: [],
//         status: "idle",
//         error: null,
//         filters: {
//             query: "",
//             category: "",
//             date: "",
//             source: "",
//             author: "",
//             preferredSources: [],
//             preferredCategories: [],
//             preferredAuthors: [],
//         },
//     },
//     reducers: {
//         setQuery(state, action) {
//             state.filters.query = action.payload;
//         },
//         setCategory(state, action) {
//             state.filters.category = action.payload;
//         },
//         setDate(state, action) {
//             state.filters.date = action.payload;
//         },
//         setSource(state, action) {
//             state.filters.source = action.payload;
//         },
//         setAuthor(state, action) {
//             state.filters.author = action.payload;
//         },
//         setPreferredSources(state, action) {
//             state.filters.preferredSources = action.payload;
//         },
//         setPreferredCategories(state, action) {
//             state.filters.preferredCategories = action.payload;
//         },
//         setPreferredAuthors(state, action) {
//             state.filters.preferredAuthors = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchArticles.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchArticles.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.articles = action.payload;
//             })
//             .addCase(fetchArticles.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             });
//     }
// });

// export const {
//     setQuery,
//     setCategory,
//     setDate,
//     setAuthor,
//     setSource,
//     setPreferredSources,
//     setPreferredCategories,
//     setPreferredAuthors,
// } = articlesSlice.actions;

// export default articlesSlice.reducer;
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
