import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface spinTheWheelType {
  id: string;
  heading: string;
  redirectHeading: string;
  redirectDescription: string;
  gameHeading: string;
  gameDescription: string;
  gameType: string;
  gameStatus: string;
  prizeWon: string;
  description: string;
  segments: string[];
  segColors: string[];
  background: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  redirectBackground: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  spinner: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  spinnerStyle: string;
  border: string;
  numberOfSpins: number;
  gameSetting: {
    label: string;
    probability: number;
    coupon_code: string;
    isWin: "win" | "no_win";
    wheelColor: string;
    color: string;
  }[];
  fields: string[];
  createDate: string;
}
export interface spinTheWheelProbabilityType {
  label: string;
  probability: number;
  coupon_code: string;
  isWin: "win" | "no_win";
  wheelColor: string;
  color: string;
}
export const SpinWheelinitialState: spinTheWheelType = {
  id: "",
  heading: "",
  description: "",
  redirectHeading: "",
  gameHeading: "",
  gameDescription: "",
  gameType: "Spin the wheel",
  gameStatus: "not published",
  redirectDescription: "",
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
  numberOfSpins: 0,
  border: "",
  gameSetting: [],
  segColors: [],
  segments: [],
  spinner: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  spinnerStyle: "",
  fields: ["firstname", "lastname", "email_address"],
  createDate: new Date().toISOString(),
};

const spinthewheel = createSlice({
  name: "spinthewheel",
  initialState: SpinWheelinitialState,
  reducers: {
    setSpinTheWheelSetting: (_state, action) => {
      return action.payload;
    },
    updateSpinsLeft: (state, action) => {
      return { ...state, numberOfSpins: action.payload };
    },
  },
});

export const getSpinTheWheelSetting: (state: RootState) => spinTheWheelType = (
  state: RootState
) => {
  return state.spinthewheelData;
};

export const { setSpinTheWheelSetting, updateSpinsLeft } = spinthewheel.actions;
export default spinthewheel.reducer;
