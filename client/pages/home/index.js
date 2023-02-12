import { useEffect, useState } from "react";
import {
  Loader,
  Grid,
  Center,
  MediaQuery,
  Pagination,
  Group,
  Select,
} from "@mantine/core";

import usePosts from "../../services/posts/usePosts";
import Tags from "../../components/Tags";
import Posts from "../../components/Posts";

const PER_PAGE_DATA = [
  {
    value: 2,
    label: "2",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
];

const Home = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  const { posts, postsLoading, tagsLoading, selectedTags, getTags, getPosts } =
    usePosts();

  useEffect(() => {
    getTags();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPosts(selectedTags, page, perPage);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags, page, perPage]);

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
        <Center>
          <Group>
            <Select
              value={perPage}
              onChange={setPerPage}
              data={PER_PAGE_DATA}
              style={{ width: "70px" }}
            />
            <Pagination page={page} total={3} onChange={setPage} />
          </Group>
        </Center>
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
