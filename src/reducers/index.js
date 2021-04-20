import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import auth from "./auth";
import shop from "./shop";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/lib/persistStore";

const rootReducer = combineReducers({
  auth,
  shop,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

export const pReducer = persistReducer(persistConfig, rootReducer);
