import { ListItem, UnorderedList, Box } from "@chakra-ui/react";
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
                    <UnorderedList key={index}>
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
