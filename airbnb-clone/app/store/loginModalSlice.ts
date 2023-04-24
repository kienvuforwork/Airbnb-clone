import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginModalState {
  isOpen: boolean;
}

const initialState: LoginModalState = {
  isOpen: false,
};

const loginModalSlice = createSlice({
  name: "loginModal",
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

export const { onClose, onOpen } = loginModalSlice.actions;
export default loginModalSlice.reducer;
