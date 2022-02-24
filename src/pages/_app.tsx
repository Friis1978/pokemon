
import "../styles/tailwind.css";
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../lib/apollo";

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
