import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import spinthewheelSettingsReducer from "./slices/spinthewheel";
import quizRawFormDataReducer from "./slices/quizRawFormData";
import scratchCardDataReducer from "./slices/scratchCard";
import gameTypeReducer from "./slices/gameType";
import allGamesReducer from "./slices/allGames";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    allGames: allGamesReducer,
    spinthewheelData: spinthewheelSettingsReducer,
    scratchCardData: scratchCardDataReducer,
    quizRawFormData: quizRawFormDataReducer,
    gameTypeData: gameTypeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
