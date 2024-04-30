import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	email: null,
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
			state.email = action.payload.email;
		},
		logout(state, action) {
			state.email = initialState.email;
		}
    }
})

export const {setUser, logout} = UserSlice.actions

export default UserSlice.reducer
