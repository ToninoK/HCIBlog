import { useRouter } from "next/router";
import { Navbar as MantineNavbar, NavLink, Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";

import { NAVIGATION, NAVIGATION_PROTECTED } from "../../consts/navigation";
import { protectedRoutes } from "../../consts/routes";

const Navbar = ({ hidden, onClick }) => {
  const router = useRouter();

  const handleItemClick = (route) => {
    router.push(route);
    onClick();
  };

  return (
    <MantineNavbar
      width={{ sm: hidden ? 0 : 200, md: 200, lg: 300 }}
      height="93vh"
      hidden={hidden}
    >
      <MantineNavbar.Section grow>
        <Stack justify="center" spacing={0} p="xs">
          {(protectedRoutes.some((item) => router.pathname.startsWith(item))
            ? NAVIGATION_PROTECTED
            : NAVIGATION
          ).map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              icon={<item.icon size={16} stroke={1.5} />}
              onClick={() => handleItemClick(item.route)}
              active={router.pathname === item.route}
              style={{ borderRadius: "8px" }}
            />
          ))}
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section style={{ borderTop: "1px solid #2C2E33" }}>
        <Stack justify="center" spacing={2}>
          {protectedRoutes.includes(router.pathname) ? (
            <NavLink
              icon={<IconArrowLeft size={16} stroke={1.5} />}
              label="Back to blog"
              onClick={() => handleItemClick("/")}
              p="lg"
            />
          ) : (
            <></>
          )}
        </Stack>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
