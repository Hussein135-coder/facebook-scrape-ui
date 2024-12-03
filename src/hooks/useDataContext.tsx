import { useContext } from "react";
import { DataContext } from "../context/DataContext.tsx";

const useDataContext = () => {
  const context = useContext(DataContext);
  return context;
};

export default useDataContext;
