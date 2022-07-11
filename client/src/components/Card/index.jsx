import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { useBasket } from "../../context/BasketContext";
import { useWishlist } from "../../context/Wishlist";
import addWish from "./addWish.png";
import removeWish from "./removeWish.png";

function Card({ product }) {
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find(
    (BasketItem) => BasketItem.id === product.id
  );

  //addTo wishlist
  const { addToWishlist, item } = useWishlist();
  const findWishlistItem = item.find(
    (WishlistItem) => WishlistItem.id === product.id
  );
  // const AddWishlist = async (wlist) => {
  //   await AddWishListAPI(wlist);
  // };

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
          </Link>
          <Box className={style.productInfo}>
            <Box p="6px">
              {/* <Box d="flex" className={style.date}>
                {moment(product.createdAt).format("DD/MM/YYYY")}
              </Box> */}
              <Box mt="3" fontWeight="bold" as="h4" lineHeight="tight">
                {product.title}
              </Box>
              <Box className={style.price}>{product.price}TL</Box>
            </Box>
            <div className={style.addProductArea}>
              <img
                src={findWishlistItem ? removeWish : addWish}
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                }}
                onClick={() => addToWishlist(product, findWishlistItem)}
              />

              <Button
                colorScheme={findBasketItem ? "red" : "teal"}
                variant="outline"
                onClick={() => addToBasket(product, findBasketItem)}
              >
                {findBasketItem ? "Remove" : "Add to basket"}
              </Button>
            </div>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Card;
// AddWishlist(
//   {
//     user: JSON.parse(localStorage.getItem("user")),
//     id: product.id,
//     photo: product.photos[0],
//     title: product.title,
//     price: product.price,
//   },
