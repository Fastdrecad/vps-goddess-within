import { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/common/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../components/common/Message";
import Button from "../components/common/Button";
import { useCreateOrderMutation } from "../redux/slices/ordersApiSlice";
import Loader from "../components/common/Loader";
import { clearCartItems } from "../redux/slices/cartSlice";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {/* Top of the page */}
      <CheckoutSteps step1 step2 step3 step4 />
      {/* Left Column */}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className="mt-4">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/product/${item.product}`}
                      className="mb-3 pb-2 border-bottom"
                    >
                      <ListGroup.Item className="p-0 pe-2 border-0">
                        <Row className="align-items-center">
                          <Col md={2} className="">
                            <Image
                              src={item.images[0].url}
                              alt={item.name}
                              fluid
                            />
                          </Col>
                          <Col>
                            <h5 className="mt-3 one-line-ellipsis fw-medium">
                              {item.name}
                            </h5>
                            <h6>Size: {item?.size}</h6>
                            <h6>{item?.description[0]?.material}</h6>
                          </Col>
                          <Col md={6}>
                            <p className="text-end fw-bold">
                              {item.qty} x {item.price}€ ={" "}
                              {(item.qty * (item.price * 100)) / 100}€
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </Link>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        {/* Right Column */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col className="text-end"> {cart.itemsPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col className="text-end"> {cart.shippingPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col className="text-end"> {cart.taxPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="fw-bold fs-6">Total</Col>
                  <Col className="fw-bold fs-6 text-end">
                    {cart.totalPrice}€
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant="danger">
                    {error?.data?.message || error.error}
                  </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="danger"
                  text="Place Order"
                  size="lg"
                  className="checkout"
                  disabled={cart.cartItems.length === 0}
                  onClick={handlePlaceOrder}
                />

                {isLoading && (
                  <Row className="align-items-center justify-content-center">
                    <Loader />
                  </Row>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
