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
  redirectBackground: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  selectType: string;
  type: {
    userGenerated: {
      uploadType: string;
      buttonText: string;
      buttonColor: string;
      afterHeading: string;
      afterDescription: string;
      uploadImage: {
        imgName: string;
        imgUrl: string;
        color: string;
      };
    };
    auto: {
      type: string;
      codeBackground: {
        imgName: string;
        imgUrl: string;
        color: string;
      };
      mobileBackground: {
        imgName: string;
        imgUrl: string;
        color: string;
      };
      enableCopy: boolean;
      enableDownload: boolean;
      enableShare: boolean;
    };
    manual: {
      type: string;
      codes: {
        label: string;
        text: string;
        value: string;
        probability: number;
      }[];
      codeBackground: {
        imgName: string;
        imgUrl: string;
        color: string;
      };
      mobileBackground: {
        imgName: string;
        imgUrl: string;
        color: string;
      };
      enableCopy: boolean;
      enableDownload: boolean;
      enableShare: boolean;
    };
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
  duration: {
    startDate: string;
    endDate: string;
  };
  participants: string;
  enableSocialShare: boolean;
  numberOfShare: string;
  sharePlatforms: {
    facebook: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    whatsapp: string;
    messenger: string;
  };
  enableFollowNow: boolean;
  followPlatforms: {
    facebook: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    whatsapp: string;
    messenger: string;
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
  gameDescription: "",
  gameType: "Giveaway",
  gameStatus: "not published",
  background: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  selectType: "Auto",
  type: {
    userGenerated: {
      uploadType: "",
      buttonText: "",
      buttonColor: "",
      afterHeading: "",
      afterDescription: "",
      uploadImage: {
        imgName: "",
        imgUrl: "",
        color: "",
      },
    },
    auto: {
      type: "",
      codeBackground: {
        imgName: "",
        imgUrl: "",
        color: "",
      },
      mobileBackground: {
        imgName: "",
        imgUrl: "",
        color: "",
      },
      enableCopy: true,
      enableDownload: true,
      enableShare: true,
    },
    manual: {
      type: "",
      codes: [
        {
          label: "Code 1",
          text: "",
          value: "",
          probability: 100,
        },
      ],
      codeBackground: {
        imgName: "",
        imgUrl: "",
        color: "",
      },
      mobileBackground: {
        imgName: "",
        imgUrl: "",
        color: "",
      },
      enableCopy: true,
      enableDownload: true,
      enableShare: true,
    },
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
  duration: {
    startDate: "",
    endDate: "",
  },
  participants: "",
  enableSocialShare: true,
  numberOfShare: "",
  sharePlatforms: {
    facebook: "",
    instagram: "",
    tiktok: "",
    twitter: "",
    whatsapp: "",
    messenger: "",
  },
  enableFollowNow: true,
  followPlatforms: {
    facebook: "",
    instagram: "",
    tiktok: "",
    twitter: "",
    whatsapp: "",
    messenger: "",
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
