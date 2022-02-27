import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { DeletePokemonMutation } from "../../graphql/mutations";
import { AllPokemonsQuery } from "../../graphql/queries";
import DeletePokemon from "./DeletePokemon";
import Modal from "./Modal";

const Card = ({ imageUrl, name, width, height, id, darkTheme }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/protected/");
      const json = await res.json();
      if (json) setUser(json.session.user.email);
    };
    fetchData();
  }, []);

  const Delete = () => {
    return (
      <Modal
        darkTheme={darkTheme}
        Close={() => {
          setShowDelete(false);
        }}
        CancelComponent={
          <div
            className={`flex flex-row w-full justify-end ${
              darkTheme ? "text-white" : "text-dark"
            }`}
          >
            <button
              onClick={() => setShowDelete(false)}
              className="grid w-10 h-10 cursor-pointer rounded-full items-center justify-items-center"
            >
              <svg
                className="fill-current"
                width="19"
                height="19"
                viewBox="0 0 19 19"
              >
                <path d="M15.0417 5.07459L13.9255 3.95834L9.50004 8.38376L5.07462 3.95834L3.95837 5.07459L8.38379 9.50001L3.95837 13.9254L5.07462 15.0417L9.50004 10.6163L13.9255 15.0417L15.0417 13.9254L10.6163 9.50001L15.0417 5.07459Z" />
              </svg>
            </button>
          </div>
        }
        ChildComponent={
          <DeletePokemon
            selectedId={selectedId}
            Close={() => setShowDelete(false)}
            darkTheme={darkTheme}
          />
        }
      />
    );
  };

  return (
    <div
      key={id}
      className={`flex flex-col max-w-md rounded-xl text-center ${
        !darkTheme ? "bg-white shadow-big" : "bg-dark"
      } h-full justify-between`}
    >
      <div className="flex bg-primary m-5 rounded-lg items-center justify-center">
        <img src={imageUrl} className="object-contain h-48 w-48" />
      </div>
      <p className="text-lg font-medium mb-7">{name.toUpperCase()}</p>
      <div className="flex flex-row justify-between text-sm px-5">
        <p className="font-semibold">Height</p>
        <p className="">{height}</p>
      </div>
      <div className="flex flex-row justify-between text-sm px-5">
        <p className="font-semibold">Weight</p>
        <p className="">{width}</p>
      </div>
      <div className="flex bg-border-gray justify-around rounded-b-lg">
        <button className="text-primary font-semibold bg-white w-full rounded-bl-lg py-2 border-r-border-gray border-r-small hover:bg-border-gray">
          See Details
        </button>
        <button
          onClick={() => {
            setShowDelete(!showDelete);
            setSelectedId(id);
          }}
          className="text-delete font-semibold bg-white w-full rounded-br-lg py-2 hover:bg-border-gray"
        >
          Delete
        </button>
      </div>
      {showDelete && Delete()}
    </div>
  );
};
export default Card;
