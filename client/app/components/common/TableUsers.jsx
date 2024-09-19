import { Fragment } from "react";
import SortableTable from "./SortableTable";
import { CgDetailsMore } from "react-icons/cg";
import { LinkContainer } from "react-router-bootstrap";
import Button from "./Button";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";

const TableOrders = (props) => {
  const { users, handleDelete } = props;

  // Configuration of columns
  const config = [
    { label: "ID", render: (user) => user._id },
    {
      label: "NAME",
      render: (user) => `${user.firstName + ` ` + user.lastName}`,
      sortValue: (user) => `${user.firstName + ` ` + user.lastName}`
    },
    {
      label: "EMAIL",
      render: (user) => user.email,
      sortValue: (user) => user.email
    },
    {
      label: "ADMIN",
      render: (user) =>
        user.role === "ROLE ADMIN" ? (
          <FaCheck style={{ color: "green" }} />
        ) : (
          <FaTimes style={{ color: "red" }} />
        ),
      sortValue: (user) => user.role === "ROLE ADMIN"
    },

    {
      label: "",
      render: (product) => (
        <Fragment>
          <LinkContainer
            to={`/admin/product/${product._id}/edit`}
            className="mx-2"
          >
            <Button
              variant="primary"
              size="lg"
              icon={
                <FaEdit
                  style={{ fontSize: "16px", color: "#fff" }}
                  className="mx-2"
                />
              }
            />
          </LinkContainer>

          <Button
            onClick={() => handleDelete(product._id)}
            variant="danger"
            size="lg"
            icon={
              <FaTrash
                style={{ fontSize: "16px", color: "#fff" }}
                className="mx-2"
              />
            }
          />
        </Fragment>
      )
    }
  ];

  const keyFn = (user) => {
    return user.name;
  };
  return (
    <div className="border-black border-1 border">
      <SortableTable data={users} config={config} keyFn={keyFn} />
    </div>
  );
};

export default TableOrders;
