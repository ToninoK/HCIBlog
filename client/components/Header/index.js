import { Title, Input, Header as MantineHeader, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import { IconSearch } from "@tabler/icons";

const Header = () => {
  const router = useRouter();

  return (
    <MantineHeader height="65" p="xs">
      <Flex justify="space-between" align="center" direction="row" wrap="nowrap">
        <Title order={1}>HCIBlog</Title>
        {router.pathname === "/login" ? null :
          <Input
            icon={<IconSearch size={18} />}
            placeholder="Search"
            radius="md"
          />
        }
      </Flex>
    </MantineHeader>
  );
};

export default Header;
