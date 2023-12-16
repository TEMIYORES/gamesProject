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

const rawFormData = createSlice({
  name: "rawFormData",
  initialState,
  reducers: {
    updateRawFormData: (_state, action) => {
      return action.payload;
    },
  },
});

export const getRawFormData: (state: RootState) => initialType = (
  state: RootState
) => {
  return state.rawFormData;
};
export const { updateRawFormData } = rawFormData.actions;
export default rawFormData.reducer;
