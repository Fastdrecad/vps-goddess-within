import ProductCard from "./ProductCard";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useEffect, useRef } from "react";
import { useGetProductsByTypeQuery } from "../../redux/slices/productsApiSlice";

const FeaturedProducts = ({ type }) => {
  const { data, isLoading, error } = useGetProductsByTypeQuery({ type });
  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    document.body.classList.add("featured-content");
    return () => document.body.classList.remove("featured-content");
  }, []);

  return (
    <div
      className="feature-container"
      style={{ backgroundColor: type === "featured" ? "#084D5E" : "#e5b9c7" }}
    >
      <div className="feature-wrapper">
        <div
          className="feature-header"
          style={{
            color: type === "featured" ? "#ffffff" : "#000000"
          }}
        >
          <h1 className="fs-2 me-3 ">{type} products</h1>

          {type === "featured" ? (
            <p>
              The Featured Shop Cloth Products app offers a curated selection of
              stylish and high-quality clothing items for users seeking both
              trendy and timeless apparel options.
            </p>
          ) : type === "trending" ? (
            <p>
              As a form of self-expression and cultural identity, clothing holds
              a significant role beyond mere functionality, shaping individual
              styles and reflecting diverse cultural narratives.
            </p>
          ) : (
            <p>
              Recommended products are carefully curated selections tailored to
              suit individual preferences and needs, offering high-quality
              options that enhance convenience and satisfaction in shopping
              experiences.
            </p>
          )}
        </div>
        <div className="feature-content">
          <ul className="feature-list" ref={ref}>
            {error
              ? "Something went wrong!"
              : isLoading
                ? "loading"
                : data.products?.map((product) => (
                    <li className="feature-list-item" key={product._id}>
                      <ProductCard product={product} type={type} />
                    </li>
                  ))}
          </ul>
        </div>
        <div className="slider-content">
          <div className="slider-left">
            <button className="feature" onClick={() => scroll(-800)}>
              <GoArrowLeft />
            </button>
          </div>
          <div className="slider-right">
            <button className="feature" onClick={() => scroll(800)}>
              <GoArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
