import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImagesMutation
} from "../../redux/slices/productsApiSlice";
import { useGetCategoriesQuery } from "../../redux/slices/categoryApiSlice";
import { useGetBrandsListQuery } from "../../redux/slices/brandApiSlice";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import Message from "../../components/common/Message";
import Input from "../../components/common/Input";
import SelectOption from "../../components/common/SelectOption";
import DescriptionSelect from "../../components/common/SelectDescription";
import SelectSizesQtyInput from "../../components/common/SelectSizesQtyInput";
import SelectByFieldName from "../../components/common/SelectByFiledName";
import Button from "../../components/common/Button";
import Meta from "../../components/common/Meta";

const typeOptions = [
  { value: "featured", label: "Featured" },
  { value: "recommended", label: "Recommended" },
  { value: "trending", label: "Trending" }
];

const sizesOptions = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" }
];

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const [formData, setFormData] = useState(null);
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch
  } = useGetProductQuery(productId);
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useGetCategoriesQuery();
  const {
    data: brandsData,
    isLoading: brandsLoading,
    error: brandsError
  } = useGetBrandsListQuery();
  const [uploadProductImages, { isLoading: loadingUploadImages }] =
    useUploadProductImagesMutation();
  const [updateProduct, { isLoading: loadingUpdateProduct }] =
    useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        title: product.title || "",
        images: product.images || [],
        description: {
          material: product.description?.material || "",
          fabric: product.description?.fabric || "",
          careInstructions: product.description?.careInstructions || ""
        },
        category: {
          _id: product.category._id || "",
          name: product.category.name || ""
        },
        brand: { _id: product.brand._id || "", name: product.brand.name || "" },
        price: product.price || 0,
        type: product.type || [],
        countInStock: product.countInStock || 0,
        discount: product.discount || 0,
        isDeal: product.isDeal || false,
        isNewProduct: product.isNewProduct || false,
        sizes:
          product.sizes.length > 0
            ? product.sizes
            : [
                { size: "XS", quantity: 1 },
                { size: "S", quantity: 1 },
                { size: "M", quantity: 1 },
                { size: "L", quantity: 1 },
                { size: "XL", quantity: 1 }
              ]
      });
    }
  }, [product]);

  useEffect(() => {
    document.body.classList.add("product-edit-page");
    return () => document.body.classList.remove("product-edit-page");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ productId, formData }).unwrap();
      toast.success("Product updated");
      refetch();
      navigate("/admin/productList");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleInputChange = (key, value) => {
    if (key === "price") {
      const regex = /^\d*\.?\d*$/;
      if (regex.test(value) || value === "") {
        const floatValue = parseFloat(value);
        if (floatValue > 0 || value === "") {
          setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
        }
      }
    } else if (key === "countInStock" || key === "discount") {
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        setFormData((prevFormData) => ({ ...prevFormData, [key]: intValue }));
      }
    } else if (typeof value === "boolean") {
      setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
    }
  };

  const handleSelectChange = (key, selectedOption) => {
    const selectedValues = selectedOption.map((option) => option.value);
    setFormData((prevFormData) => ({ ...prevFormData, [key]: selectedValues }));
  };

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Please select one or more files to upload.");
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }
    try {
      const response = await uploadProductImages(formData).unwrap();
      toast.success(response.message);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: response.images
      }));
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to upload images.");
    }
  };

  if (!formData) {
    return <Loader />;
  }

  return (
    <div className="product-edit-page">
      <Row className="align-items-baseline justify-content-center flex-wrap-reverse">
        <Meta title="Goddess within product list" />
        <Col xs={12} md={5}>
          <h1>Edit Product</h1>
        </Col>
        <Col xs={12} md={5} className="text-end">
          <Link className="redirect-link" to="/admin/productlist">
            <span>Go Back</span>
          </Link>
        </Col>
      </Row>

      {productLoading || categoriesLoading || brandsLoading ? (
        <Row className="align-items-center justify-content-center">
          <Loader />
        </Row>
      ) : productError || categoriesError || brandsError ? (
        <Message variant="danger">
          {productError?.data?.message ||
            categoriesError?.data?.message ||
            brandsError?.data?.message}
        </Message>
      ) : (
        <form onSubmit={handleSubmit}>
          <Row className="align-items-baseline justify-content-center gap-4">
            <Col xs={12} md={5} className="px-4 bg-white ">
              <Input
                id={"name"}
                type="text"
                label={`Enter Name*`}
                name={formData.name}
                placeholder={formData.name}
                value={formData.name}
                onInputChange={(e) => handleInputChange("name", e.target.value)}
              />
              <Input
                id={"title"}
                type="text"
                label={`Enter Title*`}
                name={formData.title}
                placeholder={formData.title}
                value={formData.title}
                onInputChange={(e) =>
                  handleInputChange("title", e.target.value)
                }
              />
              <Form.Group controlId="images" className="my-2">
                <Form.Label>
                  Choose images ({formData?.images?.length} selected)
                </Form.Label>
                <Form.Control
                  className="rounded-0 "
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {formData.images.length > 0 ? (
                  <Row className="image-preview gap-2  border border-black m-0">
                    {formData.images.map((image, index) => (
                      <Col xs={4} key={index} className="p-0">
                        <img
                          src={image.thumbnail}
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No images selected</p>
                )}
                {loadingUploadImages && (
                  <Row className="align-items-center justify-content-center">
                    <Loader />
                  </Row>
                )}
              </Form.Group>
              <Input
                id={"price"}
                type="text"
                label={`Enter Price*`}
                name={formData.price}
                placeholder={formData.price}
                value={formData.price}
                onInputChange={(e) =>
                  handleInputChange("price", e.target.value)
                }
              />
              <Input
                id={"countInStock"}
                type="number"
                label={`Enter Count in Stock*`}
                name={formData.countInStock}
                placeholder={formData.countInStock}
                value={formData.countInStock}
                onInputChange={(e) =>
                  handleInputChange("countInStock", e.target.value)
                }
              />
              <Input
                id={"discount"}
                type="number"
                label={`Enter Discount*`}
                name={formData.discount}
                placeholder={formData.discount}
                value={formData.discount}
                onInputChange={(e) =>
                  handleInputChange("discount", e.target.value)
                }
              />
              <div className="d-flex gap-4">
                <Form.Group controlId="isNewProduct" className="my-2">
                  <Form.Check
                    type="checkbox"
                    label="Is New Product"
                    checked={formData.isNewProduct}
                    onChange={(e) =>
                      handleInputChange("isNewProduct", e.target.checked)
                    }
                  ></Form.Check>
                </Form.Group>
                <Form.Group controlId="isDeal" className="my-2">
                  <Form.Check
                    type="checkbox"
                    label="Is Deal"
                    checked={formData.isDeal}
                    onChange={(e) =>
                      handleInputChange("isDeal", e.target.checked)
                    }
                  ></Form.Check>
                </Form.Group>
              </div>
            </Col>
            <Col xs={12} md={5} className="px-4 bg-white ">
              <SelectByFieldName
                formData={formData}
                data={categoriesData.categories}
                label="Select or add a category"
                type="category"
                setFormData={setFormData}
              />

              <SelectByFieldName
                formData={formData}
                data={brandsData.brands}
                label="Select or add a brand"
                type="brand"
                setFormData={setFormData}
              />

              <SelectOption
                label={`Select Type*`}
                multi={true}
                options={typeOptions}
                value={formData?.type.map((value) => ({
                  value,
                  label: value.charAt(0).toUpperCase() + value.slice(1)
                }))}
                handleSelectChange={(selectedOption) =>
                  handleSelectChange("type", selectedOption)
                }
              />

              <SelectSizesQtyInput
                sizeOptions={sizesOptions}
                formData={formData}
                setFormData={setFormData}
              />

              <DescriptionSelect
                label="Select Material*"
                value={formData.description.material}
                onChange={(selectedValue) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    description: {
                      ...prevFormData.description,
                      material: selectedValue
                    }
                  }))
                }
                options={["Cotton", "Polyester", "Wool", "Linen", "Silk"]}
              />
              <DescriptionSelect
                label="Select Fabric*"
                value={formData.description.fabric}
                onChange={(selectedValue) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    description: {
                      ...prevFormData.description,
                      fabric: selectedValue
                    }
                  }))
                }
                options={["Knit", "Woven", "Nonwoven", "Lace"]}
              />
              <DescriptionSelect
                label="Select Care Instructions*"
                value={formData.description.careInstructions}
                onChange={(selectedValue) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    description: {
                      ...prevFormData.description,
                      careInstructions: selectedValue
                    }
                  }))
                }
                options={[
                  "Machine Wash Cold",
                  "Hand Wash",
                  "Dry Clean Only",
                  "Do Not Bleach"
                ]}
              />
            </Col>
          </Row>
          <div className="my-4 d-flex align-content-center mx-auto justify-content-center">
            <Button
              type="submit"
              variant="primary"
              text="Update product"
              size="md"
              disabled={loadingUpdateProduct}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;
