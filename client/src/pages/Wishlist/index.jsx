import { useWishlist } from "../../context/Wishlist";
import { Alert, Image, Button, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Wishlist() {
  const { item, removeFromWishlist } = useWishlist();

  // const total = item.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <Box p={5}>
      {item.length < 1 && (
        <Alert status="warning">You have not any items in your Wishlist</Alert>
      )}
      {item.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal" }}>
            {item.map((item) => (
              <li key={item.id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item.id}`}>
                  <Text fontSize={18}>
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
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove From Wishlist
                </Button>
              </li>
            ))}
          </ul>
          {/* <Box mt="10">
            <Text fontSize="22">Total: {total} TL</Text>
          </Box> */}
        </>
      )}
    </Box>
  );
}

export default Wishlist;
