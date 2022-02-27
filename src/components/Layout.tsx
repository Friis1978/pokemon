import React, {useState} from "react";
import Header from "./Header";

const Layout = ({ children, dark, currentPath }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={`${darkTheme ? 'bg-secondary': 'bg-white'}`}>
      <Header 
        shiftColor={(theme)=>{
            setDarkTheme(theme)
            dark(theme)
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