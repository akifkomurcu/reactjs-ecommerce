import { Box, Image, Button, styled } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import style from "./style.module.css";
function Card({ product }) {
  return (
    <>
      {product && (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
          <Link to={`/product/${product.id}`}>
            <Image
              className={style.productImage}
              src={product.photos[0]}
              alt="product"
              borderRadius={50}
            ></Image>
            <Box p="6px">
              <Box d="flex" alignItems="baseline">
                {moment(product.createdAt).format("DD/MM/YYYY")}
              </Box>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                {product.title}
              </Box>
              <Box>{product.price}</Box>
            </Box>
          </Link>
          <Button colorScheme="teal">Add to Basket</Button>
        </Box>
      )}
    </>
  );
}

export default Card;
