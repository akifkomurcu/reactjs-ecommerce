import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { Button } from "@chakra-ui/react";
function Navbar() {
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
      </div>
    </nav>
  );
}

export default Navbar;
