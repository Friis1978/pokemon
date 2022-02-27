import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

// Components
import Modal from "./Modal";
import CreatePokemon from "./CreatePokemon";

const Header = ({ shiftColor, currentPath, pagination }) => {
  const { data: session } = useSession();
  const [selectedPagination, setSelectedPagination] = useState(10);
  const [showPaginationSelectlist, setShowPaginationSelectlist] =
    useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [path, setPath] = useState("/");

  const paginationNumbers = [10, 20, 50];

  const handleToogle = () => {
    setDarkTheme(!darkTheme);
    shiftColor(!darkTheme);
  };

  useEffect(() => {
    setPath(currentPath);
  }, [currentPath]);

  useEffect(() => {
    pagination(selectedPagination);
  }, [selectedPagination]);

  const CreateNew = () => {
    return (
      <Modal
        darkTheme={darkTheme}
        Close={() => {
          setShowCreate(false);
        }}
        CancelComponent={
          <div
            className={`flex flex-row w-full justify-end ${
              darkTheme ? "text-white" : "text-dark"
            }`}
          >
            <button
              onClick={() => setShowCreate(false)}
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
          <CreatePokemon
            Close={() => setShowCreate(false)}
            darkTheme={darkTheme}
          />
        }
      />
    );
  };

  const CreateView = () => {
    return (
      <div
        className={`py-2 rounded-lg cursor-pointer ${
          darkTheme ? "text-white" : "text-primary"
        }`}
        onClick={() => setShowCreate(true)}
      >
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
            <p className="underline text-sm font-semibold">
              {"Create Pokemon"}
            </p>
          </div>
        </a>
      </div>
    );
  };

  const LinkView = () => {
    return (
      <ul
        className={`flex flex-row ${darkTheme ? "text-white" : "text-primary"}`}
      >
        <li
          className={`ml-5 cursor-pointer ${
            path === "/" ? (darkTheme ? "text-gray-400" : "text-secondary") : ""
          }`}
        >
          <Link href="/">
            <p>{"All pokemons"}</p>
          </Link>
        </li>
        <li
          className={`ml-5 cursor-pointer ${
            path === "/mypokemons"
              ? darkTheme
                ? "text-gray-400"
                : "text-secondary"
              : ""
          }`}
        >
          <Link href="/mypokemons">
            <p>{"My Pokemons"}</p>
          </Link>
        </li>
      </ul>
    );
  };

  const paginationItem = (item: number) => {
    return (
      <li
        onClick={() => {
          setShowPaginationSelectlist(!showPaginationSelectlist);
          setSelectedPagination(item);
        }}
      >
        <a href="#" className="block py-2 px-4 text-sm hover:underline">
          {`${item} results`}
        </a>
      </li>
    );
  };

  const SelectPagination = () => {
    return (
      <div className="flex flex-col ml-5">
        <button
          id="dropdownNavbarLink"
          data-dropdown-toggle="dropdownNavbar"
          className={`flex justify-between rounded-lg items-center py-2 pl-3 pr-3 w-full font-medium  md:hover:text-primary ${
            darkTheme ? "bg-textfield-dark" : "shadow-small"
          }`}
          onClick={() => {
            setShowPaginationSelectlist(!showPaginationSelectlist);
          }}
        >
          <p>{`Showing ${selectedPagination} results`}</p>
          <svg
            className={`stroke-current text-primary ml-10 ${
              darkTheme ? "text-white" : "text-primary"
            }`}
            width="16"
            height="16"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g>
              <path d="M11.1561 3.50122L6.42536 8.381C6.39083 8.41895 6.34912 8.4492 6.30282 8.46988C6.25651 8.49055 6.20659 8.50122 6.15613 8.50122C6.10567 8.50122 6.05574 8.49055 6.00944 8.46988C5.96313 8.4492 5.92143 8.41895 5.8869 8.381L1.15613 3.50122" />
            </g>
          </svg>
        </button>
        <div
          id="dropdownNavbar"
          className={`absolute top-14 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
            showPaginationSelectlist ? "" : "hidden"
          }`}
        >
          <ul
            className={`flex flex-col py-1 ${
              darkTheme ? "bg-dark text-white" : "text-dark"
            }`}
            aria-labelledby="dropdownLargeButton"
          >
            {paginationNumbers.map((item) => {
              return <div key={`pagi-${item}`}>{paginationItem(item)}</div>;
            })}
          </ul>
        </div>
      </div>
    );
  };

  const SelectColorView = () => {
    return (
      <div
        className={`flex flex-row items-center ${darkTheme && "text-white"}`}
      >
        <p>{"Light Mode"}</p>
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
        <p className={`-mr-4 ${darkTheme ? "text-white" : "text-gray-400"}`}>
          {"Dark Mode"}
        </p>
      </div>
    );
  };

  return (
    <nav
      className={`fixed top-0 w-full z-10 text-sm ${
        darkTheme ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      {showCreate && CreateNew()}
      <div>
        <div className="shadow-md px-5">
          <div className="flex justify-between max-w-6xl mx-auto px-5">
            <div className="flex flex-row items-center">
              <Link href="/">
                <a className="inline-flex">
                  <p className="hidden md:block text-xl pl-4">Pokemons</p>
                </a>
              </Link>
              {SelectPagination()}
            </div>
            {session?.user ? (
              <div className="flex flex-row items-center">
                <p className="mr-2">
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </p>
                {session.user.image && (
                  <span
                    style={{
                      backgroundImage: `url('${session.user.image}')`,
                    }}
                    className={"avatar"}
                  />
                )}
                <a
                  className={`border px-4 py-1 ml-2 my-4 rounded-md shadow-md ${
                    darkTheme
                      ? "text-white border-white"
                      : "text-dark border-primary"
                  }`}
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
                  <div
                    className={`flex flex-row items-center justify-between border border-primary px-4 py-1 ml-2 my-4 rounded-md shadow-md ${`${
                      darkTheme ? "text-white bg-primary" : "text-secondary"
                    }`}`}
                  >
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
          </div>
        </div>
        <div className="flex flex-row justify-between max-w-6xl mx-auto mt-2 px-10">
          <div className="flex flex-row items-center">
            {session && CreateView()}
            {session && LinkView()}
          </div>
          {SelectColorView()}
        </div>
      </div>
    </nav>
  );
};
export default Header;
