import { useState } from "react";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Message from "../../components/common/Message";
import Meta from "../../components/common/Meta";
import Pagination from "../../components/common/Pagination";
import TableProducts from "../../components/common/TableProducts";

import {
  useDeleteProductMutation,
  useGetFilteredProductsQuery
} from "../../redux/slices/productsApiSlice";
import { useGetBrandsListQuery } from "../../redux/slices/brandApiSlice";
import { useGetCategoriesQuery } from "../../redux/slices/categoryApiSlice";

// TODO: CONTROL OF THE LIMIT
const limit = 12;

const ProductListPage = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: products,
    isLoading: loadingProducts,
    error: productsError,
    refetch
  } = useGetFilteredProductsQuery({ page: pageNumber, limit });

  const displayPagination = products?.totalPages > 1;
  const left = limit * (products?.currentPage - 1) + 1;
  const totalProducts = products?.products.length;
  const right = totalProducts + left - 1;

  const handleCreateProduct = () => {
    navigate("/admin/createproduct");
  };

  const handlePagination = (pageNumber) => {
    setPageNumber(pageNumber);
    refetch();
  };

  const {
    data: categoriesData,
    isLoading: loadingCategories,
    error: categoriesError
  } = useGetCategoriesQuery();

  const {
    data: brandsData,
    isLoading: loadingBrands,
    error: brandsError
  } = useGetBrandsListQuery();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // combine products with categories, and brands
  const combinedData = products?.products.map((product) => {
    const category = categoriesData?.categories.find(
      (cat) => cat._id === product.category
    );

    const brand = brandsData?.brands.find(
      (brand) => brand._id === product.brand
    );

    return {
      ...product,
      category: category?.name,

      brand: brand?.name
    };
  });

  if (loadingDelete || loadingProducts || loadingCategories || loadingBrands) {
    return <Loader />;
  }

  if (productsError || categoriesError || brandsError) {
    return (
      <Message variant="danger">
        {productsError?.data?.message ||
          categoriesError?.data?.message ||
          brandsError?.data?.message ||
          "An error occurred"}
      </Message>
    );
  }

  return (
    <>
      <Row className="align-items-baseline">
        <Meta title="Goddess within product list" />
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            onClick={handleCreateProduct}
            className="create-product-btn"
            variant="primary"
            text="Create Product"
            size="md"
          />
        </Col>
      </Row>
      <Row className="mx-0 text-end">
        <Col className="pe-0 pb-2 pt-3 fw-bolder">
          <span>Showing: </span>
          {totalProducts > 0
            ? `${left}-${right} products of ${products?.totalProducts} products`
            : `${products?.totalProducts} products`}
        </Col>
      </Row>

      <TableProducts combinedData={combinedData} handleDelete={handleDelete} />

      {displayPagination && (
        <div className="d-flex justify-content-center text-center mt-4">
          <Pagination
            totalPages={products?.totalPages}
            onPagination={handlePagination}
          />
        </div>
      )}
    </>
  );
};

export default ProductListPage;
