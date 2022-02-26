import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "./Modal";
import CreatePokemon from "./CreatePokemon";

const Header = ({shiftColor}) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [darkTheme, setDarkTheme] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleToogle = () => {
    setDarkTheme(!darkTheme)
    shiftColor()
  };

  const CreateNew = () => {
    return (
       <Modal
       Close={() => {
        setShowCreate(false)
     }}
     CancelComponent={
        <div className="flex flex-row w-full justify-end">
           <button
            onClick={()=>setShowCreate(false)}
            className="grid w-10 h-10 cursor-pointer rounded-full items-center justify-items-center"
         >
            <Image width={20} height={20} alt="luk" src={'/svg/close.svg'} />
         </button>
        </div>
     }
          ChildComponent={<CreatePokemon Close={()=>setShowCreate(false)}/>}
       />
    );
 };

  return (
    <>
      {showCreate && CreateNew()}
      <nav className={`fixed bg-white ${darkTheme && 'bg-secondary'} flex justify-between shadow-md w-full z-10 px-20`}>
        <Link href="/">
          <a className="inline-flex items-center">
            <p className="hidden md:block">Pokemons</p>
          </a>
        </Link>
        {session?.user ? (
          <div className="flex flex-row items-center">
            <p className="mr-2">
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email ?? session.user.name}</strong>
            </p>
            {session.user.image && (
              <span
                style={{ backgroundImage: `url('${session.user.image}')` }}
                className={"avatar"}
              />
            )}
            <a
              className="text-secondary border border-primary px-4 py-1 ml-2 my-4 rounded-md shadow-md"
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <p>You are not signed in</p>
            <a
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <div className="flex flex-row items-center justify-between text-secondary border border-primary px-4 py-1 ml-2 my-4 rounded-md shadow-md">
                <p className="text-sm font-semibold mr-2">Login</p>
                <svg
                  className="bg-primary fill-current text-white rounded-full"
                  width={25}
                  height={25}
                  viewBox="0 0 1000 1000"
                >
                  <g>
                    <path d="M500,10C228.8,10,10,228.8,10,500c0,271.3,218.8,490,490,490c271.3,0,490-218.8,490-490C990,228.8,771.3,10,500,10z M804.5,822C794,657.5,619,613.8,619,613.8s106.8-71.8,68.3-217c-19.3-75.3-91-131.3-189-131.3c-98,0-169.7,56-189,131.3c-38.5,145.2,68.2,217,68.2,217S202.5,652.3,192,822C109.7,739.7,57.3,626,57.3,500C57.3,255,255,57.3,500,57.3C745,57.3,942.8,255,942.8,500C942.8,626,890.2,739.7,804.5,822z" />
                  </g>
                </svg>
              </div>
            </a>
          </div>
        )}
      </nav>
      <div className="flex flex-row justify-between max-w-6xl mx-auto pt-20">
        <div>
          {session && (
            <div className="text-primary py-2 rounded-lg cursor-pointer" onClick={()=>setShowCreate(true)}>
                <a>
                  <div className="flex flex-row items-center">
                    <svg
                      className="fill-current rounded-full mr-2"
                      width={22}
                      height={22}
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path
                          d="M491.841,156.427c-19.471-45.946-51.936-85.013-92.786-112.637C358.217,16.166,308.893-0.007,256,0
			c-35.254-0.002-68.946,7.18-99.571,20.158C110.484,39.63,71.416,72.093,43.791,112.943C16.167,153.779-0.007,203.104,0,256
			c-0.002,35.255,7.181,68.948,20.159,99.573c19.471,45.946,51.937,85.013,92.786,112.637C153.783,495.834,203.107,512.007,256,512
			c35.253,0.002,68.946-7.18,99.571-20.158c45.945-19.471,85.013-51.935,112.638-92.785C495.834,358.22,512.007,308.894,512,256
			C512.002,220.744,504.819,187.052,491.841,156.427z M460.413,342.257c-16.851,39.781-45.045,73.723-80.476,97.676
			c-35.443,23.953-78.02,37.926-123.936,37.933c-30.619-0.002-59.729-6.218-86.255-17.454
			c-39.781-16.851-73.724-45.044-97.677-80.475C48.114,344.495,34.14,301.917,34.133,256c0.002-30.62,6.219-59.731,17.454-86.257
			c16.851-39.781,45.045-73.724,80.476-97.676C167.506,48.113,210.084,34.14,256,34.133c30.619,0.002,59.729,6.218,86.255,17.454
			c39.781,16.85,73.724,45.044,97.677,80.475c23.953,35.443,37.927,78.02,37.934,123.939
			C477.864,286.62,471.648,315.731,460.413,342.257z"
                        />
                      </g>
                      <g>
                        <path
                          d="M389.594,239.301H272.699V122.406c0-9.222-7.477-16.699-16.699-16.699c-9.222,0-16.699,7.477-16.699,16.699v116.895
			H122.406c-9.222,0-16.699,7.477-16.699,16.699s7.477,16.699,16.699,16.699h116.895v116.895c0,9.222,7.477,16.699,16.699,16.699
			c9.222,0,16.699-7.477,16.699-16.699V272.699h116.895c9.222,0,16.699-7.477,16.699-16.699S398.817,239.301,389.594,239.301z"
                        />
                      </g>
                    </svg>
                    <p className="underline text-sm font-semibold">{"Create Pokemon"}</p>
                  </div>
                </a>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center text-sm">
          <p className="text-gray-700">{'Light Mode'}</p>
          <label className="flex items-center cursor-pointer px-2">
            <div className="relative">
              <input
                id="toogleA"
                type="checkbox"
                className="toggle-checkbox sr-only"
              />

              <div
                className={`line w-8 h-4 rounded-full`}
                onClick={handleToogle}
              ></div>

              <div
                className={`dot absolute w-toogle h-toogle rounded-full border bg-primary left-0.5 top-toogle-padding transition`}
                onClick={handleToogle}
              ></div>
            </div>
          </label>
          <p className="text-gray-400">{'Dark Mode'}</p>
        </div>
      </div>
    </>
  );
};

export default Header;