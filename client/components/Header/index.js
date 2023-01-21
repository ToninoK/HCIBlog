import {
  Title,
  Input,
  Header as MantineHeader,
  Flex,
  MediaQuery,
  Burger,
} from "@mantine/core";
import { useRouter } from "next/router";
import { IconSearch } from "@tabler/icons";

const Header = ({ opened, onBurgerClick }) => {
  const router = useRouter();

  return (
    <MantineHeader height="65" p="xs">
      <Flex
        justify="space-between"
        align="center"
        direction="row"
        wrap="nowrap"
      >
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => onBurgerClick((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Title order={1}>HCIBlog</Title>
        </MediaQuery>
        {router.pathname === "/login" ? null : (
          <Input
            icon={<IconSearch size={18} />}
            placeholder="Search"
            radius="md"
          />
        )}
      </Flex>
    </MantineHeader>
  );
};

export default Header;
