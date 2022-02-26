import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Pokemon } from "../types/Pokemon";


const Pokemon = ({ pokemon, darkTheme }) => {
  const { name } = pokemon;
  const [poke, setPoke] = useState<Pokemon>();
  const [darkBg, setDarkBg] = useState(false);

  useEffect(() => {
    fetchPokemon(name);
  }, []);

  useEffect(() => {
    setDarkBg(!darkBg);
  }, [darkTheme]);

  const fetchPokemon = async (name: string) => {
    const pokemons = await fetch("api/pokemon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });
    const res = await pokemons.json();
    setPoke(res.data);
  };
  return (
    <>
      {poke && (
        <div
          key={poke.id}
          className={`flex flex-col max-w-md rounded-xl text-center ${
            darkBg ? "bg-white shadow-big" : "bg-dark"
          } h-full justify-between`}
        >
          <div className="flex bg-primary m-5 rounded-lg items-center justify-center">
            <img
              src={poke.sprites.front_default}
              className="object-contain h-48 w-48"
            />
          </div>
          <div className="p-5 flex flex-col space-y-2 justify-between">
            <p className="text-lg font-medium">{name}</p>
            <p className="text-sm text-blue-500">{poke.height}</p>
            <p className="text-gray-600">{poke.weight}</p>
          </div>
          <div className="flex bg-border-gray justify-around rounded-b-lg">
              <button onClick={()=>{Router.push(`/pokemon/${poke.id}`)}} className="text-primary font-semibold bg-white w-full rounded-bl-lg py-2 border-r-border-gray border-r-small hover:bg-border-gray">
                See Details
              </button>

            <button className="text-delete font-semibold bg-white w-full rounded-br-lg py-2 hover:bg-border-gray">
              Delete
            </button>
          </div>
        </div>
      )}
    </>
    /*
    <div className="Card">
      {poke ? (
        <>
          <span className="Card--id">#{poke.id}</span>
          <img
            className="Card--image"
            src={poke.sprites.front_default}
            alt={name}
          />
          <h1 className="Card--name">{name}</h1>
          <p className="Card--details">
            {`Height: ${poke.height}`}
          </p>
          <p className="Card--details">
            {`Weight: ${poke.weight}`}
          </p>
          <span className="Card--details">
            {`Types: ${poke.types.map((poke) => poke.type.name).join(", ")}`}
          </span>
        </>
      ) : null}
    </div>
    */
  );
};
export default Pokemon;
