import { useState, useEffect, createContext, useContext } from "react";
import { FetchUsers } from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setLoggedIn(true);
    }
    //admin sayfa yenilenince state'ten silinidiği için localden alacağın kullanıcı adını backendde arayacağız. varsa giriş yapmış ve login durumunda kalacak ve rolünü tekrar alacak.
    async function UsersFunction() {
      const LoginResponse = await FetchUsers();

      LoginResponse.filter((user) =>
        JSON.parse(localStorage.getItem("user")) === user.email
          ? setUser(user)
          : ""
      );
    }

    UsersFunction();
  }, []);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data);
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
