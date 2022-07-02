import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./style.css";
import { Box } from "@chakra-ui/react";
import Login from "../Auth/Login";
import Home from "./Home";
import Products from "./Products";
import Orders from "./Orders";
function Admin() {
  const { user } = useAuth();

  return (
    <div>
      {user && user.role === "admin" ? (
        <>
          <nav>
            <ul className="admin-menu">
              <Link to="/admin/">
                <li>Home</li>
              </Link>
              <Link to={`/admin/orders`}>
                <li>Orders</li>
              </Link>
              <Link to={`/admin/products`}>
                <li>Products</li>
              </Link>
            </ul>
          </nav>
          <Box mt={10}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Box>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Admin;
