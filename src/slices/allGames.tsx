import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { spinTheWheelType } from "./spinthewheel";
import { puzzleType } from "./puzzle";
import { scratchCardType } from "./scratchCard";

// export interface spinTheWheelProbabilityType {
//   label: string;
//   probability: number;
//   coupon_code: string;
//   isWin: "win" | "no_win";
//   color: string;
// }
const initialState: spinTheWheelType[] | scratchCardType[] | puzzleType[] = [];

const allGames = createSlice({
  name: "games",
  initialState,
  reducers: {
    setAllGames: (_state, action) => {
      return action.payload;
    },
  },
});

export const getAllGames: (
  state: RootState
) => spinTheWheelType[] | scratchCardType[] | puzzleType[] = (
  state: RootState
) => {
  return state.allGames;
};

export const { setAllGames } = allGames.actions;
export default allGames.reducer;
