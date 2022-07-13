import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Box } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import style from "./style.module.css";
import About from "./About";
import MyOrders from "./MyOrders";
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
        <section className={style.layout}>
          <div className={style.left}>
            <div className={style.ProfilePictureArea}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Flag_of_None.svg/2560px-Flag_of_None.svg.png"
                alt=""
                className={style.ProfilePicture}
              />
            </div>
          </div>
          <div className={style.right}>
            <Link to="/" className={style.logOutButton}>
              <Button
                background="black"
                _hover={{ bg: "white", color: "black" }}
                color={"white"}
                onClick={handleLogOut}
                mr={3}
              >
                Edit Profile
              </Button>
              <Button
                colorScheme="red"
                _hover={{ bg: "white", color: "black" }}
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </Link>
            {/* <div className={style.welcome}> {me}</div> */}
            <div>
              <div className={style.profileMenu}>
                <Link to="/profile/about">
                  <div className={style.AboutTab}>About</div>
                </Link>
                <Link to={`/profile/myorders`}>
                  <div className={style.OrdersTab}>Orders</div>
                </Link>
              </div>

              <hr className={style.stick} />
            </div>
            <Box mt={10}>
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/myorders" element={<MyOrders />} />
              </Routes>
            </Box>
          </div>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Profile;
