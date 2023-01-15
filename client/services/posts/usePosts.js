import { useContext } from "react";
import { PostsState } from ".";

const usePosts = () => {
  return useContext(PostsState);
};

export default usePosts;
