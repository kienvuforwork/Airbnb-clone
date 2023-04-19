import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RegisterModalState {
  isOpen: boolean;
}

const initialState: RegisterModalState = {
  isOpen: false,
};

const registerModalSlice = createSlice({
  name: "registerModal",
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

export const { onClose, onOpen } = registerModalSlice.actions;
export default registerModalSlice.reducer;
