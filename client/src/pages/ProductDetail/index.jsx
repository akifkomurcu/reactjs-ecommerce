import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import { Box, Button, Text } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../context/BasketContext";
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
    <div>
      <Button
        colorScheme={findBasketItem ? "red" : "teal"}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "remove from Basket" : " add to basket"}
      </Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>

      <p>{data.description}</p>
      <Box margin="10">
        <ImageGallery items={images} />
      </Box>
    </div>
  );
}

export default ProductDetail;
