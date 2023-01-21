import { useEffect, useState } from "react";
import {
  Loader,
  Card,
  Text,
  Badge,
  Flex,
  Grid,
  Center,
  Title,
  Timeline as MantineTimeline,
} from "@mantine/core";
import * as dfs from "date-fns";

import usePosts from "../services/posts/usePosts";
import Tags from "../components/Tags";

const POSTS = {
  data: [
    {
      id: 3,
      user_id: 1,
      title: "FastAPI Framework",
      content: {
        full: "<h1>FastAPI</h1><p>FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. One of the key features of FastAPI is its ability to automatically generate an OpenAPI documentation and interactive API documentation using the <code>FastAPI</code> class decorators.</p><p>FastAPI is built on top of Starlette for the web parts and Pydantic for the data parts. It is designed to be easy to use and to provide high performance. It has a simple and intuitive interface, and it is easy to learn.</p><p>FastAPI comes with support for dependency injection, asynchronous programming, and many other features. It also has built-in support for authentication, validation, and more.</p><p>FastAPI is a lightweight and efficient framework that is perfect for building small to medium-sized APIs. It is also suitable for building scalable and high-performance microservices.</p><p>You can use any database and any libraries with FastAPI. It is completely independent of the rest of your application.</p><p>FastAPI is compatible with Python 3.6+ and it is distributed under the MIT license.</p><h2>Installing FastAPI</h2><p>Installing FastAPI is easy, simply use pip: <code>pip install fastapi</code></p><h2>Getting Started</h2><p>Here is a simple example of a FastAPI application:</p><p>You can run this application using <code>uvicorn</code>:</p><pre><code>uvicorn main:app --reload</code></pre><p>After running the command you can access the documentation on <code>http://localhost:8000/docs</code></p><h2>Conclusion</h2><p>FastAPI is a powerful and easy-to-use web framework for building APIs. It is based on modern technologies like Starlette and Pydantic, and it provides features like automatic documentation, dependency injection, and more. With its high performance and simple interface, it is a great choice for building small to medium-sized APIs and microservices.</p>",
        summary:
          "FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. One of the key features of FastAPI is its ability to automatically generate an OpenAPI documentation and interactive API documentation using the FastAPI class decorators.",
      },
      tags: ["fastapi", "python", "backend"],
      created_at: "2023-01-17T20:28:55.716160",
      updated_at: "2023-01-21T00:20:14.180915",
    },
  ],
};

const Timeline = () => {
  const { posts, postsLoading, tags, tagsLoading, getPosts, getTags } =
    usePosts();

  const [selectedTags, setSelectedTags] = useState([]);

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
        <Grid.Col span={7}>
          <Center pt="xl">
            <Loader size="lg" />
          </Center>
        </Grid.Col>
      </Grid>
    );
  }

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Grid justify="space-between">
      <Grid.Col span={7}>
        <Title order={1} weight="bold" mb="lg">
          Timeline
        </Title>
        <Card shadow="sm" p="lg" mb="xl" radius="md" withBorder>
          <MantineTimeline active={1} bulletSize={20} lineWidth={2}>
            {posts?.data.map((post) => {
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
      <Grid.Col span={4}>
        <Tags
          tags={tags}
          onClick={handleTagClick}
          selectedTags={selectedTags}
        />
      </Grid.Col>
    </Grid>
  );
};

export default Timeline;
