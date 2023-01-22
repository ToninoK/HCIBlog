import {
  Title,
  Input,
  Header as MantineHeader,
  Flex,
  MediaQuery,
  Burger,
  Button,
} from "@mantine/core";
import { useRouter } from "next/router";
import { IconSearch, IconPlus } from "@tabler/icons";

import { isProtectedRoute } from "../../utils/helpers";


const Header = ({ opened, onBurgerClick }) => {
  const router = useRouter();

  const handleClickCreate = () => {
    router.push("/blogs/create")
  }
  const handleSearch = (e) => {
    if (isProtectedRoute(router)) {
      if (e.target.value === "") {
        router.push('/blogs')
      } else {
        router.push(`/find/${e.target.value}`)
      }
    } else {
      if (e.target.value === "") {
        router.push('/home')
      } else {
        router.push(`/search/${e.target.value}`)
      }
    }
  }

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
        <Flex justify="right" gap={20}>
          {
            isProtectedRoute(router) ?
            <Button variant="light" color="blue" radius="md" onClick={handleClickCreate}>
              Create Post <IconPlus size={15} style={{marginLeft: "5px"}}/>
            </Button> : null
          }
          {router.pathname === "/login" ? null :
            <Input
              icon={<IconSearch size={18} />}
              placeholder="Search"
              radius="md"
              onChange={handleSearch}
            />
          }
        </Flex>
      </Flex>
    </MantineHeader>
  );
};

export default Header;
