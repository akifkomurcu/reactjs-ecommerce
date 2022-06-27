import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login";
function Profile() {
  const [me, setMe] = useState("");
  const { logOut } = useAuth();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setMe(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const handleLogOut = () => {
    logOut();
  };
  return (
    <>
      {me ? (
        <div>
          Profile of {me ? me : ""}
          <Link to="/">
            <Button onClick={handleLogOut}>Logout</Button>
          </Link>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Profile;
