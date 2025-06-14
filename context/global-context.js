"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [bukuPelajaranId, setBukuPelajaranId] = useState(null);
  const [mudirPimpinanId, setMudirPimpinanId] = useState(null);

  // Load from localStorage saat pertama render
  useEffect(() => {
    const savedBukuPelajaranId = localStorage.getItem("bukuPelajaranId");
    const savedMudirPimpinanId = localStorage.getItem("mudirPimpinanId");
    if (savedBukuPelajaranId) {
      setBukuPelajaranId(savedBukuPelajaranId);
    }
    if (savedMudirPimpinanId) {
      setBukuPelajaranId(savedMudirPimpinanId);
    }
  }, []);

  // Simpan ke localStorage setiap kali user berubah
  useEffect(() => {
    if (bukuPelajaranId) {
      localStorage.setItem("bukuPelajaranId", JSON.stringify(bukuPelajaranId));
    } else {
      localStorage.removeItem("bukuPelajaranId");
    }

    if (mudirPimpinanId) {
      localStorage.setItem("mudirPimpinanId", JSON.stringify(mudirPimpinanId));
    } else {
      localStorage.removeItem("mudirPimpinanId");
    }
  }, [mudirPimpinanId]);

  return (
    <GlobalContext.Provider
      value={{
        bukuPelajaranId,
        setBukuPelajaranId,
        mudirPimpinanId,
        setMudirPimpinanId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
