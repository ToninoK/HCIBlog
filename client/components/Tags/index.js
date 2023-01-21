import React from "react";
import { Card, Badge, Flex, UnstyledButton, Text } from "@mantine/core";

import usePosts from "../../services/posts/usePosts";

const Tags = () => {
  const { tags, selectedTags, toggleSelectedTags } = usePosts();

  return (
    <Card shadow="sm" p="lg" mb="xl" radius="md" withBorder>
      <Text weight="bold" size="lg" mb="lg">
        Popular tags
      </Text>
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {tags?.map((tag) => {
          return (
            <UnstyledButton
              key={tag.name}
              onClick={() => toggleSelectedTags(tag.name)}
            >
              <Badge
                size="lg"
                color="cyan"
                variant={selectedTags?.includes(tag.name) ? "filled" : "light"}
              >
                #{tag.name}
              </Badge>
            </UnstyledButton>
          );
        })}
      </Flex>
    </Card>
  );
};

export default Tags;
