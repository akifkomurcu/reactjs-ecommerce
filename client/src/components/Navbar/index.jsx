import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { Button, color, Input, Box } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/Wishlist";
import { useBasket } from "../../context/BasketContext";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchAllProduct } from "../../api";
import { useContext } from "react";
import FilterContext from "../../context/FilteredContext";
function Navbar() {
  const { items } = useBasket();
  const { item } = useWishlist();
  const { user } = useAuth();
  const { setResult, result, setFiltered, filtered } =
    useContext(FilterContext);
  const { data } = useQuery("filtering:products", fetchAllProduct);

  useEffect(() => {
    if (data)
      setFiltered(
        data.filter((item) => {
          return Object.keys(item).some((key) =>
            item[key].toString().toLowerCase().includes(result.toLowerCase())
          );
        })
      );
  }, [result]);
  const handleChange = (e) => {
    setResult(e.target.value);
  };
  const handleClick = () => {
    setResult("");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/" onClick={handleClick}>
            E-commerce
          </Link>
        </div>
        <ul className={styles.menu}>
          <div className={styles.navbar}>
            <div className={styles.dropdown}>
              <Link to="/" onClick={handleClick} className={styles.dropbtn}>
                <i className="fa fa-caret-down">Products</i>
              </Link>
              <div className={styles.dropdownContent}>
                <a value="technology" onClick={(e) => setResult("Technology")}>
                  Technology
                </a>
                <a value="animal" onClick={(e) => setResult("Animal")}>
                  Animal
                </a>
                <a value="stationary" onClick={(e) => setResult("Stationary")}>
                  Stationary
                </a>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div className={styles.right}>
        <Input
          htmlSize={10}
          width="auto"
          placeholder="Search"
          onChange={handleChange}
          value={result}
          marginRight="5px"
        />
        {/* kullanıcı yoksa */}
        {!user && (
          <>
            <Link to="/register">
              <Button colorScheme="black" variant="ghost" marginRight="5px">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="teal" variant="ghost" marginRight="5px">
                Login
              </Button>
            </Link>
          </>
        )}
        {/* kullanıcı varsa */}
        {
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="black" variant="ghost" marginRight="5px">
                  Basket ({items.length})
                </Button>
              </Link>
            )}
            {user && user.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="teal" variant="ghost" marginRight="5px">
                  Admin
                </Button>
              </Link>
            )}
            {item.length > 0 && (
              <Link to="/wishlist">
                <Button colorScheme="teal" variant="ghost" marginRight="5px">
                  Wishlist({item.length})
                </Button>
              </Link>
            )}
            {user && (
              <Link to="/profile">
                <Button
                  background="black"
                  _hover={{ bg: "white", color: "black" }}
                  color={"white"}
                  marginRight="5px"
                >
                  Profile
                </Button>
              </Link>
            )}
          </>
        }
      </div>
    </nav>
  );
}

export default Navbar;
