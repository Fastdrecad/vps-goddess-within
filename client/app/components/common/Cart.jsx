import CartSlideItem from "./CartSlideItem";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shipping = 5.99;
  const totalVAT = subtotal > 100 ? subtotal : subtotal + shipping;

  const handleCheckout = () => {
    navigate("/cart");
    setIsCartOpen(!isCartOpen);
  };

  const handleClick = () => {
    navigate("/shop");
    setIsCartOpen(!isCartOpen);
  };
  const handleClose = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="cart">
          <div className="cart-header py-4">
            <h1 className="ps-4 m-0">Your Bag</h1>
            <IoCloseOutline
              onClick={handleClose}
              style={{
                fontSize: "30px",
                color: "black",
                cursor: "pointer",
                marginRight: "10px"
              }}
            />
          </div>
          <div className="cart-body">
            <div className="cart-container">
              <div className="inner-drawer">
                <ul className="item-container">
                  {cartItems?.map((item, i) => (
                    <li key={i} className="item-list">
                      <CartSlideItem
                        item={item}
                        id={item._id}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        img={item.images[0].url}
                        size={item.sizes[0].size}
                        qty={item.qty}
                        wishlistItems={wishlistItems}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="total">
                <div className="total-cost">
                  <span className="fw-bold">Subtotal</span>
                  <span>
                    <b>{totalVAT.toFixed(2)} €</b>
                  </span>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  text="continue shopping"
                  size="lg"
                  onClick={handleClick}
                />
                <Button
                  type="submit"
                  variant="danger"
                  text="Go to Bag"
                  size="lg"
                  className="checkout"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="cart">
            <div className="cart-header py-4">
              <h1 className="ps-4 m-0">Your Bag</h1>
              <IoCloseOutline
                onClick={handleClose}
                style={{
                  fontSize: "30px",
                  color: "black",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              />
            </div>
            <div className="empty-cart">
              <HiOutlineShoppingBag
                style={{
                  fontSize: "45px",
                  marginBottom: "10px",
                  color: "black",
                  paddingTop: "5px",
                  paddingBottom: "5px"
                }}
              />
              <h2>Your shopping cart is empty</h2>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
