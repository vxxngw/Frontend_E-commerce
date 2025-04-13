// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

// Pages & Components
import Home from "./Components/Home/Home";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Payment from "./Components/Payment/Payment";
import AboutUs from "./Components/AboutUs/AboutUs";
import SearchResults from "./Components/SearchResults/SearchResults";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AccountPage from './Pages/AccountPage';

function App() {
  // Example of tracking the current user (could come from context, redux, etc.)
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user from an API or localStorage
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user)); // Assuming user data is stored as a JSON string
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />

          {/* Category routes */}
          <Route path="/man" element={<ShopCategory category="men" />} />
          <Route path="/woman" element={<ShopCategory category="women" />} />
          <Route path="/kid" element={<ShopCategory category="kid" />} />

          {/* Product route with dynamic param */}
          <Route path="/product/:productId" element={<Product />} />

          {/* Protected routes */}
          <Route
            path="/payment"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
          path="/account"
          element={<PrivateRoute><AccountPage currentUser={currentUser} /></PrivateRoute>}
        />
          <Route
            path="/cart"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route path="/account" element={<AccountPage currentUser={currentUser} />} />

          {/* Other routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
