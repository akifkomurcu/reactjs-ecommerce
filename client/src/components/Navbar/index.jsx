import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useBasket } from "../../context/BasketContext";
function Navbar() {
  const loggedIn = useAuth();
  const { items } = useBasket();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">E-commerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {/* kullanıcı yoksa */}
        {!loggedIn.user && (
          <>
            <Link to="/register">
              <Button colorScheme="teal" variant="ghost">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="teal" variant="ghost">
                Login
              </Button>
            </Link>
          </>
        )}
        {/* kullanıcı varsa */}
        {loggedIn.user && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="teal" variant="ghost">
                  Basket ({items.length})
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button colorScheme="teal" variant="ghost">
                Profile
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
