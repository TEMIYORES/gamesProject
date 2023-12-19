import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface initialType {
  id: string;
  segments: string;
  segColors: {
    label: string;
    value: string;
  }[];
  backgroundColor: string;
  spinnerColor: string;
  primaryColor: string;
  numberOfSpins: number;
  probability: {
    label: string;
    percentage: number;
  }[];
}
const initialState: initialType = {
  id: "",
  backgroundColor: "",
  numberOfSpins: 0,
  primaryColor: "",
  probability: [],
  segColors: [],
  segments: "",
  spinnerColor: "",
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
