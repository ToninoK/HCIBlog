import "../styles/globals.css";
import Head from "next/head"
import { MantineProvider } from "@mantine/core";
import { AppShell } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';

import "../styles/globals.css";
import { Header, Navbar } from "../components";
import PostsProvider from "../services/posts";
import { useRouter } from "next/router";
import Login from "./login";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
          <title>
            {
              router.pathname === "/" ?
              "Home" :
              (router.pathname.substring(1))[0].toUpperCase() + router.pathname.substring(2)
            }
          </title>
        </Head>
      <PostsProvider>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "dark",
            }}
          >
          <NotificationsProvider position="bottom-center">
            {router.pathname === '/login' ? <Login /> :<AppShell
              padding="xl"
              navbar={<Navbar />}
              header={<Header />}
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
            </AppShell> }
            
            </NotificationsProvider>
          </MantineProvider>
      </PostsProvider>
    </>
  );
}

export default MyApp;
