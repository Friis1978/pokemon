import React, {useState} from "react";
import Header from "./Header";

const Layout = ({ children, dark, currentPath, pagination }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={`${darkTheme ? 'bg-secondary': 'bg-white'}`}>
      <Header 
        pagination={(items:number)=>{pagination(items)}}
        shiftColor={(theme:boolean)=>{
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