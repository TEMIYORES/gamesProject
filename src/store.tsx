import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import spinthewheelSettingsReducer from "./slices/spinthewheelSettings";
import spinRawFormDataReducer from "./slices/spinRawFormData";
import quizRawFormDataReducer from "./slices/quizRawFormData";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    spinthewheel: spinthewheelSettingsReducer,
    spinRawFormData: spinRawFormDataReducer,
    quizRawFormData: quizRawFormDataReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
