import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pokemon } from "../../types/Pokemon";
import loadConfig from "next/dist/server/config";

const Pokemon = ({ darkTheme }) => {
  const router = useRouter();
  const [poke, setPoke] = useState<Pokemon>();
  const [darkBg, setDarkBg] = useState(false);

  useEffect(() => {
    const id = router.asPath.split('/')[router.asPath.split('/').length-1]
    console.log('router id',id)
    // browser reloaded
    if(id === '[id]'){
      const lastSeen = localStorage.getItem('pokemonLastSeen')
      const pokemonObject = JSON.parse(lastSeen)
      pokemonObject && setPoke(pokemonObject);
    } else {
      const path = router.asPath.split('/')[0]
      fetchPokemon(path,id);
    }   
  }, []);

  useEffect(() => {
    setDarkBg(!darkBg);
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem('pokemonLastSeen', JSON.stringify(poke))
  }, [poke]);

  const fetchPokemon = async (path: string, id: string) => {
    const pokemons = await fetch(`${path}/api/pokemon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    const res = await pokemons.json();
    setPoke(res.data);
  };

  const Loading = () => {
    return (
      <>
        <div>
          <p>Please wait, page is loading</p>
        </div>
      </>
    )
  }

  return (
    <>
      {poke ? (<p>{poke.name}</p>): Loading()}
    </>
  );
};
export default Pokemon;
