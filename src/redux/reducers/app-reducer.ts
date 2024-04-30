import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	headerNameMenuDisplay: false,
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHeaderNameMenuDisplay(state, action) {
			state.headerNameMenuDisplay =  action.payload;
		}
    }
})

export const {setHeaderNameMenuDisplay} = AppSlice.actions

export default AppSlice.reducer
