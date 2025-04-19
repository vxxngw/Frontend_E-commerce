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
import { ShopContext } from "../../Contexts/ShopContext";
import { useAuthStore } from "../../store/useAuthStore";
import banner_main from "../Assets/banner5.png";
import banner_main_4 from "../Assets/banner4.png";
import logo from "../Assets/logo.jpg";

const Navbar = () => {
  const { all_product, getTotalCartAmount } = useContext(ShopContext);
  const { user, logout, authCheck } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(all_product);
  const [isFixed, setIsFixed] = useState(false);
  const topRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    authCheck(); // Kiểm tra xác thực khi component mount
  }, [authCheck]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const top = topRef.current;

      if (currentScrollY > 100) {
        top?.classList.add("d-none");
        setIsFixed(true);
      } else {
        top?.classList.remove("d-none");
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filtered = all_product.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      if (filtered.length > 0) {
        navigate("/search", { state: { results: filtered } });
      } else {
        alert("Không tìm thấy sản phẩm phù hợp.");
      }
    }
  };

  return (
    <div className="navbar-wrapper">
      <header>
        {/* Top Navbar */}
        <div className="bg-white shadow-sm" ref={topRef}>
          <div className="container py-3">
            <div className="row align-items-center">
              <div className="col-md-7">
                <div className="d-flex align-items-center gap-3">
                  {/* Logo */}
                  <div className="me-3">
                    <Link to="/shop">
                      <img
                        alt="Logo"
                        src="https://pos.nvncdn.com/69e708-173581/store/20240425_lHnv9RXr.png"
                        style={{ height: "60px" }}
                      />
                    </Link>
                  </div>

                  {/* Search Form */}
                  <form className="d-flex w-100" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      className="form-control rounded-pill ms-0"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Tìm kiếm sản phẩm bạn muốn mua"
                    />
                    <button
                      className="btn btn-outline-secondary rounded-pill ms-0"
                      type="submit"
                      style={{ border: "none", background: "transparent" }}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-md-5">
                <div className="d-flex justify-content-end align-items-center gap-3">
                  {/* User Auth Section */}
                  {user ? (
                    <div className="dropdown">
                      <img
                        src={logo}
                        alt="User"
                        className="rounded-circle dropdown-toggle"
                        style={{ width: "40px", height: "40px", objectFit: "cover", cursor: "pointer" }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><Link className="dropdown-item" to="/profile">Thông tin cá nhân</Link></li>
                        <li><Link className="dropdown-item" to="/cart">Giỏ hàng</Link></li>
                        <li><Link className="dropdown-item" to="/orders">Đơn hàng</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-danger" onClick={logout}>Đăng xuất</button></li>
                      </ul>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <Link to="/login" className="text-decoration-none text-dark me-2">Đăng nhập</Link>
                      <span className="text-muted mx-1">|</span>
                      <Link to="/register" className="text-decoration-none text-dark ms-2">Đăng ký</Link>
                    </div>
                  )}

                  {/* Cart Icon */}
                  <div
                    className="text-dark fs-4 position-relative"
                    onClick={() => {
                      if (!user) {
                        alert("Vui lòng đăng nhập để xem giỏ hàng.");
                        navigate("/login");
                      } else {
                        navigate("/cart");
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className={`navbar navbar-expand navbar-dark bg-dark ${isFixed ? "fixed-top" : ""}`}>
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link px-4" to="/shop">
                  <FontAwesomeIcon icon={faHouse} className="me-2" /> HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/man">
                  <FontAwesomeIcon icon={faPerson} className="me-2" /> MAN
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/woman">
                  <FontAwesomeIcon icon={faPersonDress} className="me-2" /> WOMEN
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/kid">
                  <FontAwesomeIcon icon={faBaby} className="me-2" /> KIDS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/aboutus">
                  <FontAwesomeIcon icon={faPeopleGroup} className="me-2" /> ABOUT US
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Banner Carousel */}
      <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner_main} className="d-block w-100" alt="Banner 1" />
          </div>
          <div className="carousel-item">
            <img src={banner_main_4} className="d-block w-100" alt="Banner 2" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
