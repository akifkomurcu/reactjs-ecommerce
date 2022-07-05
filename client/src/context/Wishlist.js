import { useState, createContext, useContext, useEffect } from "react";

const WishlistContext = createContext();

const defaultWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const WishlistProvider = ({ children }) => {
  const [item, setItem] = useState(defaultWishlist);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(item));
  }, [item]);
  const addToWishlist = (data, findWishlistItem) => {
    //ilk defa ekleniyorsa çalışır
    if (!findWishlistItem) {
      return setItem((item) => [data, ...item]);
    }
    //eklenmiş olan id'li haricindekiler set edilir. Sepetten kaldırma işlemi yapılır.
    const filtered = item.filter((item) => item.id !== findWishlistItem.id);
    setItem(filtered);
  };

  //orderdan sonra sepet boşaltma.

  const emptyWishlist = () => setItem([]);

  const removeFromWishlist = (id) => {
    const filtered = item.filter((item) => item.id !== id);
    setItem(filtered);
  };
  const values = {
    item,
    itemLength: item.length,
    setItem,
    addToWishlist,
    removeFromWishlist,
    emptyWishlist,
  };
  return (
    <WishlistContext.Provider value={values}>
      {children}
    </WishlistContext.Provider>
  );
};
const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
