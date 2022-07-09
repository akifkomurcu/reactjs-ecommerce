import { Link } from "react-router-dom";
import styles from "./style.module.css";
import {
  Button,
  Menu,
  Input,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/Wishlist";
import { useBasket } from "../../context/BasketContext";
import { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { fetchAllProduct } from "../../api";
import FilterContext from "../../context/FilteredContext";
import { useLocation } from "react-router-dom";
function Navbar() {
  const { items } = useBasket();
  const { item } = useWishlist();
  const { user } = useAuth();
  const { setResult, result, setFiltered } = useContext(FilterContext);
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
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

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

        {usePathname() === "/" ? (
          <div className={styles.menu}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Products
              </MenuButton>
              <MenuList>
                <MenuItem value="" onClick={() => setResult("")}>
                  All
                </MenuItem>
                <MenuItem
                  value="technology"
                  onClick={() => setResult("Technology")}
                >
                  Technology
                </MenuItem>
                <MenuItem value="animal" onClick={() => setResult("Animal")}>
                  Animal
                </MenuItem>
                <MenuItem
                  value="stationary"
                  onClick={() => setResult("Stationary")}
                >
                  Stationary
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.right}>
        {usePathname() === "/" ? (
          <Input
            htmlSize={10}
            width="auto"
            placeholder="Search"
            onChange={handleChange}
            value={result}
            marginRight="5px"
          />
        ) : (
          ""
        )}
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
