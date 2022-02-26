import React, {useState} from "react";
import "../styles/tailwind.css";
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../lib/apollo";

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout 
          dark={()=>{
            setDarkTheme(!darkTheme)
          }}
        >
          <Component {...pageProps} darkTheme={()=>{darkTheme}}/>
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
