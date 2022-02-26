import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import Pokemon from "../components/Pokemon";
import { useRouter } from "next/router";
import { AllLinksQuery } from "../../graphql/queries";

type Query = {
  fetchMoreResult: any;
  links: {
    edges: [
      {
        cursor: string;
        node: any;
      }
    ];
  };
};

const Home = ({ darkTheme }) => {
  const router = useRouter();
  const [pokemons, setPokemons] = useState([]);
  const [links, setLinks] = useState();

  useEffect(() => {
    const refetch =
      router.asPath.split("?")[router.asPath.split("?").length - 1];
    console.log('re', refetch)
    const fetchPokemons = async () => {
      const poke = await fetch("api/pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 10 /*name: 'charmander'*/ }),
      });
      const res = await poke.json();
      poke && setPokemons(res.data.results);
    };
    fetchPokemons();
    if (refetch === "refetch") {
      setTimeout(() => {
        console.log('news')
        allLinks.refetch();
      }, 2000);
    }
  }, []);

  const allLinks = useQuery(AllLinksQuery, {
    variables: { first: 4 },
  });

  useEffect(() => {
    console.log("new query", allLinks.data);
    allLinks.data && setLinks(allLinks.data);
  }, [allLinks.loading]);

  useEffect(() => {
    console.log("new links created", allLinks.data);
  }, [links]);

  if (allLinks.loading) return <p>Loading...</p>;
  if (allLinks.error) return <p>Oh no... {allLinks.error.message}</p>;

  const { endCursor, hasNextPage } = allLinks.data.links.pageInfo;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-6xl my-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {pokemons &&
            pokemons.map((pokemon) => (
              <Pokemon
                pokemon={pokemon}
                key={pokemon.name}
                darkTheme={darkTheme}
              />
            ))}
          {allLinks.data?.links.edges.map(({ node }) => (
            <div key={node.id} className="flex w-full h-full">
              <Card
                title={node.title}
                category={node.category}
                url={node.url}
                id={node.id}
                description={node.description}
                imageUrl={node.imageUrl}
                darkTheme={darkTheme}
              />
            </div>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              allLinks.fetchMore({
                variables: { after: endCursor },
                updateQuery: (
                  prevResult: Query,
                  { fetchMoreResult }: Query
                ) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You've reached the end!{" "}
          </p>
        )}
      </div>
    </div>
  );
};
export default Home;
