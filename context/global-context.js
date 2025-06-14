"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [bukuPelajaranId, setBukuPelajaranId] = useState(null);

  // Load from localStorage saat pertama render
  useEffect(() => {
    const savedBukuPelajaranId = localStorage.getItem("bukuPelajaranId");
    if (savedBukuPelajaranId) {
      setBukuPelajaranId(savedBukuPelajaranId);
    }
  }, []);

  // Simpan ke localStorage setiap kali user berubah
  useEffect(() => {
    if (bukuPelajaranId) {
      localStorage.setItem("bukuPelajaranId", JSON.stringify(bukuPelajaranId));
    } else {
      localStorage.removeItem("bukuPelajaranId");
    }
  }, [bukuPelajaranId]);

  return (
    <GlobalContext.Provider value={{ bukuPelajaranId, setBukuPelajaranId }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
