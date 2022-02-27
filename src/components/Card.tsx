import React, { useEffect, useState } from "react";

const Card = ({ imageUrl, name, width, height, id, darkTheme }) => {
  
  const [darkBg, setDarkBg] = useState(false);

  useEffect(()=>{
    //setDarkBg(!darkBg)
    
  },[darkTheme])

  return (
    <div key={id} className={`flex flex-col max-w-md rounded-xl text-center ${darkBg ? 'bg-white shadow-big':'bg-dark'} h-full justify-between`}>
      <div className="flex bg-primary m-5 p-5 rounded-lg">
        <img src={imageUrl} />
      </div>
      <div className="p-5 flex flex-col space-y-2 justify-between">
        <p className="text-lg font-medium">{name}</p>
        <p className="text-sm text-blue-500">{width}</p>
        <p className="text-gray-600">{height}</p>
        <a href={imageUrl} className="flex hover:text-blue-500">
          {/* removes https from url */}
          {imageUrl.replace(/(^\w+:|^)\/\//, "")}
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
          </svg>
        </a>    
      </div>
      <div className="flex bg-border-gray justify-around rounded-b-lg">
          <button className="text-primary font-semibold bg-white w-full rounded-bl-lg py-2 border-r-border-gray border-r-small hover:bg-border-gray">See Details</button>
          <button className="text-delete font-semibold bg-white w-full rounded-br-lg py-2 hover:bg-border-gray">Delete</button>
        </div>
    </div>
  );
};
export default Card;
