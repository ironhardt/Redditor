import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loadData = createAsyncThunk(
    'postList/loadData',
    async (subreddit, thunkAPI) => {
        const response = await fetch('https://www.reddit.com/r/javascript/hot.json')
        const json = await response.json()
        return json
    }
)

export const postSlice = createSlice({
    name: 'postList',
    initialState: {
        posts: ["has not ran"],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: {
        [loadData.pending]: (state, action) => {
            console.log('Pending ran')
            state.isLoading = true
        },
        [loadData.fulfilled]: (state, action) => {
            console.log('fulfilled ran')
            console.log(action.payload)
            state.isLoading = false
            state.posts = action.payload.data.children.map(post => post.data.title)

        },
        [loadData.rejected]: (state, action) => {
            console.log('rejected ran')
        }
    }
})

export const selectData = state => state.postList
export const selectIsLoading = state => state.postList.isLoading



export default postSlice.reducer
