import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface initialType {
  id: string;
  segments: string;
  segColors: string;
  backgroundColor: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  spinnerColor: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  primaryColor: string;
  numberOfSpins: number;
  probability: {
    label: string;
    probability: number;
    coupon_code: string;
    isWin: string;
    color: string;
  }[];
}
const initialState: initialType = {
  id: "",
  backgroundColor: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  numberOfSpins: 0,
  primaryColor: "",
  probability: [],
  segColors: "",
  segments: "",
  spinnerColor: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
};

const spinRawFormData = createSlice({
  name: "spinRawFormData",
  initialState,
  reducers: {
    updateSpinRawFormData: (_state, action) => {
      return action.payload;
    },
  },
});

export const getSpinRawFormData: (state: RootState) => initialType = (
  state: RootState
) => {
  return state.spinRawFormData;
};
export const { updateSpinRawFormData } = spinRawFormData.actions;
export default spinRawFormData.reducer;
