import React, {useState} from "react";
import "../styles/tailwind.css";
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../lib/apollo";

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout 
          dark={(theme)=>{
            console.log('theme', theme)
            setDarkTheme(theme)
          }}
          currentPath={currentPath}
        >
          <Component {...pageProps} darkTheme={darkTheme} currentPath={(path:string)=>{setCurrentPath(path)}}/>
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
