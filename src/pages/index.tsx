import React, { useState, useEffect } from "react";
import Head from "next/head";
import Pokemon from "../components/Pokemon";
import { useRouter } from "next/router";

const Home = ({ darkTheme, currentPath }) => {
  const router = useRouter();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    console.log('reload index', router.asPath)
    currentPath(router.asPath)

    const fetchPokemons = async () => {
      const poke = await fetch("api/pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 5 /*name: 'charmander'*/ }),
      });
      const res = await poke.json();
      poke && setPokemons(res.data.results);
    };
    fetchPokemons();
  }, []);

  return (
    <div>
      <Head>
        <title>Pokemons</title>
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
        </div>
      </div>
    </div>
  );
};
export default Home;
