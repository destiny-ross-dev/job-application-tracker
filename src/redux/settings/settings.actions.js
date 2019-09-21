import SettingsActionTypes from "./settings.types";

export const triggerUserSettings = isOpen => ({
  type: SettingsActionTypes.TRIGGER_USER_SETTINGS,
  payload: isOpen
});

export const triggerMenuExpandCollapse = () => ({
  type: SettingsActionTypes.TRIGGER_MENU_EXPAND_COLLAPSE
});

export const triggerAddObject = isOpen => {
  return {
    type: SettingsActionTypes.TRIGGER_ADD_OBJECT,
    payload: isOpen
  };
};
