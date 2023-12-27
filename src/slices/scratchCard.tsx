import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface scratchCardType {
  id: string;
  heading: string;
  description: string;
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
  numberOfScratchCard: number;
  centerImage: {
    imgName: string;
    imgUrl: string;
  };
  scratchPercentage: number;
  scratchSound: {
    id: number | null;
    name: string;
    url: string;
  };
  gameSetting: {
    label: string;
    probability: number;
    coupon_code: string;
    isWin: "win" | "no_win";
    color: string;
    price: string;
    imgName: string;
    imgUrl: string;
  }[];
}
export interface Sound {
  id: number | null;
  name: string;
  url: string;
}
export interface gameSettingType {
  label: string;
  probability: number;
  coupon_code: string;
  isWin: "win" | "no_win";
  color: string;
  price: string;
  imgName: string;
  imgUrl: string;
}
[];
const initialState: scratchCardType = {
  id: "",
  heading: "",
  description: "",
  background: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  mobileBackground: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  numberOfScratchCard: 1,
  centerImage: {
    imgName: "",
    imgUrl: "",
  },
  scratchPercentage: 0,
  scratchSound: {
    id: null,
    name: "",
    url: "",
  },
  gameSetting: [],
};

const scratchCardData = createSlice({
  name: "scratchCardData",
  initialState,
  reducers: {
    setScratchCard: (_state, action) => {
      return action.payload;
    },
  },
});

export const getScratchCardData: (state: RootState) => scratchCardType = (
  state: RootState
) => {
  return state.scratchCardData;
};
export const { setScratchCard } = scratchCardData.actions;
export default scratchCardData.reducer;
