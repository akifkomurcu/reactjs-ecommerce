import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FetchOrder } from "../../api";
import Login from "../Auth/Login";
import style from "./style.module.css";
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
  const { isLoading, isError, data } = useQuery("orders", FetchOrder);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {me ? (
        <div>
          <div className={style.welcome}>Welcome! {me ? me : ""}</div>
          <Link to="/" className={style.logOutButton}>
            <Button colorScheme="red" onClick={handleLogOut}>
              Logout
            </Button>
          </Link>
          <div className={style.myOrders}>
            Your Orders
            <div className={style.myOrdersContent}>
              {data
                .filter((order) => order.user === me)
                .map((order, index) => (
                  <Box key={index}>
                    <Box>
                      {order.items.map((item) => (
                        <UnorderedList>
                          <ListItem>{item}</ListItem>
                        </UnorderedList>
                      ))}
                    </Box>
                  </Box>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Profile;
