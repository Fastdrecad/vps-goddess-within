import { Link, useNavigate } from "react-router-dom";
import AddToWishList from "./AddToWishList";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../redux/slices/wishlistSlice";

const ProductCard = ({ product, type }) => {
  const dispatch = useDispatch();
  const productId = product?._id;
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state?.wishlist);

  const updateWishList = (product) => {
    if (userInfo) {
      dispatch(toggleWishlistItem(product));
    } else {
      console.log("please login", userInfo);
      navigate("/login");
    }
  };

  return (
    <div className="card-item">
      <article className="product-container">
        <div className="add-wishlist-box">
          <AddToWishList
            id={productId}
            product={product}
            liked={
              (wishlistItems?.some((item) => item._id === productId) &&
                userInfo?._id) ??
              false
            }
            updateWishlist={updateWishList}
            enabled={userInfo}
            authenticated={userInfo}
          />
        </div>

        <Link to={`/product/${product._id}`}>
          <figure className="item-container">
            <div className="item-wrapper">
              <div className="item-image-box">
                {product?.isDeal && <span className="item-deal">Deal</span>}
                {product?.isNewProduct && <span className="item-new">New</span>}
                {[0, 1].map((index) => (
                  <img
                    key={index}
                    className={`item-image-${index + 1}`}
                    src={
                      product.images[index]?.medium ||
                      "/images/placeholder-image.png"
                    }
                    alt=""
                  />
                ))}
              </div>
            </div>
          </figure>
        </Link>
        <div
          className="item-body"
          style={{
            color: type === "featured" ? "#ffffff" : "#000000"
          }}
        >
          <div className="card-item-details py-2">
            <span className="item-name">{product.name}</span>
            <span className="item-title">{product.title}</span>
          </div>

          <span
            className="item-price"
            style={{ color: product.discount ? "red" : "inherit" }}
          >
            {new Intl.NumberFormat("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(product.price)}{" "}
            €
          </span>

          {product.discount > 0 && (
            <div className="item-originally-price py-1">
              <span className="item-originally">
                Originally:{"  "}
                {new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(
                  Math.floor(
                    (product.price / (1 - product.discount / 100)) * 100
                  ) / 100
                )}
                €
              </span>
              <span className="item-discount">-{product.discount}%</span>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ProductCard;
