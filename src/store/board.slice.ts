import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  width: 20,
  height: 10,
  minesProbability: 0.1,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardWidth: (state, { payload: width }: PayloadAction<number>) => {
      state.width = width;
    },
    setBoardHeight: (state, { payload: height }: PayloadAction<number>) => {
      state.height = height;
    },
    setBoardMinesProbability: (state, { payload: minesProbability }: PayloadAction<number>) => {
      state.minesProbability = minesProbability / 100;
    },
  },
});

export default boardSlice.reducer;
