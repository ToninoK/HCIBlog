import React, { useReducer } from "react";

import api from "../../pages/api/index";
import { getQuery } from "../../utils/query";

export const PostsState = React.createContext({
  state: { posts: null },
  getPosts: (_) => null,
  getTags: (_) => null,
});

const postsReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        postsLoading: true,
        postsError: null,
      };
    case "GET_POSTS_SUCCESS":
      return {
        ...state,
        postsLoading: false,
        postsError: null,
        posts: action.payload,
      };
    case "GET_POSTS_FAIL":
      return {
        ...state,
        postsLoading: false,
        postsError: action.error,
      };
    case "GET_TAGS":
      return {
        ...state,
        tagsLoading: true,
        tagsError: null,
      };
    case "GET_TAGS_SUCCESS":
      return {
        ...state,
        tagsLoading: false,
        tagsError: null,
        tags: action.payload,
      };
    case "GET_TAGS_FAIL":
      return {
        ...state,
        tagsLoading: false,
        tagsError: action.error,
      };
    default:
      return state;
  }
};

const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, {});

  const getPosts = async (tags = null) => {
    dispatch({ type: "GET_POSTS" });

    const query = getQuery({ tags });

    try {
      const { data } = await api.get(`/posts${query}`);

      dispatch({ type: "GET_POSTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_POSTS_FAIL", error });
    }
  };

  const getTags = async () => {
    dispatch({ type: "GET_TAGS" });
    try {
      const { data } = await api.get("/tags");

      dispatch({ type: "GET_TAGS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_TAGS_FAIL", error });
    }
  };

  const value = {
    ...state,
    getPosts,
    getTags,
  };

  return <PostsState.Provider value={value}>{children}</PostsState.Provider>;
};

export default PostsProvider;
