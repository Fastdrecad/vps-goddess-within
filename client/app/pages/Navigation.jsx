import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import { useGetBrandsListQuery } from "../redux/slices/brandApiSlice";
import { logout } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";
import { clearAllWishlistItems } from "../redux/slices/wishlistSlice";
import { Col, Container, Row } from "reactstrap";
import { Navbar } from "reactstrap";
import {
  Link,
  NavLink as ActiveLink,
  useNavigate,
  NavLink
} from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import Input from "../components/common/Input";
import { ProfileTab } from "../components/common/ProfileTab";
import Cart from "../components/common/Cart";
import { GoPerson, GoPersonFill } from "react-icons/go";
import { BsHeart, BsHandbag } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useBrandSlug } from "../contexts/useBrandSlug";
import NavigationMenu from "../components/common/NavigationMenu";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import DropdownMenu from "../components/common/DropdownMenu";

const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const { data } = useGetProductsQuery();
  const inputRef = useRef(null);
  const dropDownRef = useRef(null);
  const dropDownBrandsRef = useRef(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverBrands, setIsOverBrands] = useState(false);
  const [isAtAdmin, setIsAtAdmin] = useState(false);
  const [isInFocus, setIsInFocus] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { setBrandSlug } = useBrandSlug();

  const { data: brandsData } = useGetBrandsListQuery();

  const handleClick = (slug) => {
    setBrandSlug(slug);
    setIsOverBrands(!isOverBrands);
    navigate(`/brand/${slug}`);
  };

  const handleDropdownBrandsClick = (e) => {
    if (
      !dropDownBrandsRef.current ||
      !dropDownBrandsRef.current.contains(e.target)
    ) {
      setIsOverBrands(false);
    }
  };
  const handleDropdownClick = (e) => {
    if (!dropDownRef.current || !dropDownRef.current.contains(e.target)) {
      setIsAtAdmin(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDropdownBrandsClick, true);

    return () => {
      document.removeEventListener("click", handleDropdownBrandsClick, true);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleDropdownClick, true);

    return () => {
      document.removeEventListener("click", handleDropdownClick, true);
    };
  }, []);

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleWishlist = () => {
    if (userInfo) {
      navigate("/wishlist");
    } else {
      navigate("/login");
    }
  };

  const toggleProfile = () => {
    if (userInfo) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
    setIsHovering(!isHovering);
  };

  const handleClickBrands = () => {
    setIsOverBrands(!isOverBrands);
  };

  const toggleAdminProfile = () => {
    setIsAtAdmin(!isAtAdmin);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      dispatch(clearAllWishlistItems());
      navigate("/login");
      setIsHovering(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  const handleFocus = () => {
    setIsInFocus(true);
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = data?.products?.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [data?.products, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsInFocus(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isInFocus]);

  return (
    <header className="header">
      <div className="header-info">
        <Container>
          <div className="announcement">
            <span className="topbar-text">
              <p>
                <Link to="/shop">
                  <strong>spring sale </strong> | say goodbye to winter with up
                  to
                  <strong> 50€ OFF</strong> your order, no code necessary
                </Link>
              </p>
            </span>
            <CountdownTimer />
          </div>
        </Container>
      </div>
      <Container className="header-container  d-none d-lg-block">
        <Row className="align-items-center top-header">
          <Col lg={{ size: 2, order: 1 }} className="pr-0 ">
            <div className="brand">
              <Link to="/">
                <h1 className="logo">Goddess Within</h1>
              </Link>
            </div>
          </Col>
          <Col
            lg={{ size: 4, order: 2 }}
            className="pt-lg-0 d-flex desktop-hidden mt-sm-2 mt-lg-0 align-items-center"
          >
            <div className="input-wrapper" ref={inputRef}>
              <Input
                id={"search box"}
                placeholder={"Search..."}
                type={"text"}
                value={searchTerm}
                onInputFocus={handleFocus}
                onInputChange={handleInputChange}
              />

              {filteredItems?.length > 0 && (
                <div
                  className={`search-container ${isInFocus ? "active" : ""}`}
                >
                  <ul>
                    {filteredItems?.slice(0, 10).map((item) => (
                      <ActiveLink
                        key={item._id}
                        style={{
                          width: "100%",
                          height: "100%",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        to={`/product/${item._id}`}
                        onClick={() => {
                          setIsInFocus(true);
                          setFilteredItems([]);
                          setSearchTerm("");
                          setIsInFocus(!isInFocus);
                        }}
                      >
                        <li className="d-flex">
                          <img
                            src={item.images[0].url}
                            alt="product thumbnail"
                            className="search-thumbnail"
                          />
                          <div className="product-thumbnail-content ms-4">
                            <h6>{item.name}</h6>
                            <p>${item.price}</p>
                          </div>
                        </li>
                      </ActiveLink>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Col>

          {/* hidden profile dropdown */}
          <Col lg={{ size: 6, order: 3 }} className=" mt-xs-3">
            <Navbar
              color="light"
              light
              expand="sm"
              className="mb-sm-1 mb-sm-0 mb-lg-0 mt-md-0 mt-sm-2"
            >
              <div className="header-content">
                <div className="shop-brands-container">
                  <div className="shop-text">
                    <Link to="/shop">Shop</Link>
                  </div>

                  <div
                    className="brand-drop"
                    ref={dropDownBrandsRef}
                    onClick={handleClickBrands}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        handleClickBrands();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className={`d-flex align-items-center justify-content-center brands-content ${
                        isOverBrands ? "active" : ""
                      }`}
                    >
                      <span className="d-none d-sm-block brand-text">
                        Brands
                      </span>
                      <span>
                        <IoIosArrowDown style={{ fontSize: "20px" }} />
                      </span>
                    </div>

                    {/* hidden dropdown */}
                    <DropdownMenu
                      isOverBrands={isOverBrands}
                      setIsOverBrands={setIsOverBrands}
                      brandsData={brandsData}
                    />
                  </div>
                </div>

                <div className="profile-icons">
                  <div
                    onClick={toggleWishlist}
                    className="wishlist-container"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        toggleWishlist();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="wishlist-icon">
                      <BsHeart />
                      {wishlistItems.length > 0 && (
                        <span className="wishlist-badge">
                          {wishlistItems.length >= 99
                            ? "99+"
                            : wishlistItems.length}
                        </span>
                      )}
                    </span>
                  </div>
                  <div
                    className="cart-container"
                    onClick={toggleCart}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        toggleCart();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="cart-icon">
                      <BsHandbag />
                      {cartItems.length > 0 && (
                        <span className="cart-badge">
                          {cartItems.length >= 99 ? "99+" : cartItems.length}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* ADMIN DROPDOWN PROFILE */}
                  {userInfo && userInfo.role === "ROLE ADMIN" && (
                    <div
                      className="admin-profile-container"
                      onClick={toggleAdminProfile}
                      ref={dropDownRef}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          toggleAdminProfile();
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span
                        className={`admin-profile-icon ${
                          isAtAdmin ? "active" : ""
                        }`}
                      >
                        <GoPersonFill />
                      </span>
                      {isAtAdmin && (
                        <div className="dropdown-admin-menu">
                          {/* Dropdown menu content goes here */}
                          <ul>
                            <NavLink
                              to="/admin/productlist"
                              onClick={toggleAdminProfile}
                            >
                              <li>
                                <span>Products</span>
                              </li>
                            </NavLink>
                            <NavLink
                              to="/admin/orderlist"
                              onClick={toggleAdminProfile}
                            >
                              <li>
                                <span>Orders</span>
                              </li>
                            </NavLink>
                            <NavLink
                              to="/admin/userlist"
                              onClick={toggleAdminProfile}
                            >
                              <li>
                                <span>Users</span>
                              </li>
                            </NavLink>
                            <NavLink
                              className="link-underline-opacity-75-hover"
                              to="/admin/createproduct"
                              onClick={toggleAdminProfile}
                              style={{ backgroundColor: "#fb0000" }}
                            >
                              <li className="border-bottom-0">
                                <span className="fw-bold ">CREATE PRODUCT</span>
                              </li>
                            </NavLink>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    onMouseOver={handleMouseEnter}
                    onMouseOut={handleMouseLeave}
                    onFocus={handleMouseEnter} // Triggered when the element receives focus
                    onBlur={handleMouseLeave} // Triggered when the element loses focus
                    className="profile-container"
                  >
                    <span
                      className={`profile-icon ${isHovering ? "active" : ""}`}
                    >
                      <GoPerson onClick={toggleProfile} />
                    </span>
                    {isHovering && (
                      <ProfileTab
                        logoutHandler={logoutHandler}
                        isHovering={isHovering}
                        setIsHovering={setIsHovering}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Navbar>
          </Col>
        </Row>
      </Container>

      {/* hidden cart drawer */}
      <div
        className={isCartOpen ? "mini-cart-open" : "hidden-mini-cart"}
        aria-hidden={isCartOpen ? false : true}
      >
        <div className="mini-cart">
          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </div>
        <div
          className={
            isCartOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
          }
          onClick={toggleCart}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              toggleCart();
            }
          }}
          role="button"
          tabIndex={0}
        />
      </div>

      {/* hidden menu drawer */}
      <div
        className={isMenuOpen ? "mini-menu-open" : "hidden-mini-menu"}
        aria-hidden={!isMenuOpen}
      >
        <div className="mini-menu">
          <NavigationMenu
            isMenuOpen={isMenuOpen}
            brandsData={brandsData}
            toggleMenu={toggleMenu}
          />
        </div>
        <div
          className={
            isMenuOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
          }
          onClick={toggleMenu}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              toggleMenu();
            }
          }}
          role="button"
          tabIndex={0}
        />
      </div>

      {/* MOBILE NAVIGATION */}

      <div className="navigation">
        <div className="top-nav">
          <div className="top-nav-wrapper">
            <div className="top-nav-box">
              <div className="brand">
                <Link to="/">
                  <h1 className="logo">Goddess Within</h1>
                </Link>
              </div>

              <div className="app-icons">
                <div className="app-icons-box">
                  {/* profile */}
                  <div
                    onMouseOver={handleMouseEnter}
                    onMouseOut={handleMouseLeave}
                    onFocus={handleMouseEnter}
                    onBlur={handleMouseLeave}
                    className="profile-container"
                  >
                    <span
                      className={`profile-icon ${isHovering ? "active" : ""}`}
                      onClick={toggleProfile}
                    >
                      <GoPerson />
                    </span>
                    {isHovering && (
                      <ProfileTab
                        logoutHandler={logoutHandler}
                        isHovering={isHovering}
                        setIsHovering={setIsHovering}
                      />
                    )}
                  </div>

                  {/* admin */}

                  {userInfo && userInfo.role === "ROLE ADMIN" && (
                    <div
                      className="admin-profile-container"
                      onClick={toggleAdminProfile}
                      ref={dropDownRef}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          toggleAdminProfile();
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span
                        className={`admin-profile-icon ${
                          isAtAdmin ? "active" : ""
                        }`}
                      >
                        <GoPersonFill />
                      </span>
                      {isAtAdmin && (
                        <div className="dropdown-admin-menu">
                          {/* Dropdown menu content goes here */}
                          <ul>
                            <NavLink
                              to="/admin/productlist"
                              onClick={toggleAdminProfile}
                            >
                              <li>
                                <span>Products</span>
                              </li>
                            </NavLink>
                            <NavLink
                              to="/admin/orderlist"
                              onClick={toggleAdminProfile}
                            >
                              <li>
                                <span>Orders</span>
                              </li>
                            </NavLink>
                            <NavLink
                              to="/admin/userlist"
                              onClick={toggleAdminProfile}
                            >
                              <li>
                                <span>Users</span>
                              </li>
                            </NavLink>
                            <NavLink
                              className="link-underline-opacity-75-hover"
                              to="/admin/createproduct"
                              onClick={toggleAdminProfile}
                              style={{ backgroundColor: "#fb0000" }}
                            >
                              <li className="border-bottom-0">
                                <span className="fw-bold ">CREATE PRODUCT</span>
                              </li>
                            </NavLink>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* wishlist */}
                  <div
                    onClick={toggleWishlist}
                    className="wishlist-container"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        toggleWishlist();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="wishlist-icon">
                      <BsHeart />
                      {wishlistItems.length > 0 && (
                        <span className="wishlist-badge">
                          {wishlistItems.length >= 99
                            ? "99+"
                            : wishlistItems.length}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* cart */}

                  <div
                    className="cart-container"
                    onClick={toggleCart}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        toggleCart();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="cart-icon">
                      <BsHandbag />
                      {cartItems.length > 0 && (
                        <span className="cart-badge">
                          {cartItems.length >= 99 ? "99+" : cartItems.length}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-nav">
          <div className="bottom-nav-box">
            <div className="menu-icon">
              <span>
                <HiMiniBars3CenterLeft onClick={toggleMenu} />
              </span>
            </div>
            <div className="input-wrapper" ref={inputRef}>
              <Input
                id={"search"}
                placeholder={"Search..."}
                type={"text"}
                value={searchTerm}
                onInputFocus={handleFocus}
                onInputChange={handleInputChange}
              />

              {filteredItems?.length > 0 && (
                <div
                  className={`search-container ${isInFocus ? "active" : ""}`}
                >
                  <ul>
                    {filteredItems?.slice(0, 10).map((item) => (
                      <NavLink
                        key={item._id}
                        style={{
                          width: "100%",
                          height: "100%",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        to={`/product/${item._id}`}
                        onClick={() => {
                          setIsInFocus(true);
                          setFilteredItems([]);
                          setSearchTerm("");
                          setIsInFocus(!isInFocus);
                        }}
                      >
                        <li className="d-flex">
                          <img
                            src={item.images[0].url}
                            alt="product thumbnail"
                            className="search-thumbnail"
                          />
                          <div className="product-thumbnail-content ms-4">
                            <h6>{item.name}</h6>
                            <p>${item.price}</p>
                          </div>
                        </li>
                      </NavLink>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
