import React, {useState} from "react";
import "../styles/tailwind.css";
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../lib/apollo";

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [pagination, setPagination] = useState<number>(10);
  const [currentPath, setCurrentPath] = useState("/");
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout 
          pagination={(items:number)=>{setPagination(items)}}
          dark={(theme:boolean)=>{
            setDarkTheme(theme)
          }}
          currentPath={currentPath}
        >
          <Component {...pageProps} darkTheme={darkTheme} pagination={pagination} currentPath={(path:string)=>{setCurrentPath(path)}}/>
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
