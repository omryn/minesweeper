import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  timerKey: 0,
  active: false
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerActive: (state, { payload }: PayloadAction<boolean>) => {
      state.active = payload;
    },
    resetTimer: (state) => {
      state.active = false;
      state.timerKey++
    }
  },
});

export const { setTimerActive, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;
