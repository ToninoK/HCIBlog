import { useEffect } from "react";
import { Loader, Grid, Center, MediaQuery } from "@mantine/core";
import { useRouter } from "next/router";

import usePosts from "../../services/posts/usePosts";
import Tags from "../../components/Tags";
import Posts from "../../components/Posts";

const Home = () => {
  const {
    posts,
    postsLoading,
    tagsLoading,
    selectedTags,
    getPosts,
    getTags,
    toggleSelectedTags,
  } = usePosts();

  useEffect(() => {
    getTags();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPosts(selectedTags);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  if (postsLoading || tagsLoading) {
    return (
      <Grid>
        <Grid.Col sm={12} span={7}>
          <Center pt="xl">
            <Loader size="lg" />
          </Center>
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Grid justify="space-between" grow>
      <Grid.Col span={7}>
        <Posts posts={posts} />
      </Grid.Col>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Grid.Col span={4}>
          <Tags />
        </Grid.Col>
      </MediaQuery>
    </Grid>
  );
};

export default Home;
