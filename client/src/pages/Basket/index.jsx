import React from "react";
import { useBasket } from "../../context/BasketContext";
import { Alert, Image, Button, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Basket() {
  const { items, removeFromBasket } = useBasket();

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <Box p={5}>
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket</Alert>
      )}
      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal" }}>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item.id}`}>
                  <Text fontSize={18}>
                    {" "}
                    {item.title} - {item.price}
                  </Text>
                  <Image
                    loading="lazy"
                    htmlWidth={200}
                    src={item.photos[0]}
                    alt="item photo"
                  />
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeFromBasket(item.id)}
                >
                  Remove From Basket
                </Button>
              </li>
            ))}
          </ul>
          <Box mt="10">
            <Text fontSize="22">Total: {total} TL</Text>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Basket;
