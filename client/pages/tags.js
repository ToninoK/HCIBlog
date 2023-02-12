import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  Loader,
  Badge,
  Flex,
  Grid,
  Center,
  UnstyledButton,
  Title,
} from "@mantine/core";

import usePosts from "../services/posts/usePosts";

const Tags = () => {
  const { tags, tagsLoading, getTags } = usePosts();
  const router = useRouter();

  useEffect(() => {
    getTags();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTagClick = (tag) => {
    router.push(`/home/${tag}`);
  };

  if (tagsLoading) {
    return (
      <Grid>
        <Grid.Col span={7}>
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
        Tags
      </Title>
      <Grid>
        <Grid.Col sm={12} lg={7}>
          <Flex justify="center" gap="lg" wrap="wrap">
            {tags?.map((tag) => {
              return (
                <UnstyledButton
                  key={tag.name}
                  onClick={() => handleTagClick(tag.name)}
                >
                  <Badge size="lg" color="cyan">
                    #{tag.name}
                  </Badge>
                </UnstyledButton>
              );
            })}
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Tags;
