import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import { Box, Button, styled, Text } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../context/BasketContext";
import style from "./style.module.css";
function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, error, data } = useQuery(["product", { product_id }], () =>
    fetchProduct(product_id)
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const findBasketItem = items.find((item) => item.id === product_id);

  const images = data.photos.map((photo) => ({
    original: photo,
    thumbnail: photo,
  }));
  return (
    <div className={style.content}>
      <Box margin="10" w={700}>
        <ImageGallery items={images} />
        <Button
          colorScheme={findBasketItem ? "red" : "teal"}
          onClick={() => addToBasket(data, findBasketItem)}
        >
          {findBasketItem ? "remove from Basket" : " add to basket"}
        </Button>
      </Box>

      <Box className={style.desc}>
        <Text as="h1" fontSize="6xl">
          {data.title}
        </Text>
        <Text fontSize="2xl">
          {moment(data.createdAt).format("DD/MM/YYYY")}
        </Text>

        <Text className={style.descriptionText} fontSize="2xl">
          {data.description}
        </Text>
        <Text fontSize="2xl">{data.price}TL</Text>
      </Box>
    </div>
  );
}

export default ProductDetail;
