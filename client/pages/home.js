import { useEffect } from "react";

import usePosts from "../services/posts/usePosts";

const Home = () => {
  const { getPosts } = usePosts();

  useEffect(() => {
    getPosts();
  }, []);

  return <h1>Home</h1>;
};

export default Home;
