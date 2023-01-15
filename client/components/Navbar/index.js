import { Link } from "next";
import { useRouter } from "next/router";
import { Navbar as MantineNavbar, NavLink, Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons"

import { NAVIGATION, NAVIGATION_PROTECTED} from "../../consts/navigation";
import { protectedRoutes } from "../../consts/routes";

const Navbar = () => {
  const router = useRouter();

  return (
    <MantineNavbar width={{ base: 300 }} height="93vh">
      <MantineNavbar.Section grow>
        <Stack justify="center" spacing={0} p="xs">
            {(
                protectedRoutes.includes(router.pathname) ? 
                NAVIGATION_PROTECTED : 
                NAVIGATION
            ).map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                icon={<item.icon size={16} stroke={1.5} />}
                onClick={() => router.push(item.route)}
                active={router.pathname === item.route}
                style={{ borderRadius: "8px" }}
              />
          ))}
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section style={{borderTop: "1px solid #2C2E33"}}>
        <Stack justify="center" spacing={2}>
          {
            protectedRoutes.includes(router.pathname) ?
            <NavLink 
              icon={<IconArrowLeft size={16} stroke={1.5} />}
              label="Back to blog"
              onClick={() => router.push("/")}
              p="lg"
            /> :
            <></>
          }

        </Stack>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
