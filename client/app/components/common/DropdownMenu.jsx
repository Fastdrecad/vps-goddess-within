import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";

const DropdownMenu = ({ isOverBrands, setIsOverBrands, brandsData }) => {
  const navigate = useNavigate();

  const handleClick = (slug) => {
    navigate(`/brand/${slug}`);
    setIsOverBrands(!isOverBrands);
  };

  const handleClickBrand = () => {
    setIsOverBrands(!isOverBrands);
  };

  return (
    <div
      className={`brands-tab ${isOverBrands ? "active" : ""}`}
      aria-hidden={`${isOverBrands ? false : true}`}
    >
      <div className="brands-all d-flex align-items-center justify-content-between p-3 border-bottom">
        <h3 className="m-0">SHOP BY BRANDS</h3>
        <Link to="/brands" onClick={handleClickBrand}>
          See All
        </Link>
      </div>
      <ul className="d-flex m-0">
        {brandsData?.brands?.map((item) => (
          <Link
            key={item._id}
            to={`/brand/${item?.slug}`}
            onClick={() => {
              handleClick(item?.slug);
            }}
          >
            <li>
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
