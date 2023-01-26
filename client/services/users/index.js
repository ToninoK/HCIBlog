import React, { useReducer } from "react";

import api from "../../pages/api/index";
import { getAuthHeader } from "../auth";

const DEFAULT_STATE = {
  user: null,
};

export const UserState = React.createContext({
  state: { ...DEFAULT_STATE },
  getUser: (email) => null,
  updateUser: (id, data) => null,
});

const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        userLoading: true,
        userError: null,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        userLoading: false,
        userError: null,
        user: action.payload,
      };
    case "GET_USER_FAIL":
      return {
        ...state,
        userLoading: false,
        userError: action.error,
      };
    case "UPDATE_USER":
      return {
        ...state,
        updatingUser: true,
        userUpdateError: null,
    };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        updatingUser: false,
        userUpdateError: null,
        user: action.payload,
    };
    case "UPDATE_USER_FAIL":
      return {
        ...state,
        updatingUser: false,
        userUpdateError: action.error,
    };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, DEFAULT_STATE);

  const getUser = async (email) => {
    dispatch({ type: "GET_USER" });

    try {
      const { data } = await api.get(`/users/${email}/about`);

      dispatch({ type: "GET_USER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_USER_FAIL", error });
    }
  };

  const updateUser = async (id, payload) => {
    dispatch({ type: "UPDATE_USER" });

    try {
      const { data } = await api.put(`/users/${id}`, payload, {headers: getAuthHeader()});

      dispatch({ type: "UPDATE_USER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "UPDATE_USER_FAIL", error });
    }
  };

  const value = {
    ...state,
    getUser,
    updateUser
  };

  return <UserState.Provider value={value}>{children}</UserState.Provider>;
};

export default UserProvider;
