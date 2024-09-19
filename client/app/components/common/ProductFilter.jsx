import {
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  Label
} from "reactstrap";
import Dropdown from "./Dropdown";
import RangeSlider from "./RangeSlider";
import { useGetCategoriesListQuery } from "../../redux/slices/categoryApiSlice";
import Button from "./Button";
import { useState } from "react";

const sizes = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" }
];

const title = { size: "Filter by size", price: "Sort by price" };

const priceMarks = {
  1: { label: <p className="fw-normal text-black">$1</p> },
  5000: { label: <p className="fw-normal text-black">$5000</p> }
};

const rateMarks = {
  0: {
    label: (
      <span>
        <span className="me-1">5</span>
        <i
          className="fa fa-star fa-1x"
          style={{ display: "contents" }}
          aria-hidden="true"
        ></i>
      </span>
    )
  },
  20: {
    label: (
      <span>
        <span className="me-1">4</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  40: {
    label: (
      <span>
        <span className="me-1">3</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  60: {
    label: (
      <span>
        <span className="me-1">2</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  80: {
    label: (
      <span>
        <span className="me-1">1</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  100: { label: <span>Any</span> }
};

const ratingCase = (v) => {
  switch (v) {
    case 100:
      return 0;
    case 80:
      return 1;
    case 60:
      return 2;
    case 40:
      return 3;
    case 20:
      return 4;
    default:
      0;
      return 5;
  }
};

const ProductFilter = ({
  size,
  setSize,
  setPrice,
  setRating,
  selectedCategories,
  setSelectedCategories,
  refetch
}) => {
  const { data: categoryData } = useGetCategoriesListQuery();
  const [priceKey, setPriceKey] = useState(0);
  const [ratingKey, setRatingKey] = useState(0);

  const handleChangeSize = (size) => {
    setSize(size);
  };

  const handlePriceChange = (value) => {
    setPrice(value.join("-"));
  };

  const handleRatingChange = (value) => {
    setRating(ratingCase(value));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCategories(
      isChecked
        ? [...selectedCategories, value]
        : selectedCategories?.filter((item) => item !== value)
    );
    refetch();
  };

  const handleClick = () => {
    setSize(null);
    setSelectedCategories([]);
    setPriceKey((prevKey) => prevKey + 1); // Increment key to force re-render
    setRatingKey((prevKey) => prevKey + 1); // Increment key to force re-render
    refetch();
  };

  return (
    <div className="product-filter">
      <Card className="mb-3 rounded-0">
        <CardHeader tag="h3" className="bg-white">
          Category
        </CardHeader>
        <CardBody>
          {categoryData?.categories?.map((item) => (
            <InputGroup key={item._id}>
              <Input
                type="checkbox"
                id={item._id}
                value={item._id}
                checked={selectedCategories.includes(item._id)}
                onChange={handleChange}
              />
              <Label htmlFor={item._id} className="mx-2 user-select-none">
                {item.name}
              </Label>
            </InputGroup>
          ))}
        </CardBody>
      </Card>

      <Card className="mb-4 rounded-0">
        <CardHeader tag="h3" className="bg-white">
          Size
        </CardHeader>
        <CardBody className="p-0">
          <Dropdown
            options={sizes}
            value={size}
            onChange={handleChangeSize}
            title={title.size}
          />
        </CardBody>
      </Card>
      <Card className="mb-4 rounded-0">
        <CardHeader tag="h3" className="bg-white">
          Price
        </CardHeader>
        <CardBody className="mx-2 mb-3">
          <RangeSlider
            key={priceKey}
            marks={priceMarks}
            defaultValue={[1, 2500]}
            max={5000}
            onChange={handlePriceChange}
          />
        </CardBody>
      </Card>
      <Card className="mb-4 rounded-0">
        <CardHeader tag="h3" className="bg-white">
          Rating
        </CardHeader>
        <CardBody className="mx-2 mb-4">
          <RangeSlider
            key={ratingKey}
            type="slider"
            marks={rateMarks}
            step={20}
            onChange={handleRatingChange}
          />
        </CardBody>
      </Card>
      <Card className="rounded-0">
        <CardHeader tag="h3" className="bg-white">
          Filters
        </CardHeader>
        <CardBody className="mx-2 ">
          <Button
            type="submit"
            variant="primary"
            text="CLEAR FILTERS"
            size="lg"
            onClick={handleClick}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductFilter;
