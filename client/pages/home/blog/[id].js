import { useEffect } from "react";
import {
  Loader,
  Grid,
  Center,
  MediaQuery,
  Card,
  Text,
  TypographyStylesProvider,
  UnstyledButton,
  SimpleGrid,
} from "@mantine/core";
import { useRouter } from "next/router";
import * as dfs from "date-fns";
import { DOMParser } from "xmldom";

import usePosts from "../../../services/posts/usePosts";
import Tags from "../../../components/Tags";

const getTitles = (htmlString) => {
  if (!htmlString) return null;

  const html = new DOMParser().parseFromString(htmlString, "text/html");

  const titlesH1 = html.getElementsByTagName("h1");
  const titlesH2 = html.getElementsByTagName("h2");

  const titles = [
    ...Array.prototype.slice.call(titlesH1),
    ...Array.prototype.slice.call(titlesH2),
  ];

  const titlesText = [];

  for (const title of titles) {
    titlesText.push(title.firstChild.data);
  }

  return titlesText;
};

const Blog = () => {
  const { post, posts, postLoading, tagsLoading, getPosts, getPost, getTags } =
    usePosts();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getTags();
    getPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPost(id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleTagClick = (tag) => {
    router.push(`/home/${tag}`);
  };

  const handlePostClick = (postId) => {
    router.push(`/home/blog/${postId}`);
  };

  if (postLoading || tagsLoading) {
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
      <Grid.Col span={7} mb="lg">
        <Card shadow="sm" p="lg" mb="xl" radius="md" withBorder>
          <Text weight={700} size="xl">
            {post?.title}
          </Text>
          <Text c="dimmed" size="md" mb="md">
            {post?.created_at &&
              dfs.format(new Date(post?.created_at), "MMMM dd, y")}
          </Text>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: post?.content.full }} />
          </TypographyStylesProvider>
        </Card>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 1096, cols: 1, spacing: "sm" }]}
        >
          {!!posts &&
            posts?.data
              ?.filter((p) => p.id !== post?.id)
              .slice(0, 2)
              .map((post) => (
                <UnstyledButton
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                >
                  <Card
                    shadow="sm"
                    p="lg"
                    mb="lg"
                    radius="md"
                    withBorder
                    style={{ height: "160px" }}
                  >
                    <Text weight={700} size="xl" mb="md">
                      {post?.title}
                    </Text>
                    <Text c="dimmed" size="md" mb="md">
                      {post?.created_at &&
                        dfs.format(new Date(post?.created_at), "MMMM dd, y")}
                    </Text>
                  </Card>
                </UnstyledButton>
              ))}
        </SimpleGrid>
      </Grid.Col>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Grid.Col span={4}>
          <Tags onClick={handleTagClick} />
          <Card shadow="sm" p="lg" mb="xl" radius="md" withBorder>
            <Text weight="bold" size="lg" mb="lg">
              Table of contents
            </Text>
            {!!post &&
              getTitles(post?.content.full).map((title) => (
                <Text fw={500} size="md" mb="sm" key={title}>
                  {title}
                </Text>
              ))}
          </Card>
        </Grid.Col>
      </MediaQuery>
    </Grid>
  );
};

export default Blog;
