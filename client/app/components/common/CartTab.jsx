import { NavLink } from 'react-router-dom';
import Button from './Button';
import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';
import CartSlideItem from './CartSlideItem';
import Loader from './Loader';
import Message from './Message';

const CartTab = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message
        variant='danger'
        className='btn border-2 mt-sm-5 mt-lg-3 mb-5 btn-outline-dark btn-no-radius secondary'
      >
        Error: {error?.data?.message || error.error}
      </Message>
    );
  }

  return (
    <div className='cart-tab'>
      <div className='cart-tab-header'>
        <h1>Your Bag</h1>
      </div>
      <div className='cart-tab-body'>
        <div className='cart-tab-container'>
          <div className='cart-tab-inner-drawer'>
            <div className='cart-tab-item-container'>
              {data?.products?.map((item, i) => (
                <li key={i} className='item-list'>
                  <CartSlideItem
                    id={item._id}
                    title={item.title}
                    desc={item.desc}
                    price={item.price}
                    img={item.images[0].url}
                  />
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='cart-tab-total'>
        <div className='cart-tab-delivery'>
          <span>Delivery</span>
          <span>4.99 €</span>
        </div>
        <div className='cart-tab-total-cost'>
          <span>
            Total <span>(VAT included)</span>
          </span>
          <span>29.8 €</span>
        </div>
        <NavLink>
          <Button type='' variant='primary' text='Login' size='lg' />
        </NavLink>
      </div>
    </div>
  );
};

export default CartTab;
