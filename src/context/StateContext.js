import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [banner, setBanner] = useState(null);

  return (
    <Context.Provider
      value={{
        banner,
        setBanner,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
