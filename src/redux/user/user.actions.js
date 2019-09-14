import UserActionTypes from "./user.types";
import axios from "axios";

export const setCurrentUser = (email, password) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: axios.post("/auth/login", { email, password }).then(res => {
    return res.data;
  })
});

export const registerUser = (email, firstname, lastname, password) => ({
  type: UserActionTypes.REGISTER_USER,
  payload: axios
    .post("/auth/register", {
      email,
      firstname,
      lastname,
      password
    })
    .then(res => {
      return res.data;
    })
});

export const setIsAuthenticated = isAuthenticated => ({
  type: UserActionTypes.SET_IS_AUTHENTICATED,
  payload: isAuthenticated
});

export const logoutCurrentUser = () => ({
  type: UserActionTypes.LOGOUT_CURRENT_USER
});
