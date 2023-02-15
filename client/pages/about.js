import { useEffect } from "react";
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

  return (
    <>
      <Title weight="bold" mb="lg">
        About
      </Title>
      <Grid justify="space-between">
        <Grid.Col order={2} md={8} lg={6} sm={12}>
          <Card shadow="sm" p="lg" radius="md" withBorder mb="lg">
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: user?.description }} />
            </TypographyStylesProvider>
          </Card>
          <Flex direction="row" align="center" gap="lg">
            <a target="_blank" href={user?.facebook} rel="noreferrer">
              <ActionIcon variant="default" size="xl">
                <IconBrandFacebook size={34} />
              </ActionIcon>
            </a>
            <a target="_blank" href={user?.instagram} rel="noreferrer">
              <ActionIcon variant="default" size="xl">
                <IconBrandInstagram size={34} />
              </ActionIcon>
            </a>
            <a target="_blank" href={user?.linkedin} rel="noreferrer">
              <ActionIcon variant="default" size="xl">
                <IconBrandLinkedin size={34} />
              </ActionIcon>
            </a>
            <a target="_blank" href={user?.github} rel="noreferrer">
              <ActionIcon variant="default" size="xl">
                <IconBrandGithub size={34} />
              </ActionIcon>
            </a>
          </Flex>
        </Grid.Col>
        <Grid.Col
          order={1}
          orderLg={2}
          orderMd={2}
          orderSm={1}
          md={3}
          lg={3}
          sm={12}
        >
          <Avatar
            src={user?.profile && `data:image/png;base64, ${user?.profile}`}
            mb="lg"
            size={200}
            mr="lg"
          />

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
