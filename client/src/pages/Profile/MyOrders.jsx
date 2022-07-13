import { useState } from "react";
import { ListItem, List, Box, Button } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FetchOrder } from "../../api";
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
                <Box key={index}>
                  {order.items.map((item, index) => (
                    <List
                      key={index}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py={2}
                    >
                      <ListItem>{item}</ListItem>
                      <Button
                        colorScheme="teal"
                        _hover={{ bg: "white", color: "black" }}
                      >
                        Cancel the Order
                      </Button>
                    </List>
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
