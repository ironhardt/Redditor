import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loadData = createAsyncThunk(
    'postList/loadData',
    async (path, thunkAPI) => {
        const response = await fetch(`https://www.reddit.com/r/${path.sub}/${path.listing}.json?limit=5&raw_json=1&${path.after}`)
        // https://iq.opengenus.org/get-list-of-posts-using-reddit-api/
        const json = await response.json()
        return json
    }
)

export const postSlice = createSlice({
    name: 'postList',
    initialState: {
        posts: [],
        after: ''
    },
    reducers: {},
    extraReducers: {
        [loadData.pending]: (state, action) => {
        },
        [loadData.fulfilled]: (state, action) => {
            action.payload.data.children.map(post => {
                state.posts.push(post)
            })
            state.after = `after=${action.payload.data.after}`
        },
        [loadData.rejected]: (state, action) => {

        }
    }
})

export const selectData = state => state.postList
export const selectPageAfter = state => state.postList.after



export default postSlice.reducer
