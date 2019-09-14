import SettingsUserTypes from "./settings.types";

const initialState = {
  menuExpanded: true,
  userSettingsOpen: false
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SettingsUserTypes.TRIGGER_USER_SETTINGS:
      return {
        ...state,
        userSettingsOpen: action.payload
      };
    case SettingsUserTypes.TRIGGER_MENU_EXPAND_COLLAPSE:
      return {
        ...state,
        menuExpanded: !state.menuExpanded
      };
    // something
    default:
      return state;
  }
};

export default settingsReducer;
