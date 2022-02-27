import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import AccessDenied from "../components/access-denied";
import { AllPokemonsQuery } from "../../graphql/queries";
import { DeletePokemonMutation } from "../../graphql/mutations";

const DeletePokemon = ({ Close, darkTheme, selectedId }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/protected/");
      const json = await res.json();
      if (json) setUser(json.session.user.email);
    };
    fetchData();
  }, []);

  const [deletePokemon, { loading, error }] = useMutation(
    DeletePokemonMutation,
    {
      onCompleted: () => {
        Close();
      },
      refetchQueries: [AllPokemonsQuery, "allPokemonsQuery"],
    }
  );

  const onDelete = async () => {
    const currentUser = user;
    const variables = { id: selectedId, user: currentUser };
    try {
      deletePokemon({ variables })
    } catch (error) {
      console.error(error);
    }
  };

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <AccessDenied darkTheme={darkTheme} />
      </>
    );
  }

  // If session exists, display content
  return (
    <div
      className={`rounded-xl px-20 pb-10 ${
        darkTheme ? "text-white" : "text-dark"
      }`}
    >
      <div className="text-center">
        <Image
          src="/image/stop.png"
          alt=""
          width={180}
          height={180}
          layout="fixed"
        />
      </div>
      <h1 className="text-xl font-semibold text-center mb-3">
        DELETE POKEMON?
      </h1>
      <p className="px-10 text-center mb-20">
        {
          "Are you sure you want to delete the Pokemon from your list? This action is irreversible"
        }
      </p>
      <div className="flex justify-center mt-7 mb-2">
        <button
          onClick={() => onDelete()}
          disabled={loading}
          type="submit"
          className={`font-medium py-2 px-10 rounded-md ${
            darkTheme
              ? "text-white border border-red-700 shadow-small hover:bg-red-700"
              : "text-dark border-2 border-red-700 shadow-small hover:bg-red-700 hover:text-white"
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Exports
export default DeletePokemon;
