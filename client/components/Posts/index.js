import React from "react";
import { Card, Text, Badge, Flex } from "@mantine/core";
import * as dfs from "date-fns";

const Posts = ({ posts }) => {
  return (
    <>
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
    </>
  );
};

export default Posts;
