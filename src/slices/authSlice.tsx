import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo") || "")
    : null,
  userData: null,
  userVerifyData: {
    email: null,
    otp: null,
  },
  isOtpValid: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state, action) => {
      console.log(action.payload);
      state.userInfo = null;
      sessionStorage.removeItem("userInfo");
    },
    setVerifyData: (state, action) => {
      if (action.payload.email) {
        state.userVerifyData.email = action.payload.email;
      }
      if (action.payload.otp) {
        state.userVerifyData.otp = action.payload.otp;
      }
    },
    setOtp: (state, action) => {
      state.isOtpValid = action.payload;
    },
  },
});
export const getUserInfo = (state: RootState) => {
  return state.auth.userInfo;
};
export const getUserData = (state: RootState) => {
  return state.auth.userData;
};
export const getUserVerifyData = (state: RootState) => {
  return state.auth.userVerifyData;
};
export const { setCredentials, logout, setUserData, setVerifyData, setOtp } =
  authSlice.actions;
export default authSlice.reducer;
