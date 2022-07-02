import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
