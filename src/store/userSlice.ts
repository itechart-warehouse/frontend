import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    firstName: string;
    lastName: string;
    address: string;
    birthDate: string;
  };
}

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    address: "",
    birthDate: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;
export default userSlice.reducer;
