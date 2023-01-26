import { Grid, Card, Text, Flex, Badge, Alert } from "@mantine/core"
import fuzzysort from "fuzzysort";
import { useRouter } from "next/router";
import { IconZoomExclamation, IconEdit } from "@tabler/icons";
import * as dfs from "date-fns";

import usePosts from "../../services/posts/usePosts"
import { useEffect } from "react";

const Search = () => {
    const router = useRouter();
    const term = router.query.term;
    const { posts, getPosts } = usePosts();
    let searchResult = [];

    useEffect(() => {
        getPosts()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (posts.data?.length > 0) {
        searchResult = fuzzysort.go(term, posts.data, {key: "title"})
    }

    if (searchResult.length === 0) {
        return (
        <Grid>
            <Grid.Col>
                <Flex justify="center">
                    <Alert icon={<IconZoomExclamation size={16} />} title="Nothing here">
                        Sorry, your search came up empty. But hey, at least you&apos;re not a search engine, because that would be really awkward. Better luck next time!
                    </Alert>
                </Flex>
            </Grid.Col>
        </Grid>)
    }

    const handleClickEdit = (postId) => {
        router.push(`/blogs/${postId}`)
    } 

    return (
        <Grid gutter="sm">
            {
                searchResult.map(({ obj }) => (
                    <Grid.Col key={obj.id} sm={6} md={3}>
                        <Card
                            shadow="sm"
                            p="lg"
                            mb="xl"
                            radius="md"
                            withBorder
                            style={{cursor: "pointer"}}
                            onClick={()=>handleClickEdit(obj.id)}
                        >
                            <Flex justify="space-between" direction="row" wrap="wrap">
                                <Flex justify="flex-start" direction="column">
                                    <Text weight={700} size="xl">
                                        {obj.title}
                                    </Text>
                                    <Text c="dimmed" size="md" mb="md">
                                        {dfs.format(new Date(obj.created_at), "MMMM dd, y")}
                                    </Text>

                                    <Flex jalign="center" direction="row" wrap="wrap" gap="sm">
                                        {obj.tags?.map((tag) => (
                                        <Badge variant="light" key={tag}>{`#${tag}`}</Badge>
                                        ))}
                                    </Flex>
                                </Flex>
                                <IconEdit />
                            </Flex>
                        </Card>
                    </Grid.Col>
                )
                )
            }
        </Grid>
    )
}

export default Search;
