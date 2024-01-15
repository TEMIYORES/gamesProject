import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface puzzleType {
  id: string;
  heading: string;
  description: string;
  redirectHeading: string;
  redirectDescription: string;
  gameHeading: string;
  gameDescription: string;
  gameType: string;
  gameStatus: string;
  priceWon: string;
  selectGrid: string;
  winSound: {
    id: number | null;
    name: string;
    url: string;
  };
  timeUpSound: {
    id: number | null;
    name: string;
    url: string;
  };
  retryLimit: string;
  couponCode: string;
  timer: boolean;
  setTimer: string;
  redirectBackground: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  selectedImage: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  background: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  mobileBackground: {
    imgName: string;
    imgUrl: string;
    color: string;
  };

  fields: string[];
  createDate: string;
}
export interface Sound {
  id: number | null;
  name: string;
  url: string;
}

const initialState: puzzleType = {
  id: "",
  heading: "",
  description: "",
  redirectHeading: "",
  redirectDescription: "",
  gameHeading: "",
  gameDescription: "",
  gameType: "Puzzle",
  timer: false,
  setTimer: "",
  winSound: {
    id: null,
    name: "",
    url: "",
  },
  timeUpSound: {
    id: null,
    name: "",
    url: "",
  },
  retryLimit: "",
  couponCode: "",
  gameStatus: "",
  priceWon: "",
  selectGrid: "",
  selectedImage: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  background: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  redirectBackground: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  mobileBackground: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  fields: [],
  createDate: "",
};

const puzzleData = createSlice({
  name: "scratchCardData",
  initialState,
  reducers: {
    setPuzzle: (_state, action) => {
      return action.payload;
    },
  },
});

export const getPuzzleData: (state: RootState) => puzzleType = (
  state: RootState
) => {
  return state.puzzleData;
};
export const { setPuzzle } = puzzleData.actions;
export default puzzleData.reducer;
