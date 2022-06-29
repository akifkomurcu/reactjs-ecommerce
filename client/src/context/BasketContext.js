import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];
const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);
  const addToBasket = (data, findBasketItem) => {
    //ilk defa ekleniyorsa çalışır
    if (!findBasketItem) {
      return setItems((items) => [data, ...items]);
    }
    //eklenmiş olan id'li haricindekiler set edilir. Sepetten kaldırma işlemi yapılır.
    const filtered = items.filter((item) => item.id !== findBasketItem.id);
    setItems(filtered);
  };

  const removeFromBasket = (id) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
  };
  const values = {
    items,
    itemsLength: items.length,
    setItems,
    addToBasket,
    removeFromBasket,
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};
const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
