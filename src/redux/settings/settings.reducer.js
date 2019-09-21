import SettingsActionTypes from "./settings.types";

const initialState = {
  menuExpanded: true,
  userSettingsOpen: false,
  addObjectOpen: false
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SettingsActionTypes.TRIGGER_USER_SETTINGS:
      return {
        ...state,
        userSettingsOpen: action.payload
      };
    case SettingsActionTypes.TRIGGER_MENU_EXPAND_COLLAPSE:
      return {
        ...state,
        menuExpanded: !state.menuExpanded
      };
    case SettingsActionTypes.TRIGGER_ADD_OBJECT:
      return {
        ...state,
        addObjectOpen: action.payload
      };
    // something
    default:
      return state;
  }
};

export default settingsReducer;
