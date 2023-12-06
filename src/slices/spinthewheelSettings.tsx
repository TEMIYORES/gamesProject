import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface initialType {
  segments: string[];
  segColors: string[];
  backgroundColor: string;
  spinnerColor: string;
  primaryColor: string;
  numberOfSpins: number;
  probability: {
    label: string;
    percentage: number;
  }[];
}
const initialState: initialType | null = {
  backgroundColor: "#008000",
  numberOfSpins: 20,
  primaryColor: "#008000",
  probability: [
    { label: "cat", percentage: 10 },

    { label: "dog", percentage: 50 },

    { label: "snake", percentage: 20 },

    { label: "lizard", percentage: 30 },
  ],
  segColors: ["#FF0000", "#008000", "#0000FF", "#800080", "#FFA500"],
  segments: ["cat", "dog", "snake", "lizard"],

  spinnerColor: "#0000FF",
};

const spinthewheel = createSlice({
  name: "spinthewheel",
  initialState,
  reducers: {
    setSpinTheWheelSettings: (_state, action) => {
      return action.payload;
    },
  },
});

export const getSpinTheWheelSettings: (
  state: RootState
) => initialType | null = (state: RootState) => {
  return state.spinthewheel;
};

export const { setSpinTheWheelSettings } = spinthewheel.actions;
export default spinthewheel.reducer;
