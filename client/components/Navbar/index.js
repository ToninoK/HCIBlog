import { Link } from "next";
import { useRouter } from "next/router";
import { Navbar as MantineNavbar, NavLink } from "@mantine/core";

import NAVIGATION from "../../consts/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <MantineNavbar width={{ base: 300 }} height="100vh" p="xs">
      {NAVIGATION.map((item) => (
        <NavLink
          key={item.label}
          label={item.label}
          icon={<item.icon size={16} stroke={1.5} />}
          onClick={() => router.push(item.route)}
          active={router.pathname === item.route}
          style={{ borderRadius: "8px" }}
        />
      ))}
    </MantineNavbar>
  );
};

export default Navbar;
