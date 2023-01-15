import { MantineProvider } from "@mantine/core";
import { AppShell } from "@mantine/core";

import "../styles/globals.css";
import { Header, Navbar } from "../components";
import PostsProvider from "../services/posts";

function MyApp({ Component, pageProps }) {
  return (
    <PostsProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <AppShell
          padding="md"
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
        </AppShell>
      </MantineProvider>
    </PostsProvider>
  );
}

export default MyApp;
