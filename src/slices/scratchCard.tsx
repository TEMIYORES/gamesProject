import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface scratchCardType {
  id: string;
  heading: string;
  description: string;
  redirectHeading: string;
  redirectDescription: string;
  gameHeading: string;
  gameDescription: string;
  gameType: string;
  gameStatus: string;
  prizeWon: string;
  redirectBackground: {
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
  fields: string[];
  createDate: string;
}
export interface Sound {
  id: number | null;
  name: string;
  url: string;
}
export interface scratchGameSettingType {
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
export const ScratchcardinitialState: scratchCardType = {
  id: "",
  heading: "",
  description: "",
  redirectHeading: "",
  redirectDescription: "",
  gameHeading: "",
  gameDescription: "",
  gameType: "Scratch card",
  gameStatus: "not published",
  prizeWon: "",
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
  fields: [],
  createDate: "",
};

const scratchCardData = createSlice({
  name: "scratchCardData",
  initialState:ScratchcardinitialState,
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
