import { Row, Col, ListGroup, Card } from "react-bootstrap";
import CartItem from "../components/common/CartItem";
import Button from "../components/common/Button";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/common/Message";
import Meta from "../components/common/Meta";

const CartPage = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const shipping = 5.99;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const totalVAT = subtotal > 100 ? subtotal : subtotal + shipping;

  useEffect(() => {
    document.body.classList.add("cart-page");
    return () => document.body.classList.remove("cart-page");
  }, []);

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="cart-shop">
      <Meta title="Goddess within" />
      <Row>
        {/* Left Column */}
        <Col md={8}>
          <div className="bag-content">
            <h1 className="m-0 my-4 my-sm-3">
              Your Bag (
              {cartItems.length < 1
                ? ""
                : cartItems.length === 1
                  ? `${cartItems.length} item`
                  : `${cartItems.length} items`}
              )
            </h1>
            {cartItems.length === 0 ? (
              <Message className="btn border-2 mt-sm-5 mt-lg-3 mb-5 btn-outline-dark btn-no-radius secondary">
                Your Bag is empty -{" "}
                <Link to="/shop" className="fw-bold text-decoration-underline">
                  {" "}
                  Back to Shop
                </Link>
              </Message>
            ) : (
              <>
                <p className="fw-medium">
                  Parcel will be delivered by GODDESS WITHIN
                </p>
                <div className="item-info">
                  <div className="item-container">
                    {cartItems?.map((item) => (
                      <CartItem
                        item={item}
                        key={item._id + Math.random()}
                        id={item._id}
                        title={item.title}
                        desc={item.description}
                        price={item.price}
                        img={item.images[0].url}
                        size={item.sizes[0].size}
                        qty={item.qty}
                        wishlistItems={wishlistItems}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Col>

        {/* Right Column*/}
        <Col md={4}>
          <Card className="border-0 rounded-0">
            <ListGroup variant="flush" className="pt-2">
              <ListGroup.Item>
                <h1 className="m-0 my-5 my-sm-2">Order Summary</h1>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Subtotal</Col>
                  <Col className="text-end">{subtotal.toFixed(2)} €</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col className="text-end">
                    {subtotal > 100 ? "0" : shipping} €
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className="fw-bold fs-6">Total (VAT included)</Col>
                  <Col className="text-end fw-bold fs-6 ">
                    {totalVAT.toFixed(2)} €
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  variant="danger"
                  text="Checkout Now"
                  size="lg"
                  className="checkout"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
