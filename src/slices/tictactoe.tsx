import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface tictactoeType {
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
  gameBackground: string;
  gridColor: string;
  oColor: string;
  xColor: string;
  winSound: {
    id: number | null;
    name: string;
    url: string;
  };
  loseSound: {
    id: number | null;
    name: string;
    url: string;
  };
  prizeWon: string;
  retryLimit: string;
  couponCode: string;
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

  fields: string[];
  createDate: string;
}
export interface Sound {
  id: number | null;
  name: string;
  url: string;
}

export const TictactoeinitialState: tictactoeType = {
  id: "",
  heading: "",
  description: "",
  redirectHeading: "",
  redirectDescription: "",
  gameHeading: "",
  gameDescription: "",
  gameType: "Tic tac toe",
  prizeWon: "",
  gameBackground: "",
  gridColor: "",
  oColor: "",
  xColor: "",
  winSound: {
    id: null,
    name: "",
    url: "",
  },
 loseSound: {
    id: null,
    name: "",
    url: "",
  },
  retryLimit: "",
  couponCode: "",
  gameStatus: "not published",
  priceWon: "",
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

const tictactoeData = createSlice({
  name: "TictactoeData",
  initialState: TictactoeinitialState,
  reducers: {
    setTictactoe: (_state, action) => {
      return action.payload;
    },
  },
});

export const getTictactoeData: (state: RootState) => tictactoeType = (
  state: RootState
) => {
  return state.tictactoeData;
};
export const { setTictactoe } = tictactoeData.actions;
export default tictactoeData.reducer;
