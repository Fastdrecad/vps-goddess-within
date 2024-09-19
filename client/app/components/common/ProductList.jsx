import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={index} className="mb-3 mb-md-0">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
