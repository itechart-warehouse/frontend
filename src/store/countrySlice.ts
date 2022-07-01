import { createSlice } from "@reduxjs/toolkit";

export interface CountryState {
  country: {
    id: number;
  };
}

const initialState: CountryState = {
  country: {
    id: 0,
  },
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.country.id = action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
