import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  userCard: {
    firstName: string;
    lastName: string;
    address: string;
    birthDate: string;
    user_role_id: number;
  };
}

const initialState: UserState = {
  userCard: {
    firstName: "",
    lastName: "",
    address: "",
    birthDate: "",
    user_role_id: 0,
  },
};

const userSlice = createSlice({
  name: "user card",
  initialState,
  reducers: {
    setUserState: (state, actions) => {
      state.userCard = actions.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;
export default userSlice.reducer;
