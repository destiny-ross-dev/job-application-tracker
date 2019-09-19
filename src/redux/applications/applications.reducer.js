import ApplicationsActionTypes from "./applications.types";

const initialState = {
  applicationsList: [],
  recentApplications: [],
  stats: {}
};

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ApplicationsActionTypes.GET_MOST_RECENT_APPLICATIONS}_FULFILLED`:
      return {
        ...state,
        recentApplications: action.payload.mostRecent
      };
    case `${ApplicationsActionTypes.GET_STATS_FOR_DASH}_FULFILLED`:
      return {
        ...state,
        stats: action.payload
      };

    default:
      return state;
  }
};

export default applicationsReducer;
