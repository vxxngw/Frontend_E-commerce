import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
  faHouse,
  faBaby,
  faPeopleGroup,
  faPersonDress,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { ShopContext, filteredProducts } from "../../Contexts/ShopContext";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Carousel } from "react-bootstrap";
import banner_main from "../Assets/banner5.png";
import banner_main_4 from "../Assets/banner4.png";

const Navbar = () => {
  const { all_product, getTotalCartAmount } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const topRef = useRef(null);
  const top2Ref = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(all_product);
  const navigate = useNavigate();
  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const top = topRef.current;
      const currentScrollY = window.scrollY;

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

  return (
    <div className="wrapper">
      <header className="tp_header" style={{ marginBottom: "150px" }}>
        <div className="top hidden-sm hidden-xs tp_header" ref={topRef}>
          <div className="container">
            <div className="row align-items-center d-flex justify-content-between">
              <div className="col-md-8 col-sm-12 d-flex no-padding position-relative">
                {/*Logo*/}
                <div className="col-md-3 col-sm-12 logoTop">
                  <div className="logo">
                    <Link to="/shop">
                      <img
                        alt="Logo"
                        src="https://pos.nvncdn.com/69e708-173581/store/20240425_lHnv9RXr.png"
                      ></img>
                    </Link>
                  </div>
                </div>
                {/*Search*/}

                <div className="d-flex justify-content-center">
                  <div
                    className="col-md-9 col-sm-12 no-padding searchTop"
                    id="searchtop"
                  >
                    <div className="search-collection col-xs-12 no-padding" onSubmit={handleSearchSubmit}>
                      <form
                        className="search align-items-center"
                        action="/search"
                      >
                        <div className="custom-input-group">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            id="text-product"
                            placeholder="Tìm kiếm sản phẩm bạn muốn mua"
                          />
                          <button id="search-button" className="btn btn-primary">
                            <FontAwesomeIcon icon={faMagnifyingGlass} id="icon-search" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 d-flex">
                <div className="col-md-9 col-sm-12 formLoginRegister">
                  <div className="row d-flex">
                    <div className="headStore_wrapper">
                      <ul className="header-user d-none d-md-block">
                        <li>
                          <Link to="/login" className="but-login">
                            <p>Dang nhap |</p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/register" className="but-register">
                            <p>Dang ky</p>
                          </Link>
                        </li>
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
                            <FontAwesomeIcon icon={faShoppingCart} id="icon-cart" />
                          </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`top2 hidden-sm hidden-md ${isFixed ? "fixed" : ""}`}
          ref={top2Ref}
        >
          <div
            className="container-fluid menutopid tp_menu d-flex "
            style={{ background: "#F0F0F0" }}
          >
            <div className="container">
              <div className="row d-flex">
                <div className="col-md-12">
                  <ul className="menu-top clearfix hidden-sm">
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/shop" className="nav-express">
                        <div className="coll-icon">
                          <span className="ico-top">
                            {" "}
                            <FontAwesomeIcon icon={faHouse} id="icon-home" />
                          </span>
                          <span className="title-main-menu tp_menu_item">
                            HOME
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/man" className="nav-express">
                        <div className="coll-icon">
                          <span className="ico-top">
                            <FontAwesomeIcon icon={faPerson} id="icon-home" />
                          </span>
                          <span className="title-main-menu tp_menu_item">
                            MAN
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/woman" className="nav-express">
                        <div className="coll-icon">
                          <span className="ico-top">
                            <FontAwesomeIcon
                              icon={faPersonDress}
                              id="icon-home"
                            />
                          </span>
                          <span className="title-main-menu tp_menu_item">
                            WOMEN
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/kid" className="nav-express">
                        <div className="coll-icon">
                          <span className="ico-top">
                            <FontAwesomeIcon icon={faBaby} id="icon-home" />
                          </span>
                          <span className="title-main-menu tp_menu_item">
                            KIDS
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className="menu-li hasChild tp_menu_item">
                      <Link to="/aboutus" className="nav-express">
                        <div className="coll-icon">
                          <span className="ico-top">
                            <FontAwesomeIcon
                              icon={faPeopleGroup}
                              id="icon-home"
                            />
                          </span>
                          <span className="title-main-menu tp_menu_item">
                            ABOUT US
                          </span>
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
      <div className="slide-thumb">
        <Carousel interval={1000}>
          <Carousel.Item>
            <img className=" w-100 image" src={banner_main} alt="First slide" />
            <Carousel.Caption>
              <p className="black">
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100 image"
              src={banner_main_4}
              alt="Second slide"
            />
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