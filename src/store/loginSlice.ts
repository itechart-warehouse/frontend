import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  user: {
    isLoggedIn: boolean;
    jwt: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  userCompany: {
    name: string;
  };
  userWarehouse: {
    name: string;
  };
  userRole:{
    name: string;
  }
}

const initialState: LoginState = {
  user: {
    isLoggedIn: false,
    jwt: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  userCompany: {
    name: "",
  },
  userWarehouse: {
    name: "",
  },
  userRole: {
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
      state.user.firstName = actions.payload.data.resource.first_name
      state.user.lastName = actions.payload.data.resource.last_name
      state.userCompany.name = actions.payload.data.company.name;
      state.userWarehouse.name = actions.payload.data.warehouse.name;
      state.userRole.name= actions.payload.data.role.name;
    },
    logoutUser: (state) => {
      state.user.isLoggedIn = false;
      state.user.jwt = "";
      state.user.email = "";
      state.userCompany.name = "";
      state.userWarehouse.name = "";
      state.userRole.name= "";
      state.user.firstName = "";
      state.user.lastName = "";
    },
  },
});

export const { loginUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
