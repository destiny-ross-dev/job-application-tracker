import ApplicationsActionTypes from "./applications.types";

const initialState = {
  applicationsList: [],
  recentApplications: []
};

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ApplicationsActionTypes.GET_MOST_RECENT_APPLICATIONS}_FULFILLED`:
      return {
        ...state,
        recentApplications: action.payload.mostRecent
      };

    default:
      return state;
  }
};

export default applicationsReducer;
