import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FeaturedProducts from "../components/common/FeaturedProducts";
import { Container } from "react-bootstrap";
import Meta from "../components/common/Meta";
import ProductCard from "../components/common/ProductCard";

const WishListPage = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="wishlist-page">
      {userInfo && (
        <>
          <Meta title="your wishlist" />
          <Container>
            <div className="wrapper">
              <Link
                className="btn border-1  mt-sm-5 mt-lg-3 mb-3 btn-outline-dark btn-no-radius"
                to="/shop"
              >
                Back
              </Link>
              {wishlistItems.length > 0 ? (
                <>
                  <h1>Liked Items</h1>
                  <div className="liked-items my-4">
                    <div className="liked-container">
                      {wishlistItems?.map((product) => (
                        <ProductCard product={product} key={product._id} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="fs-2">
                    Explore our products and add items to your wishlist for
                    display here.
                  </h1>
                </>
              )}
            </div>
          </Container>

          <FeaturedProducts type="trending" />
        </>
      )}
    </div>
  );
};

export default WishListPage;
