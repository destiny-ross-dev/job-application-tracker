import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import settingsReducer from "./settings/settings.reducer";
import applicationsReducer from "./applications/applications.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings", "user", "applications"]
};

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  applications: applicationsReducer
});

export default persistReducer(persistConfig, rootReducer);
