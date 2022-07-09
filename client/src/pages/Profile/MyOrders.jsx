import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ListItem, UnorderedList, Box } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import { useQuery } from "react-query";
import { FetchOrder } from "../../api";
import Login from "../Auth/Login";
import style from "./style.module.css";

function MyOrders() {
  const { isLoading, isError, data } = useQuery("orders", FetchOrder);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <div className={style.myOrders}>
        <div className={style.myOrdersContent}>
          {data
            .filter(
              (order) => order.user === JSON.parse(localStorage.getItem("user"))
            )
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
    </>
  );
}

export default MyOrders;
