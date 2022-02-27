import React, {useState} from "react";
import Header from "./Header";

const Layout = ({ children, dark, currentPath }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={`${darkTheme ? 'bg-secondary': ''} h-screen`}>
      <Header 
        shiftColor={()=>{
            setDarkTheme(!darkTheme)
            dark(darkTheme)
        }}
        currentPath={currentPath}
      />
      <div className="pt-28">
      {children}
      </div>
    </div>
  );
};

export default Layout;