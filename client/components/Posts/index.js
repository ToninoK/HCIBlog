import React from "react";
import { Card, Text, Badge, Flex, UnstyledButton } from "@mantine/core";
import * as dfs from "date-fns";
import { useRouter } from "next/router";

const Posts = ({ posts }) => {
  const router = useRouter();

  const handlePostClick = (id) => {
    router.push(`/home/blog/${id}`);
  };

  return (
    <>
      {posts?.data?.map((post) => {
        return (
          <UnstyledButton
            key={post.id}
            onClick={() => handlePostClick(post.id)}
          >
            <Card shadow="sm" p="lg" mb="xl" radius="md" withBorder>
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
          </UnstyledButton>
        );
      })}
    </>
  );
};

export default Posts;
