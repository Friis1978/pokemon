import React, {useState} from "react";
import Header from "./Header";

const Layout = ({ children, dark }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={`${darkTheme ? 'bg-secondary': ''} h-screen`}>
      <Header 
        shiftColor={()=>{
            setDarkTheme(!darkTheme)
            dark(darkTheme)
        }}/>
      {children}
    </div>
  );
};

export default Layout;