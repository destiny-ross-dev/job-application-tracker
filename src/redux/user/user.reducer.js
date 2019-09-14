import UserActionTypes from "./user.types";

const initialState = {
  currentUser: {
    firstname: "Destiny",
    lastname: "Ross",
    email: "destinyleaross@gmail.com",
    sub: "google-oauth2|116231452945390881202",
    picture:
      "https://vignette.wikia.nocookie.net/gameofthrones/images/a/ab/Arya-Stark.jpg/revision/latest?cb=20160918165450&path-prefix=tr"
  },
  error: null,
  isAuthenticated: true,
  token: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${UserActionTypes.SET_CURRENT_USER}_FULFILLED`:
      return {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token
      };
    case `${UserActionTypes.REGISTER_USER}_FULFILLED`:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      };
    // something
    case UserActionTypes.SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };

    case UserActionTypes.LOGOUT_CURRENT_USER:
      return {
        ...state,
        currentUser: {},
        isAuthenticated: false,
        token: ""
      };
    default:
      return state;
  }
};

export default userReducer;
