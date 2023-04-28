import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RentModalState {
  isOpen: boolean;
}

const initialState: RentModalState = {
  isOpen: false,
};

const RentModalSlice = createSlice({
  name: "rentModal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = RentModalSlice.actions;
export default RentModalSlice.reducer;
