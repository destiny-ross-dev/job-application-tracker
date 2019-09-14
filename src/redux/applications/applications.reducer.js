import ApplicationsActionsTypes from "./applications.types";

const initialState = {
  applicationsList: []
};

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ApplicationsActionTypes}_FULFILLED`:

    default:
      return state;
  }
};

export default applicationsReducer;
