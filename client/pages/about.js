import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Flex,
  Grid,
  Title,
  Avatar,
  ActionIcon,
  TypographyStylesProvider,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons";

import useUser from "../services/users/useUser";

const About = () => {
  const { user, userLoading, getUser } = useUser();

  useEffect(() => {
    getUser("nickarmie@gmail.com");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("nesto", user);

  return (
    <>
      <Title order={1} weight="bold" mb="lg">
        About
      </Title>
      <Grid justify="space-between">
        <Grid.Col span={7}>
          <Card shadow="sm" p="lg" radius="md" withBorder mb="lg">
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: user?.description }} />
            </TypographyStylesProvider>
          </Card>
          <Flex direction="row" align="center" gap="lg">
            <a target="_blank" href={user?.facebook} rel="noreferrer">
              <ActionIcon variant="default">
                <IconBrandFacebook size={28} />
              </ActionIcon>
            </a>
            <a target="_blank" href={user?.instagram} rel="noreferrer">
              <ActionIcon variant="default">
                <IconBrandInstagram size={28} />
              </ActionIcon>
            </a>
            <a target="_blank" href={user?.linkedin} rel="noreferrer">
              <ActionIcon variant="default">
                <IconBrandLinkedin size={28} />
              </ActionIcon>
            </a>
            <a target="_blank" href={user?.github} rel="noreferrer">
              <ActionIcon variant="default">
                <IconBrandGithub size={28} />
              </ActionIcon>
            </a>
          </Flex>
        </Grid.Col>
        <Grid.Col span={2}>
          <Avatar src={user?.profile} mb="lg" size={128} />
          <Text
            size="lg"
            weight="bold"
          >{`${user?.first_name} ${user?.last_name}`}</Text>
          <Text size="md" c="dimmed">
            {user?.email}
          </Text>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default About;
