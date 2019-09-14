import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import settingsReducer from "./settings/settings.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings", "user"]
};

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer
});

export default persistReducer(persistConfig, rootReducer);
