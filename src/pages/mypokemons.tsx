import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import { useRouter } from "next/router";
import { AllPokemonsQuery } from "../../graphql/queries";
import { Query } from "../types/Pokemon";

const MyPokemons = ({ darkTheme, currentPath }) => {
  const router = useRouter();

  useEffect(() => {
    console.log('reload mypokemons',router.asPath)
    currentPath(router.asPath)
  }, []);

  const allPokemons = useQuery(AllPokemonsQuery, {
    variables: { first: 4 },
  });

  if (allPokemons.loading) return <p>Loading...</p>;
  if (allPokemons.error) return <p>Oh no... {allPokemons.error.message}</p>;

  const { endCursor, hasNextPage } = allPokemons.data.pokemons.pageInfo;

  return (
    <div>
      <Head>
        <title>My Pokemons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-6xl my-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {allPokemons.data?.pokemons.edges.map(({ node }) => (
            <div key={node.id} className="flex w-full h-full">
              <Card
                name={node.name}
                width={node.width}
                height={node.height}
                id={node.id}
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
              allPokemons.fetchMore({
                variables: { after: endCursor },
                updateQuery: (
                  prevResult: Query,
                  { fetchMoreResult }: Query
                ) => {
                  fetchMoreResult.pokemons.edges = [
                    ...prevResult.pokemons.edges,
                    ...fetchMoreResult.pokemons.edges,
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
export default MyPokemons;