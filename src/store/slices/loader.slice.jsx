import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        setLoader: (state, action) => {
            return action.payload
        }
    }
})

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
