import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setLoggedIn(true);
    }
  }, []);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data.email));
  };
  const logOut = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  };
  const values = {
    user,
    loggedIn,
    login,
    logOut,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
