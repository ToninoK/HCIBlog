import {
  Center,
  Loader,
  Grid,
  Card,
  Text,
  Flex,
  Badge,
  Title,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as dfs from "date-fns";

import usePosts from "../../services/posts/usePosts";

function Blogs() {
  const { posts, postsLoading, getPosts } = usePosts();
  const router = useRouter();

  useEffect(() => {
    getPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickEdit = (postId) => {
    router.push(`/blogs/${postId}`);
  };

  if (postsLoading) {
    return (
      <Grid>
        <Grid.Col sm={12} lg={7}>
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
        Blogs
      </Title>
      <Grid>
        <Grid.Col sm={12} lg={7}>
          {posts?.data?.map((post) => {
            return (
              <Card
                shadow="sm"
                p="lg"
                mb="xl"
                radius="md"
                key={post.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleClickEdit(post.id);
                }}
                withBorder
              >
                <Flex justify="space-between" direction="row" wrap="wrap">
                  <Flex justify="flex-start" direction="column">
                    <Text weight={700} size="xl">
                      {post.title}
                    </Text>
                    <Text c="dimmed" size="md" mb="md">
                      {dfs.format(new Date(post.created_at), "MMMM dd, y")}
                    </Text>
                    <Flex jalign="center" direction="row" wrap="wrap" gap="sm">
                      {post.tags?.map((tag) => (
                        <Badge variant="light" key={tag}>{`#${tag}`}</Badge>
                      ))}
                    </Flex>
                  </Flex>
                  <IconEdit />
                </Flex>
              </Card>
            );
          })}
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Blogs;
