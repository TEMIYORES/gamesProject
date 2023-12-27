import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = "";

const gameType = createSlice({
  name: "gameType",
  initialState,
  reducers: {
    setGameType: (_state, action) => {
      return action.payload;
    },
  },
});

export const getGameType: (state: RootState) => string = (state: RootState) => {
  return state.gameTypeData;
};
export const { setGameType } = gameType.actions;
export default gameType.reducer;
