import React from "react";
import { Card, Badge, Flex, UnstyledButton, Text } from "@mantine/core";

import usePosts from "../../services/posts/usePosts";

const Tags = ({ onClick = null }) => {
  const { tags, selectedTags, toggleSelectedTags } = usePosts();

  const handleTagClick = (tag) => {
    if (onClick) {
      onClick(tag);
    } else {
      toggleSelectedTags(tag);
    }
  };

  const tagsIds = tags?.filter((tag) => tag.id);

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
        {tags
          ?.filter(
            (el, i, arr) => arr.findIndex((tag) => tag.name === el.name) === i
          )
          ?.map((tag) => {
            return (
              <UnstyledButton
                key={tag.name}
                onClick={() => handleTagClick(tag.name)}
              >
                <Badge
                  size="lg"
                  variant={
                    selectedTags?.includes(tag.name) ? "filled" : "light"
                  }
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
