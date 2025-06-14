"use client";

import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [bukuPelajaranId, setBukuPelajaranId] = useState(null);

  return (
    <GlobalContext.Provider value={{ bukuPelajaranId, setBukuPelajaranId }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
