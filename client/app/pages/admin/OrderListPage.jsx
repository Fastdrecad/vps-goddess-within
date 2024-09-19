import { useGetOrdersQuery } from "../../redux/slices/ordersApiSlice";
import { Col, Row } from "react-bootstrap";
import Loader from "../../components/common/Loader";
import Message from "../../components/common/Message";
import TableOrders from "../../components/common/TableOrders";
import Pagination from "../../components/common/Pagination";
import { useState } from "react";

// TODO: CONTROL OF THE LIMIT
const limit = 5;

const OrderListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error, refetch } = useGetOrdersQuery({
    page: pageNumber,
    limit
  });

  const displayPagination = data?.totalPages > 1;
  const left = limit * (data?.currentPage - 1) + 1;
  const totalOrders = data?.orders.length;
  const right = totalOrders + left - 1;

  const handlePagination = (pageNumber) => {
    setPageNumber(pageNumber);
    refetch();
  };

  if (error) {
    return <Message variant="danger">No orders found.</Message>;
  }

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Row className="align-items-center justify-content-center">
          <Loader />
        </Row>
      ) : (
        <>
          <Row className="mx-0 text-end">
            <Col className="pe-0 pb-2 pt-3 fw-bolder">
              <span>Showing: </span>
              {data?.totalOrders > 0
                ? `${left}-${right} orders of ${data?.totalOrders} orders`
                : `${data?.totalOrders} orders`}
            </Col>
          </Row>

          <TableOrders orders={data?.orders} />

          {displayPagination && (
            <div className="d-flex justify-content-center text-center mt-4">
              <Pagination
                totalPages={data?.totalPages}
                onPagination={handlePagination}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderListPage;
