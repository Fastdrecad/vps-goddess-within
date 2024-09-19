import Loader from "./Loader";
import ProductList from "./ProductList";
import NotFound from "./NotFound";
import { Link, useParams } from "react-router-dom";
import { useGetFilteredProductsByBrandQuery } from "../../redux/slices/productsApiSlice";
import { useBrandSlug } from "../../contexts/useBrandSlug";

const BrandsShop = () => {
  const { slug } = useParams();
  const { setBrandSlug } = useBrandSlug();

  // Fetch filtered products by brandSlug
  const {
    data: brandData,
    error: brandError,
    isLoading: brandIsLoading
  } = useGetFilteredProductsByBrandQuery({
    brandSlug: slug
  });

  return (
    <div className="brands-shop">
      <h3 className="text-uppercase fs-2 fw-bold mb-4">
        Explore&nbsp;&nbsp;&nbsp;
        <Link
          to="/brands"
          className="redirect-link fs-2 mb-5 fw-bold  text-uppercase"
        >
          {slug}
        </Link>
      </h3>
      {brandIsLoading ? (
        <Loader />
      ) : brandError ? (
        <NotFound message="Brand not found" />
      ) : (
        <ProductList products={brandData?.products} />
      )}
    </div>
  );
};

export default BrandsShop;
