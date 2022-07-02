import React, { useRef, useState } from "react";
import { useBasket } from "../../context/BasketContext";

import {
  Alert,
  Image,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PostOrder } from "../../api";
function Basket() {
  //modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { items, removeFromBasket, emptyBasket } = useBasket();
  //adress State
  const [adress, setAdress] = useState("");

  //order process to backend
  const handleSubmit = async () => {
    const itemIds = items.map((item) => item.title);

    const input = {
      user: JSON.parse(localStorage.getItem("user")),
      adress,
      items: itemIds,
    };
    await PostOrder(input);
    emptyBasket();
    onclose();
  };

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

          <Button mt={2} size="sm" colorScheme="teal" onClick={onOpen}>
            Order
          </Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Adress</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Adress"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;
