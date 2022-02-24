import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setError: (state, action) => {
      return [action.payload];
    },
    clearError: () => {
      return [];
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
