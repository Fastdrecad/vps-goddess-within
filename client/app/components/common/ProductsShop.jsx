import ProductList from './ProductList';
import NotFound from './NotFound';
import Loader from './Loader';
import { Row } from 'react-bootstrap';

const ProductsShop = ({ products, isLoading, error }) => {
  return (
    <div className='products-shop'>
      {isLoading ? (
        <Row className='align-items-center justify-content-center'>
          <Loader />
        </Row>
      ) : error ? (
        <NotFound message='Products not found' />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductsShop;
