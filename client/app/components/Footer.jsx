import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Footer = () => {
  const infoLinks = [
    { id: 0, name: "Contact Us", to: "/contact" },
    { id: 1, name: "Sell With Us", to: "/sell" },
    { id: 2, name: "Shipping", to: "/shipping" }
  ];

  const footerLinks = infoLinks.map((item) => (
    <li key={item.id} className="footer-link">
      <Link key={item.id} to={"/"}>
        {item.name}
      </Link>
    </li>
  ));
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-block">
            <div className="block-title">
              <h3 className="text-uppercase text-center">Customer Service</h3>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className="footer-block">
            <div className="block-title">
              <h3 className="text-uppercase">Links</h3>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className="footer-block">
            <div className="block-title">
              <h3 className="text-uppercase">You can also find us on</h3>
              <div className="block-content">
                <ul className="footer-social-item">
                  <li>
                    <a
                      href="/#facebook"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <span className="facebook-icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#instagram"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <span className="instagram-icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#pinterest"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <span className="pinterest-icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <span>© {new Date().getFullYear()} Goddess Within</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
