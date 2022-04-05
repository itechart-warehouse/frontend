import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  user: {
    isLoggedIn: boolean;
    jwt: string;
    email: string;
  };
  userCompany: {
    name: string;
  };
  userWarehouse: {
    name: string;
  };
}

const initialState: LoginState = {
  user: {
    isLoggedIn: false,
    jwt: "",
    email: "",
  },
  userCompany: {
    name: "",
  },
  userWarehouse: {
    name: "",
  },
};

const loginSlice = createSlice({
  name: "user login logout",
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      state.user.isLoggedIn = true;
      state.user.jwt = actions.payload.headers.authorization;
      state.user.email = actions.payload.data.resource.email;
      state.userCompany.name = actions.payload.data.company.name;
      state.userWarehouse.name = actions.payload.data.warehouse.name;
    },
    logoutUser: (state) => {
      state.user.isLoggedIn = false;
      state.user.jwt = "";
      state.user.email = "";
      state.userCompany.name = "";
      state.userWarehouse.name = "";
    },
  },
});

export const { loginUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
