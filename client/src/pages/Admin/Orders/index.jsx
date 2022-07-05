import React from "react";
import { useQuery } from "react-query";
import { FetchOrder } from "../../../api";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";
function Orders() {
  const { isLoading, isError, data } = useQuery("admin:orders", FetchOrder);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Text fontSize={25} p={5}>
        Orders
      </Text>
      <Table variant="simple">
        <TableCaption>Orders </TableCaption>
        <Thead>
          <Tr>
            <Th>Users</Th>
            <Th>Adress</Th>
            <Th>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((order, index) => (
            <Tr key={order.id}>
              <Td>{order.user}</Td>
              <Td>{order.adress}</Td>
              <Td>
                {order.items.map((item) => (
                  <p>{item}</p>
                ))}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Orders;
