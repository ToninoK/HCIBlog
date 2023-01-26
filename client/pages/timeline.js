import { useEffect } from "react";
import {
  Loader,
  Card,
  Text,
  MediaQuery,
  Grid,
  Center,
  Title,
  Timeline as MantineTimeline,
} from "@mantine/core";
import * as dfs from "date-fns";

import usePosts from "../services/posts/usePosts";
import Tags from "../components/Tags";

const Timeline = () => {
  const { posts, postsLoading, tagsLoading, selectedTags, getPosts, getTags } =
    usePosts();

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
        <Grid.Col sm={12} md={7}>
          <Center pt="xl">
            <Loader size="lg" />
          </Center>
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <>
      <Title order={1} weight="bold" mb="lg">
        Timeline
      </Title>
      <Grid justify="space-between" grow>
        <Grid.Col span={7}>
          <Card shadow="sm" p="lg" mb="xl" radius="md" withBorder>
            <MantineTimeline
              active={posts?.data?.length - 1}
              bulletSize={20}
              lineWidth={2}
            >
              {posts?.data?.map((post) => {
                return (
                  <MantineTimeline.Item title={post.title} key={post.id}>
                    <Text size="xs" mt={4}>
                      {dfs.format(new Date(post.created_at), "MMMM dd, y")}
                    </Text>
                  </MantineTimeline.Item>
                );
              })}
            </MantineTimeline>
          </Card>
        </Grid.Col>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Grid.Col span={4}>
            <Tags />
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </>
  );
};

export default Timeline;
