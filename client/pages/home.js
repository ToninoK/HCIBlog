import { useEffect } from "react";
import { Loader, Card, Text, Badge, Flex, Grid, Center } from "@mantine/core";
import * as dfs from "date-fns";

import usePosts from "../services/posts/usePosts";

const Home = () => {
  const { posts, postsLoading, getPosts } = usePosts();

  useEffect(() => {
    getPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (postsLoading) {
    return (
      <Grid>
        <Grid.Col span={7}>
          <Center pt="xl">
            <Loader size="lg"/>
          </Center>
        </Grid.Col>
      </Grid>
    )
  }

  return (
    <Grid>
      <Grid.Col span={7}>
        {posts?.data?.map((post) => {
          return (
            <Card shadow="sm" p="lg" mb="xl" radius="md" key={post.id} withBorder>
              <Text weight={700} size="xl">
                {post.title}
              </Text>
              <Text c="dimmed" size="md" mb="md">
                {dfs.format(new Date(post.created_at), "MMMM dd, y")}
              </Text>

              <Text size="sm" mb="md">
                {post.content.summary}
              </Text>

              <Flex jalign="center" direction="row" wrap="wrap" gap="sm">
                {post.tags?.map((tag) => (
                  <Badge variant="light" key={tag}>{`#${tag}`}</Badge>
                ))}
              </Flex>
            </Card>
          );
        })}
      </Grid.Col>
    </Grid>
  );
};

export default Home;
