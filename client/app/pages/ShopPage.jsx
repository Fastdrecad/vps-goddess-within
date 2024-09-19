import { useState } from "react";
import { useEffect } from "react";
import { useGetFilteredProductsQuery } from "../redux/slices/productsApiSlice";
import { Row, Col } from "reactstrap";
import ProductFilter from "../components/common/ProductFilter";
import ProductsShop from "../components/common/ProductsShop";
import Pagination from "../components/common/Pagination";
import Dropdown from "../components/common/Dropdown";
import Meta from "../components/common/Meta";

const sortByPrice = [
  { label: "Newest First", value: "createdAt" },
  { label: "PRICE (ASC)", value: "asc" },
  { label: "PRICE (ASC)", value: "asc" }
];

// TODO: CONTROL THE LIMIT
const limit = 12;

const ShopPage = () => {
  const [value, setValue] = useState(null);
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch filtered products
  const { data, error, isLoading, refetch } = useGetFilteredProductsQuery({
    size: size?.value,
    sort: value?.value,
    rating,
    price,
    categories: selectedCategories,
    page: pageNumber,
    limit
  });

  const displayPagination = data?.totalPages > 1;
  const left = limit * (data?.currentPage - 1) + 1;
  const totalProducts = data?.products.length;
  const right = totalProducts + left - 1;

  const handleChangePrice = (option) => {
    setValue(option);
  };

  useEffect(() => {
    document.body.classList.add("shop-page");

    return () => document.body.classList.remove("shop-page");
  }, []);

  const handlePagination = (pageNumber) => {
    window.scrollTo(0, 0);
    setPageNumber(pageNumber);
    refetch();
  };

  return (
    <div className="shop">
      <Meta title="Goddess within" />
      <h1>Women’s Products</h1>
      <Row xs="12">
        <Col
          xs={{ size: 12, order: 1 }}
          sm={{ size: 12, order: 1 }}
          md={{ size: 12, order: 1 }}
          lg={{ size: 3, order: 1 }}
        >
          <ProductFilter
            size={size}
            setSize={setSize}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            refetch={refetch}
          />
        </Col>
        <Col
          xs={{ size: 12, order: 2 }}
          sm={{ size: 12, order: 2 }}
          md={{ size: 12, order: 2 }}
          lg={{ size: 9, order: 2 }}
        >
          <Row className="align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 shop-toolbar">
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 5, order: 1 }}
              lg={{ size: 6, order: 1 }}
              className="text-center text-md-start mt-3 mt-md-0 mb-1 mb-md-0"
            >
              <span>Showing: </span>
              {totalProducts > 0
                ? `${left}-${right} products of ${data?.totalProducts} products`
                : `${data?.totalProducts} products`}
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 2, order: 2 }}
              lg={{ size: 2, order: 2 }}
              className="text-end pr-0 d-none d-md-block"
            >
              <span>Sort by</span>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 4, order: 2 }}
              className="my-2"
            >
              <Dropdown
                style={{ margin: 0 }}
                options={sortByPrice}
                value={value}
                onChange={handleChangePrice}
                title={"Newest First"}
              />
            </Col>
          </Row>

          <ProductsShop
            products={data?.products}
            isLoading={isLoading}
            error={error}
          />

          {displayPagination && (
            <div className="d-flex justify-content-center text-center mt-4">
              <Pagination
                totalPages={data?.totalPages}
                onPagination={handlePagination}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ShopPage;
