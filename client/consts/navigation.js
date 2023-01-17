import { IconHome, IconUser, IconHash, IconClock } from "@tabler/icons";

export const NAVIGATION = [
  {
    route: "/home",
    label: "Home",
    icon: IconHome,
  },
  {
    route: "/about",
    label: "About",
    icon: IconUser,
  },
  {
    route: "/tags",
    label: "Tags",
    icon: IconHash,
  },
  {
    route: "/timeline",
    label: "Timeline",
    icon: IconClock,
  },
];

export const NAVIGATION_PROTECTED = [
  {
    route: "/blogs",
    label: "Blogs",
    icon: IconHome,
  },
  {
    route: "/profile",
    label: "Profile",
    icon: IconUser,
  },
];

