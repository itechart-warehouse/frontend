import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  errors: Array<String>;
}
const initialState: initialStateType = { errors: [] };

const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setError: (state, action) => {
      return { errors: action.payload };
    },
    clearError: () => {
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
