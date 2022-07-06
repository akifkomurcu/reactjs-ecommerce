import { createContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [result, setResult] = useState("");
  const [filtered, setFiltered] = useState("");
  const values = { result, setResult, filtered, setFiltered };
  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};
export default FilterContext;
