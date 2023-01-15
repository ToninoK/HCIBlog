import React, { useReducer } from "react";
import api from "../../pages/api/index";

export const PostsState = React.createContext({
  state: { posts: null },
  getPosts: (_) => null,
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
    default:
      return state;
  }
};

const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, {});

  const getPosts = async (tags = null) => {
    dispatch({ type: "GET_POSTS" });
    try {
      const { data } = await api.get(tags ? `/posts?tags=${tags}` : "/posts");

      dispatch({ type: "GET_POSTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_POSTS_FAIL", error });
    }
  };

  const value = {
    ...state,
    getPosts,
  };

  return <PostsState.Provider value={value}>{children}</PostsState.Provider>;
};

export default PostsProvider;
