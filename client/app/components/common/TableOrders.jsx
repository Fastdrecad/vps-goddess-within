import { Fragment } from "react";
import SortableTable from "./SortableTable";
import { CgDetailsMore } from "react-icons/cg";
import { LinkContainer } from "react-router-bootstrap";
import Button from "./Button";
import { FaTimes } from "react-icons/fa";

const TableOrders = (props) => {
  const { orders } = props;

  // Configuration of columns
  const config = [
    { label: "ID", render: (order) => order._id },
    {
      label: "DATE",
      render: (order) => order.createdAt.substring(0, 10)
    },
    {
      label: "TOTAL",
      render: (order) => order.totalPrice,
      sortValue: (order) => order.totalPrice
    },
    {
      label: "PAID",
      render: (order) =>
        order.isPaid ? (
          order.paidAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: "red" }} />
        ),
      sortValue: (order) =>
        order.isPaid ? order.paidAt.substring(0, 10) : false
    },
    {
      label: "DELIVERED",
      render: (order) =>
        order.isDelivered ? (
          order.deliveredAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: "red" }} />
        ),
      sortValue: (order) =>
        order.isDelivered ? order.deliveredAt.substring(0, 10) : false
    },
    {
      label: "",
      render: (order) => (
        <Fragment>
          <LinkContainer to={`/order/${order._id}`} className="mx-2">
            <Button
              variant="primary"
              size="lg"
              icon={
                <CgDetailsMore
                  style={{ fontSize: "16px", color: "#fff" }}
                  className="mx-2"
                />
              }
            />
          </LinkContainer>
        </Fragment>
      )
    }
  ];

  const keyFn = (order) => {
    return order.name;
  };
  return (
    <div className="border-black border-1 border">
      <SortableTable data={orders} config={config} keyFn={keyFn} />
    </div>
  );
};

export default TableOrders;
