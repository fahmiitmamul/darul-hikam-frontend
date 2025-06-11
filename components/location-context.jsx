import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [idProvince, setIdProvince] = useState("");
  const [idRegency, setIdRegency] = useState("");
  const [idDistrict, setIdDistrict] = useState("");
  const [idVillage, setIdVillage] = useState("");

  return (
    <LocationContext.Provider
      value={{
        idProvince,
        setIdProvince,
        idRegency,
        setIdRegency,
        idDistrict,
        setIdDistrict,
        idVillage,
        setIdVillage,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  return useContext(LocationContext);
}
