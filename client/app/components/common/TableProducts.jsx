import { Fragment } from "react";
import SortableTable from "./SortableTable";
import { Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Button from "./Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const TableProducts = (props) => {
  const { combinedData: products, handleDelete } = props;

  // Configuration of columns
  const config = [
    { label: "ID", render: (product) => product._id },
    {
      label: "THUMBNAIL",
      render: (product) => (
        <Image
          style={{
            width: "32px",
            height: "32px",
            objectFit: "cover",
            objectPosition: "top"
          }}
          src={product.images[0]?.thumbnail}
          alt={product?.name}
          fluid
        />
      )
    },
    {
      label: "NAME",
      render: (product) => product.name,
      sortValue: (product) => product.name
    },
    {
      label: "PRICE",
      render: (product) => product.price,
      sortValue: (product) => product.price
    },
    {
      label: "CATEGORY",
      render: (product) => product.category,
      sortValue: (product) => product.category
    },
    {
      label: "BRAND",
      render: (product) => product.brand,
      sortValue: (product) => product.brand
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

  const keyFn = (product) => {
    return product.name;
  };
  return (
    <div className="border-black border-1 border">
      <SortableTable data={products} config={config} keyFn={keyFn} />
    </div>
  );
};

export default TableProducts;
