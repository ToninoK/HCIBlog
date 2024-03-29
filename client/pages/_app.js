import { useState } from "react";

import Head from "next/head";
import { MantineProvider, AppShell } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import "../styles/globals.css";
import { Header, Navbar } from "../components";
import PostsProvider from "../services/posts";
import UserProvider from "../services/users";
import { useRouter } from "next/router";
import Login from "./login";
import { pathnameTabName } from "../consts/routes";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Head>
        <title>{pathnameTabName[router.pathname]}</title>
      </Head>
      <UserProvider>
        <PostsProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "dark",
            }}
          >
            <ModalsProvider>
              <NotificationsProvider position="bottom-center">
                {router.pathname === "/login" ? (
                  <Login />
                ) : (
                  <AppShell
                    padding="xl"
                    navbarOffsetBreakpoint="sm"
                    navbar={
                      <Navbar
                        hidden={!opened}
                        onClick={() => setOpened((o) => !o)}
                      />
                    }
                    header={<Header opened={opened} onBurgerClick={setOpened} />}
                    styles={(theme) => ({
                      main: {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                      },
                    })}
                  >
                    <Component {...pageProps} />
                  </AppShell>
                )}
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </PostsProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
