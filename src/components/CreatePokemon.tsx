import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AccessDenied from "../components/access-denied";
import { AllPokemonsQuery, CreatePokemonMutation } from "../../graphql/queries";

const CreatePokemon = ({ Close }) => {
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
      reset()  
      setTimeout(() => {
        Close()
      }, 2000); 
    },
    refetchQueries: [
      AllPokemonsQuery,
      'allPokemonsQuery'
    ]
  });

  const onSubmit = async (data) => {
    const { name, weight, height, imageUrl } = data;
    const currentUser = user;
    const variables = { name, weight, height, imageUrl, user:currentUser };
    console.log('variables', variables)
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
        <AccessDenied />
      </>
    );
  }

  // If session exists, display content
  return (
    <div className="rounded-xl p-5">
      <Toaster />
      <h1 className="text-xl font-medium my-5">CREATE A POKEMON</h1>
      <form
        className="grid grid-cols-1 gap-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">
          <span className="inputfield-label">Pokemon Name*</span>
          <input
            placeholder="Name"
            name="name"
            type="text"
            {...register("name", { required: true })}
            className="inputfield"
          />
        </label>
        <label className="block">
          <span className="inputfield-label">Pokemon Height*</span>
          <input
            placeholder="Height"
            {...register("height", { required: true })}
            name="height"
            type="text"
            className="inputfield"
          />
        </label>
        <label className="block">
          <span className="inputfield-label">Pokemon Weight</span>
          <input
            placeholder="Weight"
            {...register("weight", { required: true })}
            name="weight"
            type="text"
            className="inputfield"
          />
        </label>
        <label className="block">
          <span className="inputfield-label">Pokemon image link*</span>
          <input
            placeholder="https://example.com"
            {...register("imageUrl", { required: true })}
            name="imageUrl"
            type="text"
            className="inputfield"
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

// Exports
export default CreatePokemon;
