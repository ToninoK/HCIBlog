import React, { useReducer } from "react";

import api from "../../pages/api/index";
import { getAuthHeader } from "../auth";
import { getQuery } from "../../utils/query";

const DEFAULT_STATE = {
  posts: { data: [], page: null, per_page: null },
  selectedTags: [],
};

export const PostsState = React.createContext({
  state: { ...DEFAULT_STATE },
  getPosts: (_) => null,
  getTags: (_) => null,
  getPost: (postId) => null,
  updatePost: (postId, data) => null,
  createPost: (data) => null,
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
    case "CREATE_POST":
      return {
        ...state,
        creatingPost: true,
        postCreateError: null,
      };
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        creatingPost: false,
        postCreateError: null,
      };
    case "CREATE_POST_FAIL":
      return {
        ...state,
        creatingPost: false,
        postCreateError: action.error,
      };
    case "UPDATE_POST":
      return {
        ...state,
        updatingPost: true,
        postUpdateError: null,
      };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        updatingPost: false,
        postUpdateError: null,
      };
    case "UPDATE_POST_FAIL":
      return {
        ...state,
        updatingPost: false,
        postUpdateError: action.error,
      };
    case "GET_POST":
      return {
        ...state,
        postLoading: true,
        postError: null,
      };
    case "GET_POST_SUCCESS":
      return {
        ...state,
        postLoading: false,
        postError: null,
        post: action.payload,
      };
    case "GET_POST_FAIL":
      return {
        ...state,
        postLoading: false,
        postError: action.error,
      };
    case "DELETE_POST":
      return {
        ...state,
        deletingPost: true,
        postDeleteError: null,
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        deletingPost: false,
        postDeleteError: null,
      };
    case "DELETE_POST_FAIL":
      return {
        ...state,
        deletingPost: false,
        postDeleteError: action.error,
      };
    case "TOGGLE_SELECTED_TAGS":
      return {
        ...state,
        ...(state.selectedTags.includes(action.payload)
          ? {
              selectedTags: state.selectedTags.filter(
                (t) => t !== action.payload
              ),
            }
          : { selectedTags: [...state.selectedTags, action.payload] }),
      };
    default:
      return state;
  }
};

const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, DEFAULT_STATE);

  const getPosts = async (tags = null) => {
    dispatch({ type: "GET_POSTS" });

    const query = getQuery({ tags, sort: "desc" });

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

  const createPost = async (postData) => {
    dispatch({ type: "CREATE_POST" });
    try {
      const { data } = await api.post("/posts", postData, {
        headers: getAuthHeader(),
      });

      dispatch({ type: "CREATE_POST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "CREATE_POST_FAIL", error });
    }
  };

  const updatePost = async (postId, postData) => {
    dispatch({ type: "UPDATE_POST" });

    try {
      const { data } = await api.put(`/posts/${postId}`, postData, {
        headers: getAuthHeader(),
      });

      dispatch({ type: "UPDATE_POST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "UPDATE_POST_FAIL", error });
    }
  };

  const getPost = async (postId) => {
    dispatch({ type: "GET_POST" });

    try {
      const { data } = await api.get(`/posts/${postId}`);

      dispatch({ type: "GET_POST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_POST_FAIL", error });
    }
  };

  const deletePost = async (postId) => {
    dispatch({ type: "DELETE_POST" });

    try {
      const { data } = await api.delete(`/posts/${postId}`, {
        headers: getAuthHeader(),
      });

      dispatch({ type: "DELETE_POST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "DELETE_POST_FAIL", error });
    }
  };
  const toggleSelectedTags = (tag) => {
    dispatch({ type: "TOGGLE_SELECTED_TAGS", payload: tag });
  };

  const value = {
    ...state,
    getPost,
    getPosts,
    getTags,
    deletePost,
    createPost,
    updatePost,
    toggleSelectedTags,
  };

  return <PostsState.Provider value={value}>{children}</PostsState.Provider>;
};

export default PostsProvider;
