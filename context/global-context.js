"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [bukuPelajaranId, setBukuPelajaranId] = useState(null);
  const [mudirPimpinanId, setMudirPimpinanId] = useState(null);
  const [santriId, setSantriId] = useState(null);
  const [tabunganId, setTabunganId] = useState(null);

  // Load from localStorage saat pertama render
  useEffect(() => {
    const savedBukuPelajaranId = localStorage.getItem("bukuPelajaranId");
    const savedMudirPimpinanId = localStorage.getItem("mudirPimpinanId");
    const santriId = localStorage.getItem("santriId");
    const tabunganId = localStorage.getItem("tabunganId");
    if (savedBukuPelajaranId) {
      setBukuPelajaranId(savedBukuPelajaranId);
    }
    if (savedMudirPimpinanId) {
      setBukuPelajaranId(savedMudirPimpinanId);
    }
    if (santriId) {
      setSantriId(santriId);
    }
    if (tabunganId) {
      setTabunganId(tabunganId);
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

    if (santriId) {
      localStorage.setItem("santriId", JSON.stringify(santriId));
    } else {
      localStorage.removeItem("santriId");
    }

    if (tabunganId) {
      localStorage.setItem("tabunganId", JSON.stringify(santriId));
    } else {
      localStorage.removeItem("tabunganId");
    }
  }, [bukuPelajaranId, mudirPimpinanId, santriId, tabunganId]);

  return (
    <GlobalContext.Provider
      value={{
        bukuPelajaranId,
        setBukuPelajaranId,
        mudirPimpinanId,
        setMudirPimpinanId,
        santriId,
        setSantriId,
        tabunganId,
        setTabunganId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
