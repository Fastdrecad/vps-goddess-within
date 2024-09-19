import { NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

const NavigationMenu = (props) => {
  const { isMenuOpen, brandsData, toggleMenu } = props;

  const handleCategoryClick = () => {
    toggleMenu();
  };

  return (
    <div className="navigation-menu">
      <div className="menu-shop-header">
        <NavLink
          className="menu-shop-title active"
          to="/shop"
          onClick={handleCategoryClick}
        >
          Shop
        </NavLink>
      </div>
      <div className="menu-header">
        <h3 className="menu-title">Browse by brand</h3>
        <IoCloseOutline
          onClick={toggleMenu}
          style={{
            fontSize: "30px",
            color: "black",
            cursor: "pointer",
            marginRight: "10px"
          }}
        />
      </div>
      <div className="menu-body">
        <nav role="navigation">
          <ul className="menu-list">
            {brandsData?.brands.map((link, index) => (
              <li key={index} className="menu-item">
                <NavLink
                  onClick={handleCategoryClick}
                  to={"/brand/" + link.slug}
                  activeclassname="active-link"
                  exact="true"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationMenu;
