import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faStore,
  faHouse,
  faBaby,
  faPeopleGroup,
  faPersonDress,
  faPerson,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../../Contexts/ShopContext";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Carousel } from "react-bootstrap";
import banner_main from "../Assets/banner5.png";
import banner_main_4 from "../Assets/banner4.png";

const Navbar = () => {
  const { all_product, getTotalCartAmount } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(all_product);
  const [currentUser, setCurrentUser] = useState(null);
  const topRef = useRef(null);
  const top2Ref = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();

  // Check user login status
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Scroll behavior for hiding the header
  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const top = topRef.current;

      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        top?.classList.add("hidden");
        setIsFixed(true);
      } else if (currentScrollY < lastScrollY) {
        top?.classList.remove("hidden");
        setIsFixed(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = all_product.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredProducts.length > 0) {
      navigate("/search", { state: { results: filteredProducts } });
    } else {
      alert("Không tìm thấy sản phẩm phù hợp.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <header className="tp_header" style={{ marginBottom: "150px" }}>
        {/* HEADER TOP */}
        <div className="top hidden-sm hidden-xs tp_header" ref={topRef}>
          <div className="container">
            <div className="row align-items-center d-flex justify-content-between">
              <div className="col-md-8 col-sm-12 d-flex no-padding position-relative">
                {/* Logo */}
                <div className="col-md-3 col-sm-12 logoTop">
                  <div className="logo">
                    <Link to="/shop">
                      <img
                        alt="Logo"
                        src="https://pos.nvncdn.com/69e708-173581/store/20240425_lHnv9RXr.png"
                      />
                    </Link>
                  </div>
                </div>

                {/* Search */}
                <div className="col-md-9 col-sm-12 no-padding searchTop" id="searchtop">
                  <div className="search-collection col-xs-12 no-padding">
                    <form className="search align-items-center" onSubmit={handleSearchSubmit}>
                      <div className="input-group">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          id="text-product"
                          placeholder="Tìm kiếm sản phẩm bạn muốn mua"
                        />
                        <button id="search-button" className="btn btn-primary" type="submit">
                          <FontAwesomeIcon icon={faMagnifyingGlass} id="icon-search" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* User / Cart */}
              <div className="col-md-4 col-sm-12 d-flex">
                <div className="col-md-9 col-sm-12 formLoginRegister">
                  <div className="row d-flex">
                    <div className="headStore_wrapper">
                      <ul className="header-user d-none d-md-block">
                        {currentUser ? (
                          <>
                            <li>
                              <span style={{ fontWeight: "bold", color: "#000" }}>
                                Xin chào, {currentUser.name}
                              </span>
                            </li>
                            <li>
                              <button onClick={handleLogout} className="btn btn-link p-0 ms-3">
                                <FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link to="/login" className="but-login">
                                <p>Đăng nhập |</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/register" className="but-register">
                                <p>Đăng ký</p>
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-sm-12 cartShopping">
                  <div className="row">
                    <div className="crattop_wrapper">
                      <div id="cart_block" className="cart_relative">
                        <div className="cart-total-price">
                          <Link to="/cart" id="faShop">
                            <FontAwesomeIcon icon={faStore} id="icon-Shopping" />
                          </Link>
                          <span className={getTotalCartAmount() > 0 ? "" : "hidden"}>
                            {getTotalCartAmount()} $
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className={`top2 hidden-sm hidden-md ${isFixed ? "fixed" : ""}`} ref={top2Ref}>
          <div className="container-fluid menutopid tp_menu d-flex" style={{ background: "#F0F0F0" }}>
            <div className="container">
              <div className="row d-flex">
                <div className="col-md-12">
                  <ul className="menu-top clearfix hidden-sm">
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/shop" className="nav-express">
                        <div className="coll-icon">
                          <FontAwesomeIcon icon={faHouse} id="icon-home" />
                          <span className="title-main-menu">HOME</span>
                        </div>
                      </Link>
                    </li>
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/man" className="nav-express">
                        <div className="coll-icon">
                          <FontAwesomeIcon icon={faPerson} id="icon-home" />
                          <span className="title-main-menu">MAN</span>
                        </div>
                      </Link>
                    </li>
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/woman" className="nav-express">
                        <div className="coll-icon">
                          <FontAwesomeIcon icon={faPersonDress} id="icon-home" />
                          <span className="title-main-menu">WOMEN</span>
                        </div>
                      </Link>
                    </li>
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/kid" className="nav-express">
                        <div className="coll-icon">
                          <FontAwesomeIcon icon={faBaby} id="icon-home" />
                          <span className="title-main-menu">KIDS</span>
                        </div>
                      </Link>
                    </li>
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/aboutus" className="nav-express">
                        <div className="coll-icon">
                          <FontAwesomeIcon icon={faPeopleGroup} id="icon-home" />
                          <span className="title-main-menu">ABOUT US</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="slide-thumb">
        <Carousel interval={3000}>
          <Carousel.Item>
            <img className="w-100 image" src={banner_main} alt="First slide" />
            <Carousel.Caption>
              <p className="black">Ưu đãi cực lớn, chỉ có tại shop của chúng tôi!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="w-100 image" src={banner_main_4} alt="Second slide" />
            <Carousel.Caption>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Navbar;
