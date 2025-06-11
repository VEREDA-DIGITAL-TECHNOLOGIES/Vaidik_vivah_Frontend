import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/user.reducer";
import connectionSlice from "./Reducers/connection.reducer";
import { apiSlice } from "./Api/apiSlice";
import { persistStore, persistReducer } from "redux-persist";
import { notificationReducer } from "./Reducers/notification.reducers";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "user",
  storage,
  whitelist: [
    "accessToken",
    "refreshToken",
    "user",
    "isPersonalFormFilled",
    "isQualificationFormFilled",
    "isOtherFormFilled",
    "isLocationFormFilled",
    "isImageFormFilled",
  ],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer.reducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userReducer: persistedUserReducer,
    connectionReducer: connectionSlice.reducer,
    notificationReducer: notificationReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
