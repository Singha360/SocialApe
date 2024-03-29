import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((result) => {
      const FBIdToken = `Bearer ${result.data.token}`;
      localStorage.setItem("IdToken", FBIdToken);
      axios.defaults.headers.common["Authorization"] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => (dispatch) => {
  axios
    .get("./user")
    .then((result) => {
      dispatch({
        type: SET_USER,
        payload: result.data
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
