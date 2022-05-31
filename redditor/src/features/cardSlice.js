import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loadData = createAsyncThunk(
    'cardList/loadData',
    async () => {
        const demo = setTimeout(() => {
            console.log('loading data...')
            return 'first entry'
        }, 3000)
        return demo
    }
)

export const cardSlice = createSlice({
    name: 'cardList',
    initialState: {
        cards: ["has not ran"],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: {
        [loadData.pending]: (state, action) => {
            state.isLoading = true
            state.hasError = false
        },
        [loadData.fulfilled]: (state, action) => {
            state.isLoading = false
            state.hasError = false
            state.cards[0] = action.payload
        },
        [loadData.rejected]: (state, action) => {
            state.isLoading = false
            state.hasError = true
        }
    }
})

export const selectData = state => state.card


export default cardSlice.reducer
