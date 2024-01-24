import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface giveawayType {
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
  retryLimit: string;
  couponCode: string;
  type: string;
  duration: string;
  participants: string;
  isSocialMediaShare: boolean;
  numberOfShare: number;
  sharePlatforms: {
    facebook: "";
    instagram: "";
    twitter: "";
  };
  isFollowNow: boolean;
  followPlatforms: {
    facebook: "";
    instagram: "";
    twitter: "";
  };
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

export const GiveawayinitialState: giveawayType = {
  id: "",
  heading: "",
  description: "",
  redirectHeading: "",
  redirectDescription: "",
  gameHeading: "",
  type: "",
  gameDescription: "",
  gameType: "Giveaway",
  retryLimit: "",
  couponCode: "",
  duration: "",
  participants: "",
  isSocialMediaShare: true,
  numberOfShare: 1,
  sharePlatforms: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
  isFollowNow: true,
  followPlatforms: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
  gameStatus: "",
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

const giveawayData = createSlice({
  name: "giveawayData",
  initialState: GiveawayinitialState,
  reducers: {
    setGiveaway: (_state, action) => {
      return action.payload;
    },
  },
});

export const getGiveawayData: (state: RootState) => giveawayType = (
  state: RootState
) => {
  return state.giveawayData;
};
export const { setGiveaway } = giveawayData.actions;
export default giveawayData.reducer;
