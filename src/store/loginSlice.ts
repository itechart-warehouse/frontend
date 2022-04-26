import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  user: {
    id: string;
    isLoggedIn: boolean;
    jwt: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  userCompany: {
    id: string;
    name: string;
  };
  userWarehouse: {
    id: string;
    name: string;
  };
  userRole: {
    name: string;
  };
}

const initialState: LoginState = {
  user: {
    id: "",
    isLoggedIn: false,
    jwt: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  userCompany: {
    id: "",
    name: "",
  },
  userWarehouse: {
    id: "",
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
      state.user.id = actions.payload.data.resource.id;
      state.user.email = actions.payload.data.resource.email;
      state.user.firstName = actions.payload.data.resource.first_name;
      state.user.lastName = actions.payload.data.resource.last_name;
      state.userCompany.name = actions.payload.data.company.name;
      state.userCompany.id = actions.payload.data.company.id;
      state.userWarehouse.name = actions.payload.data.warehouse.name;
      state.userWarehouse.id = actions.payload.data.warehouse.id;
      state.userRole.name = actions.payload.data.role.name;
    },
    logoutUser: (state) => {
      state.user.isLoggedIn = false;
      state.user.jwt = "";
      state.user.id = "";
      state.user.email = "";
      state.userCompany.name = "";
      state.userCompany.id = "";
      state.userWarehouse.name = "";
      state.userWarehouse.id = "";
      state.userRole.name = "";
      state.user.firstName = "";
      state.user.lastName = "";
    },
  },
});

export const { loginUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
