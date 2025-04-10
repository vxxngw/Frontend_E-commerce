
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Payment from './Components/Payment/Payment';
import AboutUs from './Components/AboutUs/AboutUs';
import SearchResults from "./Components/SearchResults/SearchResults";
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Footer from './Components/Footer/Footer';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route path='/home' element={<Home />} />
          <Route path='/man' element={<ShopCategory  category="men" />} />
          <Route path='/woman' element={<ShopCategory category="women" />} />
          <Route path='/kid' element={<ShopCategory category="kid" />} />
          <Route path='/product' element={<Product />}>
          
          <Route path=':productId' element={<Product />} />
          
          </Route>
          <Route path='/payment' element={<Payment />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
