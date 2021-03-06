import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import MyPokemon from "../components/MyPokemon";
import { useRouter } from "next/router";
import { AllPokemonsQuery } from "../../graphql/queries";
import { Query } from "../types/Pokemon";
import AccessDenied from "../components/access-denied";
import { useSession } from "next-auth/react";

const MyPokemons = ({ darkTheme, currentPath, pagination }) => {
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    currentPath(router.asPath)
  }, []);

  useEffect(() => {
    allPokemons.refetch({ first: pagination })
  }, [pagination]);

  const allPokemons = useQuery(AllPokemonsQuery, {
    variables: { first: pagination },
  });

  if (allPokemons.loading) return <p className="text-xl text-center">Loading...</p>;
  if (allPokemons.error) return <p>Oh no... {allPokemons.error.message}</p>;

  const { endCursor, hasNextPage } = allPokemons.data.pokemons.pageInfo;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <AccessDenied darkTheme={darkTheme} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>My Pokemons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`container mx-auto max-w-6xl my-5 ${darkTheme ? 'bg-secondary':'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-10">
          {allPokemons.data?.pokemons.edges.map(({ node }) => {
            return(
            <div key={node.id} className="flex w-full h-full">
              <MyPokemon
                name={node.name}
                weight={node.weight}
                height={node.height}
                id={node.id}
                imageUrl={node.imageUrl}
                darkTheme={darkTheme}
              />
            </div>
          )})}
        </div>
        <div className={`flex justify-center`}>
        {hasNextPage ? (  
          <button
            className={`px-4 py-2 rounded my-10 mx-10 ${darkTheme ? 'bg-white text-primary':'bg-primary text-white'}`}
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
          
        ) : null}
        </div>
      </div>
    </>
  );
};
export default MyPokemons;