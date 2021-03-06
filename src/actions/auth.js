import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  LOGOUT,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  USER_LOADING,
  USER_PROFILE_DATA_LOADED_FAIL,
  USER_PROFILE_DATA_LOADED_SUCCESS,
  USER_PROFILE_DATA_LOADING,
} from "./types";
import axios from "axios";
import {
  activationURL,
  checkAuthenticatedURL,
  loginURL,
  resetPasswordConfirmURL,
  ressetPasswordURL,
  signupURL,
  userLoadURL,
} from "./urls";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(loginURL, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(load_user());
  } catch (err) {
    console.log(err);

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    dispatch({ type: USER_LOADING });
    console.log(config);
    try {
      const res = await axios.get(userLoadURL, config);

      dispatch({ type: USER_LOADED_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: USER_LOADED_FAIL });
    }
  } else {
    dispatch({ type: USER_LOADED_FAIL });
  }
};

export const signup = (name, email, password, re_password) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, re_password });

  try {
    const res = await axios.post(signupURL, body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: SIGNUP_FAIL });
  }
};

export const activation = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    const res = await axios.post(activationURL, body, config);
    dispatch({
      type: ACTIVATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: ACTIVATION_FAIL });
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(checkAuthenticatedURL, body, config);
      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({ type: AUTHENTICATED_FAIL });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTHENTICATED_FAIL });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  try {
    await axios.post(ressetPasswordURL, body, config);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
  }
};

export const reset_password_confirm = (
  uid,
  token,
  new_password,
  re_new_password
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post(resetPasswordConfirmURL, body, config);

    dispatch({
      type: RESET_PASSWORD_CONFIRM_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_CONFIRM_FAIL,
    });
  }
};

export const tokenConfig = (getState) => {
  const token = getState().auth.access;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
