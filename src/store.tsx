import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import spinthewheelSettingsReducer from "./slices/spinthewheel";
import quizDataReducer from "./slices/quiz";
import scratchCardDataReducer from "./slices/scratchCard";
import gameTypeReducer from "./slices/gameType";
import allGamesReducer from "./slices/allGames";
import puzzleReducer from "./slices/puzzle";
import tictactoeReducer from "./slices/tictactoe";
import giveawayReducer from "./slices/giveaway";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    allGames: allGamesReducer,
    spinthewheelData: spinthewheelSettingsReducer,
    puzzleData: puzzleReducer,
    tictactoeData: tictactoeReducer,
    scratchCardData: scratchCardDataReducer,
    giveawayData: giveawayReducer,
    quizData: quizDataReducer,
    gameTypeData: gameTypeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
