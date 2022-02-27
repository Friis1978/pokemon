import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AccessDenied from "../components/access-denied";
import Router from "next/router";
import { AllPokemonsQuery } from "../../graphql/queries";
import { CreatePokemonMutation } from "../../graphql/mutations";

export default function CreatePokemon({darkTheme}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const [createPokemon, { loading, error }] = useMutation(CreatePokemonMutation, {
    onCompleted: () => { 
      Router.push('/',{ query: 'refetch'})
      reset()   
    },
    refetchQueries: [
      AllPokemonsQuery,
      'allPokemonsQuery'
    ]
  });

  const onSubmit = async (data) => {
    const { name, width, height, imageUrl } = data;
    const currentUser = user;
    const variables = { name, width, height, imageUrl, user:currentUser };
    try {
      toast.promise(createPokemon({ variables }), {
        loading: "Creating new pokemon..",
        success: "Pokemon successfully created!🎉",
        error: `Something went wrong 😥 Please try again -  ${error}`,
      });
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
    <div className="container mx-auto max-w-md py-12">
      <Toaster />
      <h1 className="text-3xl font-medium my-5">Create a new pokemon</h1>
      <form
        className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            placeholder="Name"
            name="name"
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Height</span>
          <input
            placeholder="Height"
            {...register("height", { required: true })}
            name="height"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Width</span>
          <input
            placeholder="Width"
            {...register("width", { required: true })}
            name="width"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Image Url</span>
          <input
            placeholder="https://example.com"
            {...register("imageUrl", { required: true })}
            name="imageUrl"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 animate-spin mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Creating...
            </span>
          ) : (
            <span>Create Link</span>
          )}
        </button>
      </form>
    </div>
  );
}
