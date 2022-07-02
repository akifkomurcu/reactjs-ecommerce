import { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { FetchLogin } from "../../api";
import Login from "../Auth/Login";
function Admin() {
  const [me, setMe] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setMe(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <div>
      {me === "akif@akif.com" ? (
        <nav>
          <ul>home</ul>
        </nav>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Admin;
