import {createSlice} from "@reduxjs/toolkit";

export interface LoginState {
    user: {
        isLoggedIn: boolean,
        jwt: string
    }
}

const initialState: LoginState = {
    user: {
        isLoggedIn: false,
        jwt: ''
    }

}

const loginSlice = createSlice({
    name: 'user login logout',
    initialState,
    reducers: {
        loginUser: (state, actions) => {
            state.user.isLoggedIn = true
            state.user.jwt = actions.payload
        },
        logoutUser: (state) => {
            state.user.isLoggedIn = false
            state.user.jwt = ''
        },
    }
})

export const {loginUser, logoutUser} = loginSlice.actions;
export default loginSlice.reducer;