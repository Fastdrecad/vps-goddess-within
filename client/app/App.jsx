import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/Navigation";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ShippingPage from "./pages/ShippingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PaymentPage from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ShopPage from "./pages/ShopPage";
import Footer from "./components/Footer";
import PrivateRoute from "./components/common/PrivateRoute";
import GoToTop from "./components/common/GoToTop";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import WishListPage from "./pages/WishListPage";
import BrandsPage from "./pages/BrandsPage";
import AdminRoute from "./components/common/AdminRoute";
import OrderListPage from "./pages/admin/OrderListPage";
import ProductListPage from "./pages/admin/ProductListPage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import UserListPage from "./pages/admin/UserListPage";
import UserEditPage from "./pages/admin/UserEditPage";
import { SlugProvider } from "./contexts/SlugContext";
import BrandsShop from "./components/common/BrandsShop";
import { useEffect } from "react";
import CreateProductPage from "./pages/admin/CreateProductPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainContent() {
  const location = useLocation();
  const isSpecialPage = ["/", "/wishlist"].includes(location.pathname);

  return (
    <main className="main">
      {isSpecialPage ? (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wishlist" element={<WishListPage />} />
          </Routes>
        </>
      ) : (
        <div className="container">
          <div className="wrapper">
            <Routes>
              <Route element={<WishListPage />} path="/wishlist" />
              <Route element={<PrivateRoute />}>
                <Route element={<ProfilePage />} path="/profile" />
                <Route element={<ShippingPage />} path="/shipping" />
                <Route element={<PaymentPage />} path="/payment" />
                <Route element={<OrderPage />} path="/order/:id" />
                <Route element={<PlaceOrderPage />} path="/placeorder" />
              </Route>
              <Route element={<AdminRoute />}>
                <Route element={<UserListPage />} path="/admin/userlist" />
                <Route element={<UserEditPage />} path="/admin/user/:id/edit" />
                <Route element={<OrderListPage />} path="/admin/orderlist" />
                <Route
                  element={<CreateProductPage />}
                  path="/admin/createproduct"
                />
                <Route
                  element={<ProductListPage />}
                  path="/admin/productlist"
                />
                <Route
                  element={<ProductEditPage />}
                  path="/admin/product/:id/edit"
                />
              </Route>

              <Route path="/" element={<HomePage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/shop/*" element={<ShopPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/brand/:slug" element={<BrandsShop />} />
            </Routes>
          </div>
        </div>
      )}
    </main>
  );
}

function App() {
  return (
    <div className="app">
      <PayPalScriptProvider deferLoading={true}>
        <Router>
          <ScrollToTop />
          <SlugProvider>
            <Navigation />
            <MainContent />
          </SlugProvider>
          <GoToTop />
          <Footer />
        </Router>
        <ToastContainer />
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
