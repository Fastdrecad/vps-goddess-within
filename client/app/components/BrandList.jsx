import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BrandList = ({ brands }) => {
  return (
    <div className="brand-list">
      <h3 className="text-uppercase fs-2 fw-bold">Brands</h3>
      <hr />
      <Row className="flex-sm-row">
        {brands?.brands.map((brand, index) => (
          <Col xs="6" md="4" lg="3" key={index} className="mb-3 px-2">
            <Link to={`/brand/${brand?.slug}`} className="d-block brand-box">
              <h5>{brand?.name}</h5>
              <p className="brand-desc">{brand?.description}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BrandList;
