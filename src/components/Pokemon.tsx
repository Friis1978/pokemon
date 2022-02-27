import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Pokemon } from "../types/Pokemon";

const Pokemon = ({ pokemon, darkTheme }) => {
  const { name } = pokemon;
  const [poke, setPoke] = useState<Pokemon>();

  useEffect(() => {
    fetchPokemon(name);
  }, []);

  const fetchPokemon = async (name: string) => {
    const pokemons = await fetch("api/pokemon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });
    const res = await pokemons.json();
    setPoke(res.data);
  };

  const GetAllAbilities = (poke: Pokemon) => {
    const allAbilities = poke.abilities.map((val,i) => {
      return (<p key={i} className="text-right">{val.ability.name}</p>);
    });
    return allAbilities
  }

  return (
    <>
      {poke && (
        <div
          key={poke.id}
          className={`flex flex-col max-w-md rounded-xl text-center ${
            !darkTheme ? "bg-white shadow-big" : "bg-dark"
          } h-full justify-between`}
        >
          <div className="flex bg-primary m-5 rounded-lg items-center justify-center">
            <img
              src={poke.sprites.front_default}
              className="object-contain h-48 w-48"
            />
          </div>
          <p className="text-lg font-medium mb-7">{name.toUpperCase()}</p>
          <div className="flex flex-row justify-between text-sm px-5">
            <p className="font-semibold">Height</p>
            <p className="">{poke.height}</p>
          </div>
          <div className="flex flex-row justify-between text-sm px-5">
            <p className="font-semibold">Weight</p>
            <p className="">{poke.weight}</p>
          </div>
          <div className="flex flex-row justify-between text-sm px-5">
            <p className="font-semibold">Abilities</p>
            <div className="flex flex-col">{GetAllAbilities(poke)}</div>
          </div>
          <div className="flex bg-border-gray justify-around rounded-b-lg">
            <button
              onClick={() => {
                Router.push(`/pokemon/${poke.id}`);
              }}
              className="text-primary font-semibold bg-white w-full rounded-bl-lg py-2 border-r-border-gray border-r-small hover:bg-border-gray"
            >
              See Details
            </button>

            <button className="text-delete font-semibold bg-white w-full rounded-br-lg py-2 hover:bg-border-gray">
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Pokemon;
