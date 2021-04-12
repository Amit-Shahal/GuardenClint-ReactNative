import React, { useContext, useState } from "react";

const DataContext = React.createContext();
const UpdateDataContext = React.createContext();

export function useGardenData() {
  return useContext(DataContext);
}
export function useUpdateGardenData() {
  return useContext(UpdateDataContext);
}

export default function GardenDataProvider({ children }) {
  const [GardenData, setGardenData] = useState([]);

  function UpdateGardenData(data) {
    setGardenData(data);
  }

  return (
    <DataContext.Provider value={GardenData}>
      <UpdateDataContext.Provider value={UpdateGardenData}>
        {children}
      </UpdateDataContext.Provider>
    </DataContext.Provider>
  );
}
