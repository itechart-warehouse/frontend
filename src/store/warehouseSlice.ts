import { createSlice } from "@reduxjs/toolkit";

export interface WarehouseState {
  warehouse: {
    name: string;
    address: string;
    phone: string;
  };
}

const initialState: WarehouseState = {
  warehouse: {
    name: "",
    address: "",
    phone: "",
  },
};

const warehouseSlice = createSlice({
  name: "warehouse card",
  initialState,
  reducers: {
    setWarehouseState: (state, actions) => {
      state.warehouse = actions.payload;
    },
    clearWarehouseState: () => {
      return initialState;
    },
  },
});

export const { setWarehouseState, clearWarehouseState } =
  warehouseSlice.actions;
export default warehouseSlice.reducer;
