import {createSlice} from "@reduxjs/toolkit";

export interface LoginState {
    value: boolean
}

const initialState: LoginState = {
    value: false,
}

const loginSlice = createSlice({
    name: 'user login logout',
    initialState,
    reducers: {
        loginUser: (state) => {
            state.value = true
        },
        logoutUser: (state) => {
            state.value = false
        }
    }
})

export const {loginUser, logoutUser} = loginSlice.actions;
export default loginSlice.reducer;