import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import companySlice from "./companySlice";
import errorSlice from "./errorSlice";
import warehouseSlice from "./warehouseSlice";
import citySlice from "./countrySlice";
import countrySlice from "./countrySlice";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  user: loginReducer,
  userCard: userSlice,
  company: companySlice,
  error: errorSlice,
  warehouse: warehouseSlice,
  country: countrySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
