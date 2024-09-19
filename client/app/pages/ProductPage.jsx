import { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Form } from "react-bootstrap";
import {
  useCreateReviewMutation,
  useGetProductQuery
} from "../redux/slices/productsApiSlice";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import Message from "../components/common/Message";
import Thumbnail from "../components/common/Thumbnail";
import Dropdown from "../components/common/Dropdown";
import Button from "../components/common/Button";
import AddToWishList from "../components/common/AddToWishList";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProductWithSelectedSize } from "../utils/productUtils";
import { areProductsEqual } from "../utils/cartUtils";
import Rating from "../components/common/Rating";
import { toast } from "react-toastify";
import { toggleWishlistItem } from "../redux/slices/wishlistSlice";
import Meta from "../components/common/Meta";

const style = {
  fontSize: "1.5rem",
  color: "red",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const title = { size: "Choose your size" };

const ProductPage = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [err, setErr] = useState(null);
  const [size, setSize] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    refetch,
    error
  } = useGetProductQuery(productId);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const updateWishList = (product) => {
    if (userInfo) {
      dispatch(toggleWishlistItem(product));
    } else {
      console.log("Please login", userInfo);
    }
  };

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const sizes = product?.sizes?.map((item) => {
    return { label: item.size, value: item.size };
  });

  const selectedSize = size?.value;

  const handleChangeSize = (size) => {
    setIsButtonDisabled(false);
    setErr(false);
    setSize(size);
    const selectedSizeProduct = getProductWithSelectedSize(
      product,
      size?.value
    );
    const { quantity } = selectedSizeProduct.sizes[0];
    if (cartItems.length === 0) {
      setSize(size);
      setQty(1);
    }

    const existsItem = cartItems.find((item) =>
      areProductsEqual(item, selectedSizeProduct)
    );

    if (!existsItem) {
      setQty(1);
    } else if (existsItem) {
      const { qty } = existsItem;
      qty === quantity &&
        setErr(
          "All items are already in the cart. Please choose different size."
        );
      setIsButtonDisabled(true);
    } else {
      setQty(qty);
    }
  };

  const addToCartHandler = () => {
    if (size === null) {
      setErr("Please choose your size");
      setIsButtonDisabled(true);
      return;
    }
    const selectedSizeProduct = getProductWithSelectedSize(
      product,
      selectedSize
    );
    const productSizeQuantity = selectedSizeProduct.sizes[0].quantity;

    if (qty <= productSizeQuantity) {
      setQty((prev) => prev + 1);
      dispatch(addToCart({ ...selectedSizeProduct, qty, size: selectedSize }));
      toast.success("Product added to bag.");
    } else {
      setErr("Our collection is out of stock");
      setIsButtonDisabled(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="product-shop">
      <div className="mb-3">
        <Link className="redirect-link" to="/shop">
          <span>Back to Shop</span>
        </Link>
      </div>
      {isLoading ? (
        <Row className="align-items-center justify-content-center">
          <Loader />
        </Row>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta
            title={product.name
              .toLowerCase()
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          />
          <Row className="flex-row">
            {/* First Column */}
            <Col xs="12" md="6" lg="6">
              <div className="product-gallery">
                <div className="image-preview">
                  <Thumbnail
                    product={product}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                  />
                </div>
                <div className="main-image">
                  <img
                    src={product?.images[selectedImg]?.medium}
                    alt={product?.name}
                  />
                </div>
              </div>
            </Col>

            {/* Second Column */}
            <Col xs="12" md="6" lg="6">
              <div className="product-container-box">
                <div className="item-box">
                  <div className="item-details">
                    <h1 className="item-name one-line-ellipsis">
                      {product?.name}
                    </h1>
                    <h1 className="item-title ">{product?.title}</h1>
                    <div className="item-description">
                      {product?.description?.material && (
                        <p className="item-desc one-line-ellipsis">
                          <strong>Material: </strong>{" "}
                          {product?.description?.material}
                        </p>
                      )}
                      {product?.description?.material && (
                        <p className="item-desc one-line-ellipsis">
                          <strong>Fabric: </strong>{" "}
                          {product?.description?.fabric}
                        </p>
                      )}
                      {product?.description?.material && (
                        <p className="item-desc one-line-ellipsis">
                          <strong>Care Instruction: </strong>{" "}
                          {product?.description?.careInstructions}
                        </p>
                      )}
                    </div>
                    {product?.discount ? (
                      <span className="item-price" style={{ color: "red" }}>
                        {new Intl.NumberFormat("de-DE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(product.price)}{" "}
                        €
                      </span>
                    ) : (
                      <span className="item-price">
                        {new Intl.NumberFormat("de-DE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(product.price)}{" "}
                        €
                      </span>
                    )}
                    {product?.discount && (
                      <h3 className="item-originally-price">
                        <span className="item-originally">
                          Originally:{"  "}
                          {new Intl.NumberFormat("de-DE", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }).format(
                            Math.floor(
                              (product?.price / (1 - product?.discount / 100)) *
                                100
                            ) / 100
                          )}
                          €
                        </span>
                        <span className="item-discount">
                          -{product?.discount}%
                        </span>
                      </h3>
                    )}
                  </div>

                  {err && (
                    <p className="d-flex py-2 px-0 mt-2 align-items-center bg-light">
                      <AiFillCloseCircle style={style} />
                      {err}
                    </p>
                  )}
                  <Dropdown
                    options={sizes}
                    title={title.size}
                    value={size}
                    onChange={handleChangeSize}
                    style={{ width: "100% !important" }}
                  />
                  <div className="button-content">
                    <Button
                      variant="primary"
                      text="Add to Bag"
                      size="lg"
                      disabled={isButtonDisabled}
                      onClick={addToCartHandler}
                    />
                    <AddToWishList
                      id={productId}
                      product={product}
                      liked={
                        (wishlistItems?.some(
                          (item) => item._id === productId
                        ) &&
                          userInfo?._id) ??
                        false
                      }
                      updateWishlist={updateWishList}
                      enabled={userInfo}
                      authenticated={userInfo}
                    />
                  </div>

                  <h2 className="h1 mt-4 text-center">Reviews</h2>
                  {product.reviews.length === 0 && (
                    <Message>No Reviews</Message>
                  )}
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="p-0">
                      <h2 className="mt-4">Write a Customer Review</h2>

                      {loadingProductReview && (
                        <Row className="align-items-center justify-content-center">
                          <Loader />
                        </Row>
                      )}

                      {userInfo ? (
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="my-2 " controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              className="rounded-0 border-black"
                              as="select"
                              required
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option>Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="my-3" controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              className="rounded-0 border-black"
                              as="textarea"
                              row="3"
                              required
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            variant="primary"
                            text="Submit"
                            size="lg"
                            type="submit"
                            disabled={loadingProductReview}
                            className="mb-5"
                          />
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="review"></Row>
        </>
      )}
    </div>
  );
};

export default ProductPage;
